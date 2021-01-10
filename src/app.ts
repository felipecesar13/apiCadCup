import dotenv from "dotenv";

dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

import cadastro from "./utils/cadastro";
import { Socket } from "socket.io";

interface IData {
    cpf: string,
    codigos: string
}

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST"]
}});

io.on("connection", (socket: Socket) => {
    socket.on("cadastro", (data: IData) => {
        var codigos = data.codigos.split(",");
        cadastro(data.cpf, codigos, socket);
    });
});

server.listen(process.env.PORT || 3333, () => console.log("servidor rodando"));