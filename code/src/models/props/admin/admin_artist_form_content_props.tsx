import type { ZodError } from "zod";
import type { Artist } from "../../../../models/artist";

type AdminArtistFormContentProps = {
	validator: (data: Partial<Artist>) => Promise<Partial<Artist> | ZodError>;
	dataToUpdate: Artist | undefined;
};

export type { AdminArtistFormContentProps };