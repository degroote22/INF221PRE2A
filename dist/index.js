"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var getTracks = function (data) {
    var lines = data
        .split(/\r?\n/)
        .filter(function (x) { return typeof x === "string" && x !== ""; });
    var linesNumber = lines[0], rest = lines.slice(1);
    if (parseInt(linesNumber, 10) !== lines.length - 1) {
        throw Error("Numero de linhas invalido");
    }
    return rest;
};
fs.readFile("./samples/1.txt", "utf8", function (err, data) {
    if (!err) {
        var tracks = getTracks(data);
        console.log("tracks", tracks);
    }
    else {
        console.error(err);
    }
});
