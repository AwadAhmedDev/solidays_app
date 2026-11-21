import fs from "node:fs/promises";
import path from "node:path";
import { fileTypeFromFile } from "file-type/node";

// Seuls ces formats d'image sont acceptés (type réel lu dans le fichier, pas son nom).
const ALLOWED = new Set(["jpg", "png", "webp", "avif"]);

class FileService {
	// Renomme le fichier envoyé avec sa vraie extension.
	// Renvoie null (et supprime le fichier) si ce n'est pas une image autorisée.
	public rename = async (file: Express.Multer.File) => {
		const ext = (await fileTypeFromFile(file.path))?.ext;

		if (!ext || !ALLOWED.has(ext)) {
			await this.remove(file.path);
			return null;
		}

		const fullname = `${file.filename}.${ext}`;
		await fs.rename(file.path, `${file.destination}/${fullname}`);

		return fullname;
	};

	// Supprime une image d'artiste (ancienne image après modification ou suppression).
	public removeImage = async (image?: string) => {
		if (!image) return;
		await this.remove(
			path.join(process.env.PUBLIC_DIR ?? "public", "img/programmation", path.basename(image)),
		);
	};

	private remove = async (filepath: string) => {
		await fs.unlink(filepath).catch(() => undefined);
	};
}

export default FileService;
