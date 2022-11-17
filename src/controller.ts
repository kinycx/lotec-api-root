// import { dirname } from "path";

import { getDockerResponse } from "./service";

const startOptions = {
	HostConfig: {
		Binds: [`${__dirname}/assets:/data:ro`],
		Privileged: true,
		NetworkMode: "host",
	},
};

const image = "lotecalpr";
const cmd = ["-c", "eu", "/data/h786poj.jpg"];

export const result = async () => {
	const res = await getDockerResponse(image, cmd, startOptions);
	console.log(res);
	return res;
};
