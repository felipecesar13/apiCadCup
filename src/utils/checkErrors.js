"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
function checkErrors(page, socket) {
    return __awaiter(this, void 0, void 0, function () {
        var erro, _loop_1, out_i_1, i;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    erro = 0;
                    page.on("error", function () {
                        erro++;
                    });
                    page.on("pageerror", function () {
                        erro++;
                    });
                    page.on("requestfailed", function () {
                        erro++;
                    });
                    if (!(erro > 0)) return [3 /*break*/, 5];
                    socket.emit("status", { error: true, message: "Ocorreu 1 erro ao acessar o site" });
                    _loop_1 = function (i) {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    socket.emit("status", { error: true, message: "Iniciando nova tentativa de reloading" });
                                    return [4 /*yield*/, page.reload().catch(function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                socket.emit("status", { error: true, message: "reloading " + i + " falhou" });
                                                return [2 /*return*/];
                                            });
                                        }); }).then(function () {
                                            socket.emit("status", { error: true, message: "site acessado" });
                                            i = 3;
                                        })];
                                case 1:
                                    _a.sent();
                                    if (!(i == 3)) return [3 /*break*/, 3];
                                    socket.emit("status", { error: true, message: "Iniciando ultima tentativa de reloading" });
                                    return [4 /*yield*/, page.reload().catch(function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        socket.emit("status", { error: true, message: "reloading " + i + " falhou" });
                                                        return [4 /*yield*/, page.close()];
                                                    case 1:
                                                        _a.sent();
                                                        socket.emit("status", { error: true, message: "Alguns codigos não foram cadastrados devido a um erro no site" });
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }).then(function () {
                                            socket.emit("status", { error: true, message: "site acessado" });
                                            i = 3;
                                        })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    ;
                                    out_i_1 = i;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 1;
                    _a.label = 1;
                case 1:
                    if (!(i > 3)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    i = out_i_1;
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    ;
                    _a.label = 5;
                case 5:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = checkErrors;
