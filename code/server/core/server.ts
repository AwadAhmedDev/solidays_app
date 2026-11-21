import path from "node:path";
import compression from "compression";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import HomepageRouter from "../router/homepage_router";
import ArtistRouter from "../router/artist_router";
import AuthRouter from "../router/auth_router";

const isProd = process.env.NODE_ENV === "production";

// Pages de l'application servies par index.html ; toute autre adresse renvoie une vraie 404.
const SPA_ROUTES = /^\/(|festival|programmation|billetterie|mention_legale|artist\/\d+|admin(\/.*)?)\/?$/;

class Server {
	private app = express();
	private router = express.Router();

	constructor() {
		// Derrière le proxy de l'hébergeur : nécessaire pour la vraie IP (anti force brute) et les cookies "secure"
		this.app.set("trust proxy", 1);
		this.app.disable("x-powered-by");

		this.app.use(
			helmet({
				// COOP désactivé : il empêche Lighthouse de mesurer le chargement (NO_NAVSTART), sans gain ici
				crossOriginOpenerPolicy: false,
				contentSecurityPolicy: {
					directives: {
						"img-src": ["'self'", "data:"],
						"style-src": ["'self'", "'unsafe-inline'"],
						"upgrade-insecure-requests": isProd ? [] : null,
					},
				},
			}),
		);
		// Compression gzip des réponses (JS, CSS, HTML, JSON)
		this.app.use(compression());
		this.app.use(express.json({ limit: "100kb" }));
		this.app.use(
			cors({
				origin: process.env.ORIGINS?.split(","),
				credentials: true,
			}),
		);

		this.app.use(this.router);
		this.routersList();
		if (isProd) this.frontend();
		this.errors();
	}

	private routersList = () => {
		this.router.use("/api", new HomepageRouter().getRoutes());
		this.router.use("/api/auth", new AuthRouter().getRoutes());
		this.router.use("/api/artist", new ArtistRouter().getRoutes());
	};

	// En production, Express sert aussi le site construit (dist) et les images envoyées par l'admin.
	private frontend = () => {
		const dist = path.resolve(import.meta.dirname, "../../dist");
		const uploads = path.resolve(process.env.PUBLIC_DIR ?? "public", "img/programmation");

		this.app.use("/img/programmation", express.static(uploads, { maxAge: "7d" }));
		this.app.use("/assets", express.static(path.join(dist, "assets"), { maxAge: "1y", immutable: true }));
		this.app.use(express.static(dist, { maxAge: "1d", index: false }));

		this.app.get(/^(?!\/api\/).*/, (req, res) => {
			res.set("Cache-Control", "no-cache");
			res.status(SPA_ROUTES.test(req.path) ? 200 : 404).sendFile(path.join(dist, "index.html"));
		});
	};

	private errors = () => {
		this.app.use("/api", (_req: Request, res: Response) => {
			res.status(404).json({ status: 404, message: "Route introuvable" });
		});

		// Erreurs non prévues (fichier trop lourd, JSON invalide…)
		this.app.use((err: Error & { status?: number; code?: string }, _req: Request, res: Response, _next: NextFunction) => {
			const status = err.code === "LIMIT_FILE_SIZE" || err.code?.startsWith("LIMIT_") ? 400 : (err.status ?? 500);
			if (status >= 500) console.error(err);
			res.status(status).json({
				status,
				message: err.code === "LIMIT_FILE_SIZE" ? "Image trop lourde (5 Mo maximum)" : status >= 500 && isProd ? "Error" : err.message,
			});
		});
	};

	public start = () => this.app;
}

export default Server;
