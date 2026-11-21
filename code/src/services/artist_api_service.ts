import type { Artist } from "../../models/artist";
import type { ApiResponse } from "../models/api_response";

// URL de l'API : vide = même adresse que le site (Vite relaie /api en développement,
// Express sert le site et l'API en production)
export const API_URL = import.meta.env.VITE_API_URL ?? "";

// Requête commune : renvoie toujours un ApiResponse, même si le serveur est injoignable
// ou répond autre chose que du JSON (les pages peuvent alors afficher un message clair).
export const request = async <T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> => {
	try {
		const response = await fetch(`${API_URL}${path}`, { credentials: "include", ...init });
		const results = (await response.json()) as ApiResponse<T>;
		return { ...results, status: response.status };
	} catch {
		return { status: 0, message: "Le serveur est momentanément indisponible." };
	}
};

class ArtistApiService {
	private prefix = "/api/artist";

	public selectAll = () => request<Artist[]>(this.prefix);

	// récupérer un artiste
	public selectOne = (id: number) => request<Artist>(`${this.prefix}/${id}`);

	public insert = (data: FormData) => request<Artist>(this.prefix, { method: "post", body: data });

	public update = (data: FormData) => request<Artist>(this.prefix, { method: "put", body: data });

	public delete = (data: Partial<Artist>) =>
		request<Artist>(this.prefix, {
			method: "delete",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
}
export default ArtistApiService;
