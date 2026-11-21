import type { Artist } from "../../../models/artist";
import z, { type ZodError } from "zod";

// Mêmes règles que la validation serveur (server/validator/artist_validator.ts)
export const CONCERT_DAYS = ["Vendredi", "Samedi", "Dimanche"] as const;

class AdminArtistFormValidator {
	public validate = async (data: Partial<Artist>): Promise<Partial<Artist> | ZodError> => {
		const constraints = z.object({
			id: z.union([z.string(), z.number()]).optional().nullable(),
			name: z
				.string("Le nom est obligatoire")
				.trim()
				.min(2, "Un nom doit comporter, au minimum, 2 caractères")
				.max(50, "Un nom doit comporter, au maximum, 50 caractères"),
			image: z.union([z.string(), z.file("L'image est obligatoire")]).optional().nullable(),
			description: z
				.string("La description est obligatoire")
				.trim()
				.min(20, "La description doit comporter, au minimum, 20 caractères")
				.max(3000, "La description doit comporter, au maximum, 3000 caractères"),
			youtubeurl: z
				.string("Le lien YouTube est obligatoire")
				.trim()
				.max(200, "Un lien doit comporter, au maximum, 200 caractères")
				.regex(/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//, "Le lien doit commencer par https://youtu.be/ ou https://www.youtube.com/"),
			concertday: z.enum(CONCERT_DAYS, "Choisissez le jour du concert"),
		});

		const validation = await constraints.safeParseAsync(data);

		if (!validation.success) {
			return validation.error;
		}

		return validation.data as Partial<Artist>;
	};
}

export default AdminArtistFormValidator;
