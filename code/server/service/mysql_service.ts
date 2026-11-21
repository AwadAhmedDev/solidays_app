import mysql, { type Pool } from "mysql2/promise";

class MySQLService {
	// Un seul pool pour toute l'application : chaque requête emprunte une connexion
	// libre et la rend aussitôt (pool.execute). Les requêtes simultanées ne se bloquent plus
	// et le pool se reconnecte tout seul si MySQL redémarre.
	private static instance: Pool;

	public connect = async () => {
		if (!MySQLService.instance) {
			MySQLService.instance = mysql.createPool({
				host: process.env.MYSQL_HOST,
				port: Number(process.env.MYSQL_PORT ?? 3306),
				user: process.env.MYSQL_USER,
				password: process.env.MYSQL_PASSWORD,
				database: process.env.MYSQL_DATABASE,
				namedPlaceholders: true,
				connectionLimit: 5,
			});
		}

		return MySQLService.instance;
	};
}
export default MySQLService;
