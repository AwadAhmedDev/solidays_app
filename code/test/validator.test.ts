// Tests unitaires de la validation serveur des artistes
import { test } from "node:test";
import assert from "node:assert/strict";
import ArtistValidator from "../server/validator/artist_validator.ts";

const valid = {
	name: "Orelsan",
	description: "Rappeur français, auteur de cinq albums multi-certifiés.",
	youtubeurl: "https://youtu.be/4hm7wPz0qK8",
	concertday: "Dimanche",
};

const validate = (data: object) => new ArtistValidator().validate(data);

test("un artiste complet est accepté", () => {
	assert.equal(validate(valid).success, true);
	assert.equal(validate({ ...valid, youtubeurl: "https://www.youtube.com/watch?v=abc" }).success, true);
});

test("les espaces autour des champs sont retirés", () => {
	const result = validate({ ...valid, name: "  Gims  " });
	assert.equal(result.success && result.data.name, "Gims");
});

for (const [label, change] of [
	["nom trop court", { name: "X" }],
	["nom trop long", { name: "x".repeat(51) }],
	["description trop courte", { description: "court" }],
	["lien qui n'est pas YouTube", { youtubeurl: "https://exemple.com/video" }],
	["lien non sécurisé", { youtubeurl: "http://youtu.be/abc" }],
	["jour hors festival", { concertday: "Lundi" }],
	["champ manquant", { name: undefined }],
] as const) {
	test(`refusé : ${label}`, () => {
		assert.equal(validate({ ...valid, ...change }).success, false);
	});
}
