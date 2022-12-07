import { Request, Response } from "express";
import { existsSync } from "fs";

import { getDockerResponse, getUpload } from "./service";
import { successResponse, errorResponse } from "./response";

const bindPath = `${__dirname}/../assets/frames`;

export const getLicensePlateDataFromFrame = async (
	framePath: string,
	res: Response
): Promise<any> => {

	const startOptions = {
		HostConfig: {
			Binds: [`${bindPath}:/data:ro`],
			Privileged: true,
			NetworkMode: "host",
		},
	};
	const dockerOptions = { socketPath: "/var/run/docker.sock" };
	const cmd = ["-c", "eu", `/data/${framePath}`];
	const imagePath = `${bindPath}/${framePath}`;

	// check if image exists
	if (!existsSync(imagePath)) {
		errorResponse(res, 404, "Image not found");
	} else {
		const plateDetection = await getDockerResponse(
			"openalpr",
			cmd,
			startOptions,
			dockerOptions
		);
		
		return plateDetection;
	}
};

export const uploadSingleImage = (destinationPath: string) => {
	const upload = getUpload(destinationPath); //"src/assets/frames/test"
	return upload.array("image");
	
};


