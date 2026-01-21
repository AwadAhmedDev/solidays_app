import type { ApiResponse } from "../../models/api_response";
import type { Artist } from "../../models/artist";

class ApiArtistService {

    // récupérer tous les artistes
    public selectAll = async (): Promise<ApiResponse<Artist[]>> => {
        const request = new
            Request(`${import.meta.env.VITE_API_URL}/api/artist`);
        const response = await fetch(request);
        const results = await response.json();
        return results;
    };

    // récupérer un artiste
    public selectOne = async (id: number): Promise<ApiResponse<Artist>> => {
        const request = new
            Request(`${import.meta.env.VITE_API_URL}/api/artist/${id}`);
        const response = await fetch(request);
        const results = await response.json();
        return results;
    };

    public insert = async (data: FormData): Promise<ApiResponse<null>> => {
        const request = new
            Request(`${import.meta.env.VITE_API_URL}/api/artist`, {
                method: 'post',
                body: data
            });
        const response = await fetch(request);
        const results = await response.json();
        return results;
    };
    
    public update = async (data: FormData): Promise<ApiResponse<Artist>> => {
		// configurer la requête HTTP
		const request = new Request(
			`${import.meta.env.VITE_API_URL}/api/artist`,
			{
				method: "put",
				body: data,
			},
		);
		const response = await fetch(request);
            const results = await response.json();
            
		return results;
	};


    public delete = async (
		data: Partial<Artist>,
	): Promise<ApiResponse<Artist>> => {
		
		const request = new Request(
			`${import.meta.env.VITE_API_URL}/api/artist`,
			{
				method: "delete",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		);

		const response = await fetch(request);
		const results = await response.json();

		return results;
	};
}
export default ApiArtistService;