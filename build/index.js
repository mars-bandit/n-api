"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.read = exports.write = exports.rmdir = exports.rm = exports.mkdir = exports.exists = exports.install = exports.link = void 0;
exports.paths = require("./paths");
exports.platform = require("./platform");
const platform_1 = require("./platform");
const fs_1 = require("fs");
const AdmZip = require("adm-zip");
const fetch = require("node-fetch");
async function link(name) {
    const src = process.cwd().replace(/\\/g, '/');
    if (!await exists(`${src}/build/Release/${name}.node`)) {
        console.error(`Error. File "${src}/build/Release/${name}.node" not found.`);
    }
    const binaries = `${src}/../${platform_1.bin}`;
    await mkdir(binaries);
    const dst = `${binaries}/${name}.node`;
    await rm(dst);
    await fs_1.promises.copyFile(`${src}/build/Release/${name}.node`, dst);
    console.log(`The binary "${name}.node" was copied to "${platform_1.bin}".`);
}
exports.link = link;
async function install(url) {
    try {
        const zip = `${platform_1.bin}/${platform_1.bin}`;
        // @ts-expect-error
        const response = await fetch(url, { follow: 5 });
        const buffer = await response.arrayBuffer();
        await mkdir(platform_1.bin);
        await fs_1.promises.writeFile(zip, new Buffer(buffer));
        const adm = new AdmZip(zip);
        adm.extractAllTo(platform_1.bin, true);
        await rm(zip);
    }
    catch (error) {
        console.error(error);
        process.exit(-1);
    }
}
exports.install = install;
async function exists(path) {
    try {
        await fs_1.promises.access(path, fs_1.constants.F_OK);
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.exists = exists;
async function mkdir(path) {
    if (await exists(path)) {
        await fs_1.promises.mkdir(path);
    }
}
exports.mkdir = mkdir;
async function rm(path) {
    if (await exists(path)) {
        await fs_1.promises.unlink(path);
    }
}
exports.rm = rm;
async function rmdir(path) {
    if (await exists(path)) {
        await fs_1.promises.rmdir(path);
    }
}
exports.rmdir = rmdir;
async function write(path, text) {
    return fs_1.promises.writeFile(path, text);
}
exports.write = write;
async function read(path) {
    return (await fs_1.promises.readFile(path)).toString();
}
exports.read = read;
