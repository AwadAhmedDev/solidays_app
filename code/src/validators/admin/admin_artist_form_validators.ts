import type { Artist } from "../../../models/artist";
import z, { type ZodError } from "zod";

class AdminArtistFormValidator {
	
	public validate = async (
		data: Partial<Artist>,
	): Promise<Partial<Artist> | ZodError> => {
		
		"use server";

		const constraints = z.object({
			id: z.union([
				z.string().nullable(),
			
				z.coerce
					.number()
					.positive(),
			]),
			name: z
				.string("Le nom est obligatoire")
				.min(2, "Un nom doit comporter, au minimum, 2 caractères")
				.max(20, "Un nom doit comporter, au maximum, 20 caractères"),
			image: z.union([
				z.string().nullable(),
				z.file("L'image est obligatoire"),
			]),
			description: z
				.string("La description est obligatoire")
				.min(20, "La description doit comporter, au minimum, 20 caractères")
				.max(500, "La description doit comporter, au maximum, 500 caractères"),
			youtubeurl: z
				.string("Le lien Youtube est obligatoire")
				.min(20, "Un lien doit comporter, au minimum, 20 caractères")
				.max(50, "Un lien doit comporter, au maximum, 50 caractères"),
			concertday: z
				.string("Le jour du concert est obligatoire")
				.min(5, "Un jour doit comporter, au minimum, 5 caractères")
				.max(10, "Un nom doit comporter, au maximum, 10 caractères"),
		});

		const validation = await constraints.safeParseAsync(data);

		if (!validation.success) {
			return validation.error;
        }
        
		return validation.data as Partial<Artist>;
	};
}

export default AdminArtistFormValidator;
