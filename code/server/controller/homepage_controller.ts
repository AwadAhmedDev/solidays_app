import type { Request, Response } from "express";

class HomepageController {
	
	public index = (_req: Request, res: Response) => {
	
		res.status(200).json({
			status: 200,
			message: "Solidays API",
		});
	};
}

export default HomepageController;