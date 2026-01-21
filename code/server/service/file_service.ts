import fs from "node:fs/promises";
import { fileTypeFromFile } from "file-type/node";
import path from "path";

class FileService {
    /**
     * Renomme et déplace un fichier Multer
     * Retourne le chemin relatif utilisable côté front
     */
    public rename = async (file: Express.Multer.File): Promise<string> => {
        // détecte l'extension réelle
        const ext = (await fileTypeFromFile(file.path))?.ext ?? "bin";

        // nom final du fichier
        const fullname = `${file.filename}.${ext}`;

        // déplacer le fichier dans son dossier destination
        const destinationPath = path.join(file.destination, fullname);
        await fs.rename(file.path, destinationPath);

        // retourne le chemin relatif utilisable côté front
        // le front pourra faire <img src={artist.image} />
        return `/uploads/${fullname}`;
    };
}

export default FileService;