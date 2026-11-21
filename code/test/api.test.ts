// Tests d'intégration de l'API sur une vraie base MySQL (créée puis supprimée pour le test).
// Variables : MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD (par défaut : 127.0.0.1, 3306, root, root).
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";
import type { Server as HttpServer } from "node:http";
import mysql from "mysql2/promise";

const DB = "solidays_test";
const ADMIN = { email: "admin@test.fr", password: "Mot-de-passe-de-test-2026" };
const env = process.env;
Object.assign(env, {
	NODE_ENV: "test",
	MYSQL_HOST: env.MYSQL_HOST ?? "127.0.0.1",
	MYSQL_PORT: env.MYSQL_PORT ?? "3306",
	MYSQL_USER: env.MYSQL_USER ?? "root",
	MYSQL_PASSWORD: env.MYSQL_PASSWORD ?? "root",
	MYSQL_DATABASE: DB,
	ADMIN_EMAIL: ADMIN.email,
	ADMIN_PASSWORD: ADMIN.password,
	SESSION_SECRET: "secret-de-test-0123456789abcdef0123456789",
});

let server: HttpServer;
let base = "";
let uploads = "";
const root = () =>
	mysql.createConnection({ host: env.MYSQL_HOST, port: Number(env.MYSQL_PORT), user: env.MYSQL_USER, password: env.MYSQL_PASSWORD });

before(async () => {
	// base neuve, initialisée comme au premier déploiement (scripts SQL de l'équipe)
	const connection = await root();
	await connection.query(`DROP DATABASE IF EXISTS ${DB}`);
	await connection.query(`CREATE DATABASE ${DB} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
	await connection.end();

	uploads = await fs.mkdtemp(path.join(os.tmpdir(), "solidays-"));
	env.PUBLIC_DIR = uploads;

	const { initDatabase } = await import("../server/service/db_init_service.ts");
	await initDatabase();
	const { default: Server } = await import("../server/core/server.ts");
	server = new Server().start().listen(0);
	await new Promise((resolve) => server.once("listening", resolve));
	base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

after(async () => {
	server?.close();
	const { default: MySQLService } = await import("../server/service/mysql_service.ts");
	await (await new MySQLService().connect()).end();
	const connection = await root();
	await connection.query(`DROP DATABASE IF EXISTS ${DB}`);
	await connection.end();
	await fs.rm(uploads, { recursive: true, force: true });
});

const login = async (password = ADMIN.password) =>
	fetch(`${base}/api/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email: ADMIN.email, password }),
	});

const artistForm = (fields: Record<string, string>, image?: Blob) => {
	const form = new FormData();
	for (const [key, value] of Object.entries(fields)) form.set(key, value);
	if (image) form.set("image", image, "photo.webp");
	return form;
};

const VALID = {
	name: "Artiste Test",
	description: "Une description suffisamment longue pour être acceptée.",
	youtubeurl: "https://youtu.be/abc123",
	concertday: "Samedi",
};

describe("lecture publique", () => {
	test("la programmation contient les 11 artistes de démonstration", async () => {
		const res = await fetch(`${base}/api/artist`);
		assert.equal(res.status, 200);
		const body = await res.json();
		assert.equal(body.data.length, 11);
		assert.ok(body.data.some((a: { name: string }) => a.name === "Orelsan"));
	});

	test("fiche artiste : 200, 404 si inconnu, 400 si identifiant invalide", async () => {
		assert.equal((await fetch(`${base}/api/artist/1`)).status, 200);
		assert.equal((await fetch(`${base}/api/artist/999`)).status, 404);
		assert.equal((await fetch(`${base}/api/artist/abc`)).status, 400);
	});

	test("route d'API inconnue : 404 en JSON", async () => {
		const res = await fetch(`${base}/api/inconnue`);
		assert.equal(res.status, 404);
		assert.equal((await res.json()).status, 404);
	});

	test("en-têtes de sécurité présents", async () => {
		const res = await fetch(`${base}/api/artist`);
		assert.ok(res.headers.get("content-security-policy"));
		assert.equal(res.headers.get("x-content-type-options"), "nosniff");
		assert.equal(res.headers.get("x-powered-by"), null);
	});
});

describe("sécurité de l'administration", () => {
	test("écriture refusée sans connexion (401)", async () => {
		const del = await fetch(`${base}/api/artist`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: 1 }),
		});
		assert.equal(del.status, 401);
		const post = await fetch(`${base}/api/artist`, { method: "POST", body: artistForm(VALID) });
		assert.equal(post.status, 401);
	});

	test("mauvais mot de passe refusé", async () => {
		assert.equal((await login("mauvais")).status, 401);
	});

	test("connexion : cookie de session httpOnly", async () => {
		const res = await login();
		assert.equal(res.status, 200);
		const cookie = res.headers.get("set-cookie") ?? "";
		assert.match(cookie, /solidays_session=/);
		assert.match(cookie, /HttpOnly/i);
		assert.match(cookie, /SameSite=Strict/i);
	});
});

describe("gestion des artistes (connecté)", () => {
	let cookie = "";
	before(async () => {
		cookie = ((await login()).headers.get("set-cookie") ?? "").split(";")[0];
	});

	test("données invalides refusées (400)", async () => {
		const res = await fetch(`${base}/api/artist`, {
			method: "POST",
			headers: { cookie },
			body: artistForm({ ...VALID, youtubeurl: "https://exemple.com", concertday: "Lundi" }),
		});
		assert.equal(res.status, 400);
	});

	test("faux fichier image refusé, et supprimé du serveur", async () => {
		const res = await fetch(`${base}/api/artist`, {
			method: "POST",
			headers: { cookie },
			body: artistForm(VALID, new Blob(["ceci n'est pas une image"])),
		});
		assert.equal(res.status, 400);
		assert.deepEqual(await fs.readdir(path.join(uploads, "img/programmation")), []);
	});

	test("ajout, modification avec accents puis suppression", async () => {
		const image = new Blob([await fs.readFile(path.resolve(import.meta.dirname, "../public/img/programmation/gims.webp"))]);
		const created = await fetch(`${base}/api/artist`, { method: "POST", headers: { cookie }, body: artistForm(VALID, image) });
		assert.equal(created.status, 201);
		const id = (await created.json()).data.insertId;

		const updated = await fetch(`${base}/api/artist`, {
			method: "PUT",
			headers: { cookie },
			body: artistForm({ ...VALID, id: String(id), name: "Artiste Modifié ✓" }),
		});
		assert.equal(updated.status, 200);
		assert.equal((await (await fetch(`${base}/api/artist/${id}`)).json()).data.name, "Artiste Modifié ✓");

		const deleted = await fetch(`${base}/api/artist`, {
			method: "DELETE",
			headers: { cookie, "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});
		assert.equal(deleted.status, 200);
		assert.equal((await fetch(`${base}/api/artist/${id}`)).status, 404);
		// l'image de l'artiste supprimé ne reste pas sur le serveur
		assert.deepEqual(await fs.readdir(path.join(uploads, "img/programmation")), []);
	});
});
