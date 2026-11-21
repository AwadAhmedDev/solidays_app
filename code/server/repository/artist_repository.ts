import type { QueryResult } from "mysql2";
import MySQLService from "../service/mysql_service";
import type { Artist } from "../../models/artist";

// Chaque méthode exécute une seule requête SQL, atomique par nature :
// pas besoin de transaction (elles n'étaient d'ailleurs pas attendues avec await).
class ArtistRepository {
	private table = "artist";

	public SelectAll = async (): Promise<Artist[] | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
            ORDER BY ${this.table}.name;
       `;

		try {
			const [query] = await connection.execute(sql);
			return query;
		} catch (error) {
			return error;
		}
	};

	public SelectOne = async (
		data: Partial<Artist>,
	): Promise<Artist | undefined | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE ${this.table}.id = :id
			;
       `;

		try {
			const [query] = await connection.execute(sql, { id: data.id ?? null });
			return (query as Artist[]).shift();
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
	VALUES
	(
		NULL,
		:name,
		:image,
		:description,
		:youtubeurl,
		:concertday
	)
	  ;
		`;

		try {
			const [query] = await connection.execute(sql, data);
			return query;
		} catch (error) {
			return error;
		}
	};

	public update = async (
		data: Partial<Artist>,
	): Promise<QueryResult | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
	UPDATE
		${process.env.MYSQL_DATABASE}.${this.table}
	SET
		name = :name,
		image = :image,
		description = :description,
		youtubeurl = :youtubeurl,
		concertday = :concertday
	WHERE
	${this.table}.id = :id
	  ;
		`;

		try {
			const [query] = await connection.execute(sql, data);
			return query;
		} catch (error) {
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
			const [query] = await connection.execute(sql, { id: data.id ?? null });
			return query;
		} catch (error) {
			return error;
		}
	};
}

export default ArtistRepository;
