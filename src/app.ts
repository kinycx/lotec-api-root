import express from "express";
import { Request, Response } from "express";
import fetch from "node-fetch";
import * as fs from "fs";
import FormData from "form-data";
import { Blob } from "buffer";

import getAlprRequest from "./models";
import { getLicensePlateDataFromFrame, uploadSingleImage } from "./controller";
import { successResponse, errorResponse } from "./response";

const app: express.Application = express();
const PORT = 3000;
const IMAGE_PATH = "src/assets/frames/test";

app.get("/", async (req: Request, res: Response) => {
	const { framePath } = req.query as unknown as getAlprRequest;
	let out: any[] = [];
	// check if framePath is an array
	if (!Array.isArray(framePath)) {
		out = await getLicensePlateDataFromFrame(framePath, res);
		// res.send(JSON.stringify(out))
		successResponse(res, out);
		return;
	}
	for (const frame of framePath) {
		const plate = await getLicensePlateDataFromFrame(frame, res);
		out = [...out, plate];
	}
	successResponse(res, out);

});

app.post("/frame/upload", uploadSingleImage(IMAGE_PATH) ,(req: Request, res: Response) => {
	console.log(req.file);
	res.send("File uploaded successfully");
});

// send image to server multipart/form-data
app.get("/fetch", async (req: Request, res: Response) => {
	const filePath = "src/assets/frames/";
	const fileNames = ["1.jpg", "2.jpg"];
	const formData = new FormData();
	for (const fileName of fileNames) {
		formData.append("image", fs.readFileSync(`${filePath}${fileName}`), {
			filename: fileName,
			contentType: "image/jpeg",
		});
	}

	const response = await fetch("http://localhost:3000/frame/upload", {
		method: "POST",
		body: formData,
});

res.send('File uploaded successfully')
});


app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
