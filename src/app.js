"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var cadastro_1 = __importDefault(require("./utils/cadastro"));
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
var server = http_1.default.createServer(app);
var io = require("socket.io")(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"]
    }
});
io.on("connection", function (socket) {
    socket.on("cadastro", function (data) {
        var codigos = data.codigos.split(",");
        cadastro_1.default(data.cpf, codigos, socket);
    });
});
server.listen(process.env.PORT || 3333, function () { return console.log("servidor rodando"); });
