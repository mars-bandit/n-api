import * as platform from "./platform";

export const root = __dirname.replace(/(?:\\)/g, '/');
export const napi = require('node-addon-api').include.replace(/\\/g, '/');
export const include = `${root}/include`;

export default function paths(dir: string) {

	dir = dir.replace(/\\/g, '/');
	
	const bin     = `${dir}/${platform.bin}`;
	const include = `${dir}/include`;
	
	if (platform.windows) {
		process.env.path = `${bin};${process.env.path ? `${process.env.path}` : ''}`;
	}
	
	return { bin, include };

}
