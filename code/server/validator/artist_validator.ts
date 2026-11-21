import { z } from "zod";

z.config(z.locales.fr());

// Validation côté serveur : le navigateur vérifie aussi, mais il peut être contourné.
// Mêmes règles que src/validators/admin/admin_artist_form_validators.ts
export const CONCERT_DAYS = ["Vendredi", "Samedi", "Dimanche"] as const;

const artistSchema = z.object({
	name: z.string().trim().min(2).max(50),
	description: z.string().trim().min(20).max(3000),
	youtubeurl: z
		.string()
		.trim()
		.max(200)
		.regex(/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//, "Lien YouTube invalide"),
	concertday: z.enum(CONCERT_DAYS),
});

class ArtistValidator {
	public validate = (body: unknown) => artistSchema.safeParse(body);
}

export default ArtistValidator;
