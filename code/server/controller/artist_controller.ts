import type { Request, Response } from "express";
import ArtistRepository from "../repository/artist_repository";
import type { Artist } from "../../models/artist";
import FileService from "../service/file_service";
import ArtistValidator from "../validator/artist_validator";

const isProd = () => process.env.NODE_ENV === "production";

// Réponse d'erreur commune : les messages prévus (texte) sont envoyés tels quels,
// les erreurs techniques ne sont détaillées qu'en développement.
const fail = (res: Response, status: number, error: unknown) => {
	const message =
		typeof error === "string" ? error : isProd() ? "Error" : (error as Error).message;
	res.status(status).json({ status, message });
};

class ArtistController {
	public index = async (_req: Request, res: Response) => {
		const results = await new ArtistRepository().SelectAll();

		if (results instanceof Error) return fail(res, 500, results);

		res.status(200).json({
			status: 200,
			message: "ok",
			data: results,
		});
	};

	public selectOne = async (req: Request, res: Response) => {
		const id = Number(req.params.id);
		if (!Number.isInteger(id) || id <= 0) return fail(res, 400, "Identifiant invalide");

		const results = await new ArtistRepository().SelectOne({ id });

		if (results instanceof Error) return fail(res, 500, results);
		if (!results) return fail(res, 404, "Artiste introuvable");

		res.status(200).json({
			status: 200,
			message: "ok",
			data: results,
		});
	};

	public insert = async (req: Request, res: Response) => {
		const file = req.file;
		const fileService = new FileService();

		const validation = new ArtistValidator().validate(req.body);
		if (!validation.success) {
			if (file) await fileService.removeImage(file.filename);
			return fail(res, 400, validation.error.issues.map((i) => `${i.path.join(".")} : ${i.message}`).join(" | "));
		}

		if (!file) return fail(res, 400, "L'image est obligatoire");

		const fullname = await fileService.rename(file);
		if (!fullname) return fail(res, 400, "Format d'image non accepté (JPG, PNG, WebP ou AVIF)");

		const results = await new ArtistRepository().insert({
			...validation.data,
			image: fullname,
		});

		if (results instanceof Error) {
			await fileService.removeImage(fullname);
			return fail(res, 400, results);
		}

		res.status(201).json({
			status: 201,
			message: "Created",
			data: results,
		});
	};

	public update = async (req: Request, res: Response) => {
		const file = req.file;
		const fileService = new FileService();
		const id = Number(req.body.id);

		const validation = new ArtistValidator().validate(req.body);
		if (!validation.success || !Number.isInteger(id) || id <= 0) {
			if (file) await fileService.removeImage(file.filename);
			return fail(
				res,
				400,
				validation.success ? "Identifiant invalide" : validation.error.issues.map((i) => `${i.path.join(".")} : ${i.message}`).join(" | "),
			);
		}

		const current = await new ArtistRepository().SelectOne({ id });
		if (current instanceof Error) return fail(res, 500, current);
		if (!current) {
			if (file) await fileService.removeImage(file.filename);
			return fail(res, 404, "Artiste introuvable");
		}

		let fullname = (current as Artist).image;
		if (file) {
			const renamed = await fileService.rename(file);
			if (!renamed) return fail(res, 400, "Format d'image non accepté (JPG, PNG, WebP ou AVIF)");
			fullname = renamed;
		}

		const results = await new ArtistRepository().update({ ...validation.data, id, image: fullname });

		if (results instanceof Error) {
			if (file) await fileService.removeImage(fullname);
			return fail(res, 400, results);
		}

		// La nouvelle image remplace l'ancienne : on supprime l'ancien fichier.
		if (file) await fileService.removeImage((current as Artist).image);

		res.status(200).json({
			status: 200,
			message: "Updated",
			data: results,
		});
	};

	public delete = async (req: Request, res: Response) => {
		const id = Number(req.body?.id);
		if (!Number.isInteger(id) || id <= 0) return fail(res, 400, "Identifiant invalide");

		const current = await new ArtistRepository().SelectOne({ id });
		const results = await new ArtistRepository().delete({ id });

		if (results instanceof Error) return fail(res, 400, results);

		if (current && !(current instanceof Error)) {
			await new FileService().removeImage((current as Artist).image);
		}

		res.status(200).json({
			status: 200,
			message: "Deleted",
			data: results,
		});
	};
}

export default ArtistController;
