import cors from "cors";
import express from "express";
import HomepageRouter from "../router/homepage_router";
import ArtistRouter from "../router/artist_router";

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

		this.app.use(this.router);

		this.routersList();
	}
	
	private routersList = () => {
	this.router.use("/api", new HomepageRouter().getRoutes());
		this.router.use("/api/artist", new ArtistRouter().getRoutes());
	};

	public start = () => {
		return this.app;
	};
}

export default Server;