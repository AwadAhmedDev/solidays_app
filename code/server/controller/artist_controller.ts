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
		
		const file = (
			req.files as Express.Multer.File[]
		).shift() as Express.Multer.File;

		
		const fileService = new FileService();

		let fullname: string;

		if (file) {
		
			fullname = await fileService.rename(file);
		} else {
			fullname = ((await new ArtistRepository().SelectOne(req.body)) as Artist)
				.image;
		}

		console.log(fullname);

		
		const results = await new ArtistRepository().update(req.body);

		
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
			message: "Updated",
			data: results,
		});
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
