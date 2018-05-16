"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
exports.getTracks = function (data) {
    // Separa as linhas por newline
    var lines = data
        .split(/\r?\n/) //unix, windows e mac
        .filter(function (x) { return typeof x === "string" && x !== ""; });
    // A primeira linha é a quantidade e o resto são as linhas.
    // Se os valores são incosistentes, reportar o erro.
    var linesNumber = lines[0], rest = lines.slice(1);
    if (parseInt(linesNumber, 10) !== lines.length - 1) {
        throw Error("Numero de linhas inconsistente com o valor informado.");
    }
    return rest;
};
exports.getFileData = function (filePath) {
    // Tornar a operação uma promessa para o código main ficar mais simples.
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, "utf8", function (err, data) {
            if (err) {
                reject("Não foi possível abrir o arquivo de dados");
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.getCost = function (ints) {
    // O custo é quantos metros a pessoa tem que subir.
    // Constroi pares do caminho
    var pairs = ints.reduce(function (prev, curr, index) {
        var me = curr;
        var next = ints[index + 1];
        // Se for o último, nao vai ter o próximo
        if (!next) {
            return prev;
        }
        var newPair = [me, next];
        return prev.concat([newPair]);
    }, []);
    var cost = pairs.reduce(function (prev, curr) {
        var isRising = curr[0] < curr[1];
        var currCost = curr[1] - curr[0];
        if (isRising) {
            return prev + currCost;
        }
        return prev;
    }, 0);
    return cost;
};
exports.getCosts = function (tracks) {
    return tracks.map(function (track, index) {
        // Picota a string e transforma numa lista de números.
        var ints = track.split(" ").map(function (i) { return parseInt(i, 10); });
        var forward = exports.getCost(ints);
        var reverse = exports.getCost(ints.reverse());
        return {
            index: index,
            forward: forward,
            reverse: reverse
        };
    });
};
exports.getSmaller = function (costs) {
    var smaller = costs.reduce(function (prev, curr) {
        // Se é o primeiro ou só tem 1, retorna ele
        if (!prev) {
            return curr;
        }
        var currSmaller = Math.min(curr.forward, curr.reverse);
        var prevSmaller = Math.min(prev.forward, prev.reverse);
        // Só manda o atual se ele for estritamente menor.
        // Isso garante o retorno do menor índice caso sejam iguais.
        if (currSmaller < prevSmaller) {
            return curr;
        }
        // Se o atual não for estritamente menor,
        // o anterior é menor ou igual. Garante que o de
        // menor índice é retornado.
        return prev;
    }, 
    // Inicializado em null mas com o tipo Cost, que é o retorno.
    // Se o resultado for null, lança um erro
    null);
    if (smaller === null) {
        throw Error("Não foi encontrado o menor valor, provavelmente não foi \
informado valor algum na listas de valores desta trilha.");
    }
    return smaller.index;
};
exports.processByFilename = function (fileName) { return __awaiter(_this, void 0, void 0, function () {
    var data, tracks, costs, smaller;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getFileData(fileName)];
            case 1:
                data = _a.sent();
                tracks = exports.getTracks(data);
                costs = exports.getCosts(tracks);
                smaller = exports.getSmaller(costs) + 1;
                return [2 /*return*/, smaller];
        }
    });
}); };
