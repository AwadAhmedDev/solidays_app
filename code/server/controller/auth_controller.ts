import type { Request, Response } from "express";
import { argon2Verify } from "hash-wasm";
import UserRepository from "../repository/user_repository";
import type { User } from "../../models/user";
import { COOKIE, cookieOptions, createToken, getCookie, readToken } from "../service/auth_service";

// Anti force brute : 10 essais ratés par adresse IP sur 15 minutes.
// shortcut: compteur en mémoire, remis à zéro au redémarrage ; suffisant pour un seul serveur.
const attempts = new Map<string, { count: number; until: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

class AuthController {
	public login = async (req: Request, res: Response) => {
		const ip = req.ip ?? "unknown";
		const now = Date.now();
		const entry = attempts.get(ip);
		if (entry && entry.until > now && entry.count >= MAX_ATTEMPTS) {
			res.status(429).json({ status: 429, message: "Trop de tentatives, réessayez dans quelques minutes." });
			return;
		}

		const email = String(req.body?.email ?? "").trim().toLowerCase();
		const password = String(req.body?.password ?? "");

		const user = email && password ? await new UserRepository().selectByEmail(email) : undefined;
		if (user instanceof Error) {
			res.status(500).json({ status: 500, message: "Erreur serveur" });
			return;
		}

		const ok =
			!!user &&
			(await argon2Verify({ password, hash: (user as User).password }).catch(() => false));

		if (!ok) {
			attempts.set(ip, {
				count: entry && entry.until > now ? entry.count + 1 : 1,
				until: entry && entry.until > now ? entry.until : now + WINDOW_MS,
			});
			res.status(401).json({ status: 401, message: "E-mail ou mot de passe incorrect" });
			return;
		}

		attempts.delete(ip);
		const { id } = user as User;
		res.cookie(COOKIE, createToken({ id, email }), cookieOptions());
		res.status(200).json({ status: 200, message: "ok", data: { email } });
	};

	public logout = (_req: Request, res: Response) => {
		res.clearCookie(COOKIE, { ...cookieOptions(), maxAge: undefined });
		res.status(200).json({ status: 200, message: "ok" });
	};

	public me = (req: Request, res: Response) => {
		const session = readToken(getCookie(req, COOKIE));
		if (!session) {
			res.status(401).json({ status: 401, message: "Non connecté" });
			return;
		}
		res.status(200).json({ status: 200, message: "ok", data: { email: session.email } });
	};
}

export default AuthController;
