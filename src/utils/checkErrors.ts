import puppeteer, { Page } from "puppeteer";
import { Socket } from "socket.io";

export default async function checkErrors(page: Page, socket: Socket) {
    var erro = 0;

    page.on("error", () => {
        erro++;
    });

    page.on("pageerror", () => {
        erro++;
    });

    page.on("requestfailed", () => {
        erro++;
    });

    if(erro > 0) {
        socket.emit("status", {error: true, message: "Ocorreu 1 erro ao acessar o site"});
        for(let i = 1; i > 3; i++){
            socket.emit("status", {error: true, message: "Iniciando nova tentativa de reloading"});
            await page.reload().catch(async () => {
                socket.emit("status", {error: true, message: `reloading ${i} falhou`});
            }).then(() => {
                socket.emit("status", {error: true, message: "site acessado"});
                i = 3
            });

            if(i == 3) {
                socket.emit("status", {error: true, message: "Iniciando ultima tentativa de reloading"});
                await page.reload().catch(async () => {
                    socket.emit("status", {error: true, message: `reloading ${i} falhou`});
                    await page.close();
                    socket.emit("status", {error: true, message: "Alguns codigos não foram cadastrados devido a um erro no site"});
                }).then(() => {
                    socket.emit("status", {error: true, message: "site acessado"});
                    i = 3
                });
            };
        };
    };
}