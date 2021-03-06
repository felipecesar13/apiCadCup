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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var checkErrors_1 = __importDefault(require("./checkErrors"));
function cadastro(cpf, codigos, socket) {
    return __awaiter(this, void 0, void 0, function () {
        var sucesso, invalido, cadastrado, browser, page, redirect, _loop_1, i;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sucesso = [];
                    invalido = [];
                    cadastrado = [];
                    socket.emit("status", { error: false, message: "Iniciando um novo browser" });
                    return [4 /*yield*/, puppeteer_1.default.launch({
                            headless: true,
                            args: ["--no-sandbox"]
                        })];
                case 1:
                    browser = _a.sent();
                    socket.emit("status", { error: false, message: "Abrindo uma nova pagina" });
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("https://www.nataldossonhosacibom.com.br/").catch(function () {
                            checkErrors_1.default(page, socket);
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.type("[name='cpf']", cpf)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.click("[name='acao']")];
                case 5:
                    _a.sent();
                    checkErrors_1.default(page, socket);
                    return [4 /*yield*/, page.waitForNavigation()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var url = window.location.href;
                            return url;
                        })];
                case 7:
                    redirect = _a.sent();
                    if (!(redirect == "https://www.nataldossonhosacibom.com.br/")) return [3 /*break*/, 10];
                    socket.emit("status", { error: true, message: "Esse CPF (" + cpf + ") é invalido ou não pode participar da campanha" });
                    return [4 /*yield*/, page.close()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
                case 10:
                    ;
                    if (!(redirect == "https://www.nataldossonhosacibom.com.br/cadastro")) return [3 /*break*/, 13];
                    socket.emit("status", { error: true, message: "Esse CPF (" + cpf + ") ainda não foi cadastrado na campanha acesse: https://www.nataldossonhosacibom.com.br/cadastro e faça seu cadastro" });
                    return [4 /*yield*/, page.close()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
                case 13:
                    socket.emit("status", { error: false, message: "Iniciando cadastro de cupons" });
                    _loop_1 = function (i) {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, page.waitForSelector('[name="codigo"]').catch(function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            checkErrors_1.default(page, socket);
                                            return [2 /*return*/];
                                        });
                                    }); }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, page.type('[name="codigo"]', codigos[i])];
                                                case 1:
                                                    _a.sent();
                                                    return [4 /*yield*/, page.click("[name='acao']")];
                                                case 2:
                                                    _a.sent();
                                                    return [4 /*yield*/, page.waitForSelector("p.alert", {}).catch(function () {
                                                            checkErrors_1.default(page, socket);
                                                        }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                            var resultado, porcentagem;
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4 /*yield*/, page.evaluate(function () {
                                                                            var res = document.querySelector("p.alert");
                                                                            if (res) {
                                                                                return res.innerHTML;
                                                                            }
                                                                            else {
                                                                                return undefined;
                                                                            }
                                                                            ;
                                                                        })];
                                                                    case 1:
                                                                        resultado = _a.sent();
                                                                        if (resultado !== undefined) {
                                                                            if (resultado.indexOf("já") > -1) {
                                                                                cadastrado.push(codigos[i]);
                                                                            }
                                                                            ;
                                                                            if (resultado.indexOf("sucesso") > -1) {
                                                                                sucesso.push(codigos[i]);
                                                                            }
                                                                            ;
                                                                            if (resultado.indexOf("inválido") > -1) {
                                                                                invalido.push(codigos[i]);
                                                                            }
                                                                            ;
                                                                        }
                                                                        ;
                                                                        porcentagem = Math.floor(((i + 1) / codigos.length) * 100);
                                                                        socket.emit("status", { error: false, message: porcentagem + "% dos cupons j\u00E1 foram processados" });
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); })];
                                                case 3:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 14;
                case 14:
                    if (!(i < codigos.length)) return [3 /*break*/, 17];
                    return [5 /*yield**/, _loop_1(i)];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16:
                    i++;
                    return [3 /*break*/, 14];
                case 17:
                    ;
                    socket.emit("status", { error: false, message: "Cadastro de cupons concluido" });
                    socket.emit("resultado", { sucessos: sucesso, cadastrados: cadastrado, invalidos: invalido });
                    return [4 /*yield*/, page.close()];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 19:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = cadastro;
;
