export * as paths from "./paths";
export * as platform from "./platform";

import { bin } from "./platform";

import { promises as fs, constants } from "fs";
import * as AdmZip from "adm-zip";

import * as fetch from "node-fetch";

export async function link(name: string) {
	const src = process.cwd().replace(/\\/g, '/');
	
	if (!await exists(`${src}/build/Release/${name}.node`) ) {
		console.error(`Error. File "${src}/build/Release/${name}.node" not found.`);
	}
	
	const binaries = `${src}/../${bin}`;
	
	await mkdir(binaries);
	
	const dst = `${binaries}/${name}.node`;
	
	await rm(dst);
	
	await fs.copyFile(`${src}/build/Release/${name}.node`, dst);

	console.log(`The binary "${name}.node" was copied to "${bin}".`);

}

export async function install(url: string) {
	try {
		const zip = `${bin}/${bin}`;

		// @ts-expect-error
		const response = await fetch(url, { follow: 5 });
		const buffer = await response.arrayBuffer();

		await mkdir(bin);

		await fs.writeFile(zip, new Buffer(buffer));

		const adm = new AdmZip(zip);
		adm.extractAllTo(bin, true);

		await rm(zip);

	} catch(error) {
		console.error(error);
		process.exit(-1);
	}
}

export async function exists(path: string) {
	try {
		await fs.access(path, constants.F_OK);
		return true;
	} catch {
		return false;
	}
}

export async function mkdir(path: string) {
	if (await exists(path)) {
		await fs.mkdir(path);
	}
}

export async function rm(path: string) {
	if (await exists(path)) {
		await fs.unlink(path);
	}
}

export async function rmdir(path: string) {
	if (await exists(path)) {
		await fs.rmdir(path);
	}
}

export async function write(path: string, text: string) {
	return fs.writeFile(path, text);
}

export async function read(path: string) {
	return (await fs.readFile(path)).toString();
}
