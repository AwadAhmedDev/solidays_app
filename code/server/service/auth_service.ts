import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

// Session admin = jeton signé (HMAC-SHA256) dans un cookie httpOnly : le navigateur
// l'envoie tout seul, le JavaScript de la page ne peut pas le lire, et toute
// modification du jeton invalide la signature.
export const COOKIE = "solidays_session";
const TTL_MS = 8 * 60 * 60 * 1000; // 8 h

const secret = () => {
	const s = process.env.SESSION_SECRET;
	if (!s || s.length < 32) throw new Error("SESSION_SECRET manquant ou trop court (32 caractères minimum)");
	return s;
};

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

export const createToken = (user: { id: number; email: string }) => {
	const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + TTL_MS })).toString("base64url");
	return `${payload}.${sign(payload)}`;
};

export const readToken = (token?: string): { id: number; email: string } | null => {
	if (!token) return null;
	const [payload, signature] = token.split(".");
	if (!payload || !signature) return null;
	const expected = Buffer.from(sign(payload));
	const given = Buffer.from(signature);
	if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
	try {
		const data = JSON.parse(Buffer.from(payload, "base64url").toString());
		return typeof data.exp === "number" && data.exp > Date.now() ? { id: data.id, email: data.email } : null;
	} catch {
		return null;
	}
};

// Lecture du cookie sans dépendance supplémentaire
export const getCookie = (req: Request, name: string) =>
	req.headers.cookie
		?.split(";")
		.map((c) => c.trim().split("="))
		.find(([k]) => k === name)?.[1];

export const cookieOptions = () => ({
	httpOnly: true,
	sameSite: "strict" as const,
	secure: process.env.NODE_ENV === "production",
	maxAge: TTL_MS,
	path: "/",
});

// Middleware : routes réservées à l'administrateur connecté
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (!readToken(getCookie(req, COOKIE))) {
		res.status(401).json({ status: 401, message: "Connexion requise" });
		return;
	}
	next();
};
