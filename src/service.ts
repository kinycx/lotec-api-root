import Docker from "dockerode";
import streams from "memory-streams";

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
