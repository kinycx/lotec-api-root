import express from "express";
import { Request, Response } from "express";

import { getLicensePlateDataFromFrame } from "./controller";

const app: express.Application = express();
const PORT = 3000;

app.get("/", async (req: Request, res: Response) => {
	const out = await getLicensePlateDataFromFrame(req, res);
	res.send(JSON.stringify(out));
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
