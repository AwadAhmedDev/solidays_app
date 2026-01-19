import express from "express";
import multer from "multer";
import ArtistController from "../controller/artist_controller";


class ArtistRouter {

	private router = express.Router();

	private multer = multer({ dest: `${process.env.PUBLIC_DIR}/assets/img/programmation` });


	public getRoutes = () => {
		
		this.router.get("/", new ArtistController().index);

		this.router.get("/:id", new ArtistController().selectOne);

		this.router.post("/", this.multer.any(), new ArtistController().insert);

		this.router.put("/", this.multer.any(), new ArtistController().update);

		this.router.delete("/", new ArtistController().delete);

		return this.router;
	};
}
export default ArtistRouter;
