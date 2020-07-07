"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.include = exports.napi = exports.root = void 0;
const platform = require("./platform");
exports.root = __dirname.replace(/(?:\\)/g, '/');
exports.napi = require('node-addon-api').include.replace(/\\/g, '/');
exports.include = `${exports.root}/include`;
function paths(dir) {
    dir = dir.replace(/\\/g, '/');
    const bin = `${dir}/${platform.bin}`;
    const include = `${dir}/include`;
    if (platform.windows) {
        process.env.path = `${bin};${process.env.path ? `${process.env.path}` : ''}`;
    }
    return { bin, include };
}
exports.default = paths;
