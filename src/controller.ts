import { Request, Response } from "express";
import { existsSync } from "fs";

import { getDockerResponse } from "./service";
import getAlprRequest from "./models";
import { successResponse, errorResponse } from "./response";

const bindPath = `${__dirname}/assets/frames`;

export const getLicensePlateDataFromFrame = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { framePath } = req.query as unknown as getAlprRequest;

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
			"lotecalpr",
			cmd,
			startOptions,
			dockerOptions
		);
		successResponse(res, plateDetection);
		return;
	}
};
