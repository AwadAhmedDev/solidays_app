import Server from "./core/server";
import { initDatabase } from "./service/db_init_service";

// Hostinger nomme les accès à la base DB_* : on les reprend si MYSQL_* n'est pas défini
for (const [mysqlKey, dbKey] of [
	["MYSQL_HOST", "DB_HOST"],
	["MYSQL_PORT", "DB_PORT"],
	["MYSQL_DATABASE", "DB_NAME"],
	["MYSQL_USER", "DB_USER"],
	["MYSQL_PASSWORD", "DB_PASSWORD"],
]) {
	if (!process.env[mysqlKey] && process.env[dbKey]) process.env[mysqlKey] = process.env[dbKey];
}

const start = () => {
	const server = new Server().start();
	const port = Number(process.env.PORT ?? 3001);
	server.listen(port, () => console.log(`Solidays API sur le port ${port}`));
};

// Premier déploiement : création des tables et des données si la base est vide
if (process.env.DB_AUTO_INIT === "true") {
	initDatabase()
		.catch((error) => console.error("Initialisation de la base impossible :", error))
		.finally(start);
} else {
	start();
}
