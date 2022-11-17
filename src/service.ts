import Docker from "dockerode";
import streams from "memory-streams";

import { convertStdoutToJSON } from "./utils";

export const getDockerResponse = async (
	image: string,
	cmd: string[],
	startOptions: Object
) => {
	const dockerOptions = { socketPath: "/var/run/docker.sock" };

	const docker = new Docker(dockerOptions);
	const stdout = new streams.WritableStream();
	const stderr = new streams.WritableStream();
	let result: string;

	await docker.run(image, cmd, stdout, startOptions, async (err: any) => {
		if (err) {
			console.log(err);
			console.log(stderr.toString());
		}
		result = convertStdoutToJSON(stdout);
		console.log(result);
		return result;
	});
};
