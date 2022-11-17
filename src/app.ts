// create a new express application instance

import express from "express";
import { Request, Response } from "express";

import { result } from "./controller";

const app: express.Application = express();

app.get("/", async (req, res: Response) => {
	const response = await result();
	console.log(typeof response);
	res.send(JSON.stringify(response));
	// res.send();
});

app.listen(3000, () => {
	console.log("Example app listening on port 3000!");
});
