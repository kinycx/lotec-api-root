import express from "express";
import { Request, Response } from "express";
import fetch from "node-fetch";
import * as fs from "fs";
import FormData from "form-data";
import { Blob } from "buffer";

import getAlprRequest from "./models";
import { getLicensePlateDataFromFrame, uploadSingleImage } from "./controller";
import { successResponse, errorResponse } from "./response";
import {readAllJPGFilesName} from "./utils";

const app: express.Application = express();
const PORT = 3000;
const IMAGE_DESTINATION_PATH = "assets/frames/test";

app.get("/", async (req: Request, res: Response) => {
	const { framePath } = req.query as unknown as getAlprRequest;
	const frames = await readAllJPGFilesName(`assets/frames/${framePath}`);
	let out: any[] = [];
	for (const frame of frames) {
		const plate = await getLicensePlateDataFromFrame(frame, res);
		out = [...out, plate];
	}
	successResponse(res, out);

});

app.post("/frame/upload", uploadSingleImage(IMAGE_DESTINATION_PATH) ,(req: Request, res: Response) => {
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
