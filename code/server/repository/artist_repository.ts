import type { QueryResult } from "mysql2";
import MySQLService from "../service/mysql_service";
import { Artist } from "../../models/artist";
import FileService from "../service/file_service";

class ArtistRepository {
	
	private table = "artist";

	
	public SelectAll = async (): Promise<Artist[] | unknown> => {
		
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table};
       `;
		
		try {
			
			const [query] = await connection.execute(sql);
			
			for (let i = 0; i < (query as Artist[]).length; i++) {
				
				const result = (query as Artist[])[i] as Artist;
			}

			return query;
		
		} catch (error) {
			return error;
		}
	};

	
	public SelectOne = async (
		data: Partial<Artist>,
	): Promise<Artist | unknown> => {
		
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE ${this.table}.id = :id
			;
       `;
		
		try {
			
			const [query] = await connection.execute(sql, data);

			
			const result = (query as Artist[]).shift() as Artist;

			return result;
			
		} catch (error) {
			return error;
		}
	};

	
	public insert = async (
		data: Partial<Artist>,
	): Promise<QueryResult | unknown> => {
		
		const connection = await new MySQLService().connect();

		
		const sql = `

	INSERT INTO 
		${process.env.MYSQL_DATABASE}.${this.table}
	VALUE 
	(
		NULL,
		:name,
		:image,
		:description,
		:youtubeurl,
		:concertday,
		:user_id
	)
	  ;
		`;

		try {
			
			connection.beginTransaction();

			
			const [query] = await connection.execute(sql, data);

			connection.commit();

			return query;
			
		} catch (error) {
			
			connection.rollback();

			return error;
		}
	};


public update = async (
    data: Partial<Artist>,
    file?: Express.Multer.File // fichier image envoyé depuis le front
): Promise<QueryResult | unknown> => {

    if (!data || !data.id) {
        return new Error("ID de l'artiste manquant pour le update.");
    }

    const connection = await new MySQLService().connect();
    const safeData: any = { id: data.id }; // id obligatoire
    const fields: string[] = [];

    // Champs texte à mettre à jour si fournis
    if (data.name !== undefined) {
        fields.push("name = :name");
        safeData.name = data.name;
    }
    if (data.description !== undefined) {
        fields.push("description = :description");
        safeData.description = data.description;
    }
    if (data.youtubeurl !== undefined) {
        fields.push("youtubeurl = :youtubeurl");
        safeData.youtubeurl = data.youtubeurl;
    }
    if (data.concertday !== undefined) {
        fields.push("concertday = :concertday");
        safeData.concertday = data.concertday;
    }

    // Champ image à mettre à jour si un fichier est envoyé
    if (file) {
        const fileService = new FileService();
        const imagePath = await fileService.rename(file); // retourne /uploads/nomfichier.ext

        fields.push("image = :image");
        safeData.image = imagePath;
    }

    // Si aucun champ à mettre à jour, on ne fait rien
    if (fields.length === 0) {
        return new Error("Aucun champ fourni pour la modification.");
    }

    const sql = `
        UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
        SET ${fields.join(", ")}
        WHERE id = :id;
    `;

    try {
        await connection.beginTransaction();
        const [query] = await connection.execute(sql, safeData);
        await connection.commit();
        return query;
    } catch (error) {
        await connection.rollback();
        return error;
    }
};

	public delete = async (
		data: Partial<Artist>,
	): Promise<QueryResult | unknown> => {
		
		const connection = await new MySQLService().connect();

		const sql = `

		
			DELETE FROM
			 ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
			 ${this.table}.id = :id
			;
		
		`;

		try {
			
			connection.beginTransaction();

			const [query] = await connection.execute(sql, data);

			connection.commit();

			return query;
			
		} catch (error) {

			connection.rollback();

			return error;
		}
	};
}

export default ArtistRepository;