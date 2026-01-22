import type { QueryResult } from "mysql2";
import MySQLService from "../service/mysql_service";
import { Artist } from "../../models/artist";

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
			connection.beginTransaction();

			const [query] = await connection.execute(sql, data);
			connection.commit();

			return query;
		} catch (error) {
			connection.rollback();

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