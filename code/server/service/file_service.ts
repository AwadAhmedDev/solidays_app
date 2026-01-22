import fs from "node:fs/promises";
import { fileTypeFromFile } from "file-type/node";

class FileService {

    public rename = async (file: Express.Multer.File) => {

		const fullname = `${file.filename}.${(await fileTypeFromFile(file.path))?.ext}`;

		await fs.rename(file.path, `${file.destination}/${fullname}`);

		return fullname;
	};
}

export default FileService;