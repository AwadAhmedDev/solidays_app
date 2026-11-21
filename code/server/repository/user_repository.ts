import MySQLService from "../service/mysql_service";
import type { User } from "../../models/user";

class UserRepository {
	private table = "user";

	public selectByEmail = async (email: string): Promise<User | undefined | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
            SELECT ${this.table}.*
            FROM ${process.env.MYSQL_DATABASE}.${this.table}
            WHERE ${this.table}.email = :email
            ;
        `;

		try {
			const [query] = await connection.execute(sql, { email });
			return (query as User[]).shift();
		} catch (error) {
			return error;
		}
	};
}

export default UserRepository;
