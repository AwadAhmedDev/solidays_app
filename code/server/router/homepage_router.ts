import express from "express";
import HomepageController from "../controller/homepage_controller";

class HomepageRouter {
	private router = express.Router();

    public getRoutes = () => {
        
		this.router.get("/", new HomepageController().index);

		return this.router;
	};
}
export default HomepageRouter;