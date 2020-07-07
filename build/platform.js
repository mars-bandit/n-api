"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windows = exports.bin = exports.name = exports.names = void 0;
var names;
(function (names) {
    names["darwin"] = "osx";
    names["linux"] = "linux";
    names["win32"] = "windows";
})(names = exports.names || (exports.names = {}));
exports.name = names[process.platform];
if (!exports.name)
    throw new Error("Node platform not recognized.");
exports.bin = `bin-${exports.name}`;
exports.windows = exports.name == 'windows';
