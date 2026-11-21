import { request } from "./artist_api_service";

class AuthApiService {
	private prefix = "/api/auth";

	public login = (email: string, password: string) =>
		request<{ email: string }>(`${this.prefix}/login`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

	public logout = () => request<null>(`${this.prefix}/logout`, { method: "post" });

	public me = () => request<{ email: string }>(`${this.prefix}/me`);
}

export default AuthApiService;
