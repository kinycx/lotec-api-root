import { Request, Response } from "express";
import Docker from "dockerode";
import streams from "memory-streams";
import multer from "multer";
import path from "path";

import { convertStdoutToJSON } from "./utils";

export const getDockerResponse = async (
	image: string,
	cmd: string[],
	startOptions: Object = {},
	dockerOptions: Object = {}
) => {
	return new Promise((resolve, reject) => {
		const docker = new Docker(dockerOptions);
		const writable = new streams.WritableStream();
		docker.run(image, cmd, writable, startOptions, (err) => {
			if (err) {
				reject(err);
			}
			const stdout = writable.toString();
			const res = convertStdoutToJSON(stdout);
			resolve(res);
		});
	});
};

export const getUpload = (destinationPath: string) => { 
	const storage = multer.diskStorage({
	destination: (req: Request, file: any, cb: any) => {
		cb(null, destinationPath);
	},
	filename: (req: Request, file: any, cb: any) => {
		console.log(file);
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

	return upload;
}

