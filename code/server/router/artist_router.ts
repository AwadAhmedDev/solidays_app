import express from "express";
import multer from "multer";
import ArtistController from "../controller/artist_controller";
import { requireAdmin } from "../service/auth_service";

class ArtistRouter {
	private router = express.Router();

	// Une seule image de 5 Mo maximum ; le type réel est vérifié ensuite par FileService.
	private multer = multer({
		dest: `${process.env.PUBLIC_DIR}/img/programmation`,
		limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 10 },
	});

	public getRoutes = () => {
		this.router.get("/", new ArtistController().index);

		this.router.get("/:id", new ArtistController().selectOne);

		// Écriture : réservée à l'administrateur connecté
		this.router.post("/", requireAdmin, this.multer.single("image"), new ArtistController().insert);

		this.router.put("/", requireAdmin, this.multer.single("image"), new ArtistController().update);

		this.router.delete("/", requireAdmin, new ArtistController().delete);

		return this.router;
	};
}
export default ArtistRouter;
