
import type { Artist } from "../../models/artist";
import type { ApiResponse } from "../models/api_response";

class ArtistApiService {

    private prefix = "/api/artist";
    
    public selectAll = async (): Promise<ApiResponse<Artist[]>> => {
        const request = new Request(
            `${import.meta.env.VITE_API_URL}${this.prefix}`);
        const response = await fetch(request);
        const results = await response.json();
        return results;
    };

    // récupérer un artiste
    public selectOne = async (id: number): Promise<ApiResponse<Artist>> => {
        const request = new Request(
            `${import.meta.env.VITE_API_URL}${this.prefix}/${id}`);
        const response = await fetch(request);
        const results = await response.json();
        return results;
    };

    public insert = async (data: FormData): Promise<ApiResponse<Artist>> => {
        const request = new Request(
            `${import.meta.env.VITE_API_URL}${this.prefix}`,
            {
                method: 'post',
                body: data
            });
        const response = await fetch(request);
        const results = await response.json();
        return results;
    };
    
    public update = async (data: FormData): Promise<ApiResponse<Artist>> => {
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
			{
				method: "put",
				body: data,
			},
		);
		const response = await fetch(request);
            const results = await response.json();
            
		return results;
	};

    public delete = async (data: Partial<Artist>): Promise<ApiResponse<Artist>> => {
		
		const request = new Request(
			`${import.meta.env.VITE_API_URL}${this.prefix}`,
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
export default ArtistApiService;