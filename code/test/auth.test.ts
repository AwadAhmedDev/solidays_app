// Tests unitaires de la session admin (jeton signé HMAC dans un cookie httpOnly)
import { test } from "node:test";
import assert from "node:assert/strict";

process.env.SESSION_SECRET = "secret-de-test-0123456789abcdef0123456789";

const { createToken, readToken } = await import("../server/service/auth_service.ts");

test("un jeton valide redonne l'utilisateur", () => {
	const token = createToken({ id: 1, email: "admin@test.fr" });
	assert.deepEqual(readToken(token), { id: 1, email: "admin@test.fr" });
});

test("un jeton modifié est refusé", () => {
	const token = createToken({ id: 1, email: "admin@test.fr" });
	const [payload, signature] = token.split(".");
	const forged = Buffer.from(JSON.stringify({ id: 2, email: "pirate@test.fr", exp: Date.now() + 1e6 })).toString("base64url");
	assert.equal(readToken(`${forged}.${signature}`), null);
	assert.equal(readToken(`${payload}.${signature}x`), null);
});

test("un jeton absent ou mal formé est refusé", () => {
	assert.equal(readToken(undefined), null);
	assert.equal(readToken(""), null);
	assert.equal(readToken("n'importe-quoi"), null);
});

test("un jeton expiré est refusé", (t) => {
	const token = createToken({ id: 1, email: "admin@test.fr" });
	const now = Date.now();
	t.mock.method(Date, "now", () => now + 9 * 60 * 60 * 1000); // 9 h plus tard (session : 8 h)
	assert.equal(readToken(token), null);
});

test("un jeton signé avec une autre clé est refusé", async () => {
	const token = createToken({ id: 1, email: "admin@test.fr" });
	process.env.SESSION_SECRET = "une-autre-cle-secrete-0123456789abcdefghij";
	try {
		assert.equal(readToken(token), null);
	} finally {
		process.env.SESSION_SECRET = "secret-de-test-0123456789abcdef0123456789";
	}
});
