import { existsSync, readdirSync } from "fs";


export const convertStdoutToJSON = (stdout: any) => {
	let output = JSON.stringify(stdout.toString());
	output = output.replace(/\\n/g, "\n");
	output = output.replace(/\\t/g, "");
	output = output.replace(/\\r/g, ",\r");
	output = output.replace(/plate.*results\,/g, "");
	output = output.replace(/confidence/g, "");
	output = output.replace(/\"/g, "");
	output = output.replace(/\- /g, '"');
	output = output.replace(/ :/g, '":');
	// remove all spaces
	output = output.replace(/\s/g, "");
	output = `{${output}}`;
	output = output.replace(/,}/g, "}");
	return JSON.parse(output);
};

export const readAllJPGFilesName = (dir: string): string[] => {
	const files = readdirSync(dir);
	const jpgFiles = files.filter((file) => file.endsWith(".jpg"));
	console.log(jpgFiles);
	return jpgFiles;
}
