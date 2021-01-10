import puppeteer from "puppeteer";
import { Socket } from "socket.io";
import checkErrors from "./checkErrors";

interface IStatus {
    error: boolean;
    message: string;
}

interface IResultado {
    sucessos: string[];
    cadastrados: string[];
    invalidos: string[];
}

export default async function cadastro(cpf: string, codigos: Array<string>, socket: Socket) {
    var sucesso: Array<string> = [];
    var invalido: Array<string> = [];
    var cadastrado: Array<string> = [];

    socket.emit("status", {error: false, message: "Iniciando um novo browser"});
    const browser = await puppeteer.launch({
        headless: true
    });

    socket.emit("status", {error: false, message: "Abrindo uma nova pagina"});

    const page = await browser.newPage();
    await page.goto("https://www.nataldossonhosacibom.com.br/").catch(() => {
        checkErrors(page, socket);
    });

    await page.type("[name='cpf']", cpf);
    await page.click("[name='acao']");

    checkErrors(page, socket);
    await page.waitForNavigation();

    var redirect = await page.evaluate(() => {
        const url = window.location.href;

        return url;
    });

    if(redirect == "https://www.nataldossonhosacibom.com.br/") {
        socket.emit("status", {error: true, message: "Esse CPF (" + cpf + ") é invalido ou não pode participar da campanha"});
        await page.close();
        await browser.close();
        return;
    };

    if(redirect == "https://www.nataldossonhosacibom.com.br/cadastro") {
        socket.emit("status", {error: true, message: "Esse CPF (" + cpf + ") ainda não foi cadastrado na campanha acesse: https://www.nataldossonhosacibom.com.br/cadastro e faça seu cadastro"});
        await page.close();
        await browser.close();
        return;
    }
    
    socket.emit("status", {error: false, message: "Iniciando cadastro de cupons"});

    for (let i: number = 0; i < codigos.length; i++) {
        await page.waitForSelector('[name="codigo"]').catch(async () => {
            checkErrors(page, socket);
        }).then(async () => {
            await page.type('[name="codigo"]', codigos[i]);
            await page.click("[name='acao']");
            await page.waitForSelector("p.alert", {}).catch(() => {
                checkErrors(page, socket);
            }).then(async () => {
                var resultado = await page.evaluate(() => {
                    const res = document.querySelector("p.alert");

                    if(res) {
                        return res.innerHTML;
                    } else {
                        return undefined;
                    };
                });

                if(resultado !== undefined) {
                    if(resultado.indexOf("já") > -1) {
                        cadastrado.push(codigos[i]);
                    };

                    if(resultado.indexOf("sucesso") > -1) {
                        sucesso.push(codigos[i]);
                    };

                    if(resultado.indexOf("inválido") > -1) {
                        invalido.push(codigos[i]);
                    };
                };

                var porcentagem = Math.floor(((i+1)/codigos.length)*100);
                socket.emit("status", {error: false, message: `${porcentagem}% dos cupons já foram processados`});
            });
        });
    };

    socket.emit("status", {error: false, message: "Cadastro de cupons concluido"});
    socket.emit("resultado", {sucessos: sucesso, cadastrados: cadastrado, invalidos: invalido});

    await page.close();
    await browser.close();
};
