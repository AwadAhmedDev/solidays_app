import fs from "node:fs/promises";
import path from "node:path";
import { argon2id } from "hash-wasm";
import { randomBytes } from "node:crypto";
import mysql, { type RowDataPacket } from "mysql2/promise";

// Premier démarrage en production (DB_AUTO_INIT=true) : si la base est vide, crée les tables
// et les artistes de démonstration à partir des scripts de l'équipe (mysql/*.sql).
// Le compte admin est créé avec ADMIN_EMAIL / ADMIN_PASSWORD (jamais le mot de passe du dépôt).
// Ne touche jamais une base qui contient déjà des tables.
const MYSQL_DIR = path.resolve(import.meta.dirname, "../../mysql");

// Les scripts de développement visent la base « solidays_dev » : on retire la création de base
// et le préfixe pour les exécuter dans la base fournie par l'hébergeur.
const adapt = (sql: string) =>
	sql
		.replace(/^\s*DROP DATABASE[^;]*;/gim, "")
		.replace(/^\s*CREATE DATABASE[^;]*;/gim, "")
		.replaceAll("solidays_dev.", "");

export const initDatabase = async (env = process.env) => {
	const connection = await mysql.createConnection({
		host: env.MYSQL_HOST,
		port: Number(env.MYSQL_PORT ?? 3306),
		user: env.MYSQL_USER,
		password: env.MYSQL_PASSWORD,
		database: env.MYSQL_DATABASE,
		multipleStatements: true,
		charset: "utf8mb4",
	});
	try {
		const [tables] = await connection.query<RowDataPacket[]>("SHOW TABLES LIKE 'artist'");
		if (tables.length > 0) return;

		await connection.query(adapt(await fs.readFile(path.join(MYSQL_DIR, "solidays.dev.sql"), "utf8")));
		// données de démonstration, sans la ligne du compte admin du dépôt
		const seed = adapt(await fs.readFile(path.join(MYSQL_DIR, "fichiers.dev.sql"), "utf8")).replace(
			/INSERT INTO user[^;]*;/i,
			"",
		);
		await connection.query(seed);
		console.log("Base initialisée (tables + artistes de démonstration)");

		if (env.ADMIN_EMAIL && env.ADMIN_PASSWORD) {
			if (env.ADMIN_PASSWORD.length < 12) throw new Error("ADMIN_PASSWORD : 12 caractères minimum");
			const hash = await argon2id({
				password: env.ADMIN_PASSWORD,
				salt: randomBytes(16),
				parallelism: 1,
				iterations: 2,
				memorySize: 19456,
				hashLength: 32,
				outputType: "encoded",
			});
			await connection.execute("INSERT INTO user (email, password, role_id) VALUES (?, ?, 1)", [
				env.ADMIN_EMAIL.trim().toLowerCase(),
				hash,
			]);
			console.log(`Compte administrateur créé : ${env.ADMIN_EMAIL}`);
		}
	} finally {
		await connection.end();
	}
};
