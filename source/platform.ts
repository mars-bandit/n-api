export enum names {
	darwin = 'osx',
	linux = 'linux',
	win32 = 'windows'
}

export const name = names[process.platform as keyof typeof names];

if (!name) throw new Error("Node platform not recognized.");

export const bin = `bin-${name}`;

export const windows = name == 'windows';
