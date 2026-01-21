import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import HomepageRouter from "../router/homepage_router";
import ArtistRouter from "../router/artist_router";

// créer __dirname pour ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    private app = express();
    private router = express.Router();

    constructor() {
        this.app.use(express.json());
        this.app.use(
            cors({
                origin: process.env.ORIGINS?.split(","),
            }),
        );

        // rendre le dossier uploads public
        this.app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

        this.app.use(this.router);
        this.routersList();
    }

    private routersList = () => {
        this.router.use("/api", new HomepageRouter().getRoutes());
        this.router.use("/api/artist", new ArtistRouter().getRoutes());
    };

    public start = () => this.app;
}

export default Server;