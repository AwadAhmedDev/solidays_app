import type { Request, Response } from "express";
import ArtistRepository from "../repository/artist_repository";
import { Artist } from "../../models/artist";
import FileService from "../service/file_service";


class ArtistController {
	
	public index = async (_req: Request, res: Response) => {
		
		const results = await new ArtistRepository().SelectAll();

		
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});

			return;
		}

		
		res.status(200).json({
			status: 200,
			message: "ok",
			data: results,
		});
	};

	public selectOne = async (req: Request, res: Response) => {
	
		const results = await new ArtistRepository().SelectOne(req.params);


		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});

			return;
		}

		res.status(200).json({
			status: 200,
			message: "ok",
			data: results,
		});
	};

	public insert = async (req: Request, res: Response) => {
	
		const file = (
			req.files as Express.Multer.File[]
		).shift() as Express.Multer.File;

		
		const fileService = new FileService();

	
		const fullname = await fileService.rename(file);

		
		const results = await new ArtistRepository().insert({
			...req.body,
			image: fullname,
		});

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});

			return;
		}

		
		res.status(201).json({
			status: 201,
			message: "Created",
			data: results,
		});
	};

    public update = async (req: Request, res: Response) => {
        try {
            // 1️⃣ récupérer le fichier envoyé (si présent)
            const file = (req.files as Express.Multer.File[] | undefined)?.[0];

            const fileService = new FileService();
            let imagePath: string;

            if (file) {
                // renommer et déplacer le fichier → retourne /uploads/nomfichier.ext
                imagePath = await fileService.rename(file);
            } else {
                // pas de fichier → récupérer l'image actuelle
                const existingArtist = (await new ArtistRepository().SelectOne(req.body)) as Artist;
                imagePath = existingArtist.image;
            }

            // 2️⃣ mettre à jour req.body avec le chemin correct
            req.body.image = imagePath;

            // 3️⃣ update dans la base
            const results = await new ArtistRepository().update(req.body);

            // 4️⃣ gérer les erreurs
            if (results instanceof Error) {
                return res.status(400).json({
                    status: 400,
                    message: process.env.NODE_ENV === "production" ? "Error" : results.message,
                });
            }

            // 5️⃣ renvoyer la réponse
            return res.status(200).json({
                status: 200,
                message: "Artiste mis à jour avec succès",
                data: results,
            });
        } catch (error) {
            console.error("Erreur update artist:", error);
            return res.status(500).json({
                status: 500,
                message: "Erreur serveur lors de la modification",
                error,
            });
        }
    };

	public delete = async (req: Request, res: Response) => {
		
		const results = await new ArtistRepository().delete(req.body);

		
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message:
					process.env.NODE_ENV === "production" ? "Error" : results.message,
			});

			return;
		}


		res.status(200).json({
			status: 200,
			message: "Deleted",
			data: results,
		});
	};
}

export default ArtistController;
