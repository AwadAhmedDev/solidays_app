import mysql, { type PoolConnection } from "mysql2/promise";

class MySQLService {
	
	private static instance: PoolConnection;

	
	public connect = async () => {
		
		if (!MySQLService.instance) {
			MySQLService.instance = await mysql
				.createPool({
					host: process.env.MYSQL_HOST,
					user: process.env.MYSQL_USER,
					password: process.env.MYSQL_PASSWORD,
					database: process.env.MYSQL_DATABASE,
					namedPlaceholders: true,
				})
				.getConnection();
		}
	
		return MySQLService.instance;
	};
}
export default MySQLService;