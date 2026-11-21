import express from "express";
import AuthController from "../controller/auth_controller";

class AuthRouter {
	private router = express.Router();

	public getRoutes = () => {
		this.router.post("/login", new AuthController().login);

		this.router.post("/logout", new AuthController().logout);

		this.router.get("/me", new AuthController().me);

		return this.router;
	};
}
export default AuthRouter;
