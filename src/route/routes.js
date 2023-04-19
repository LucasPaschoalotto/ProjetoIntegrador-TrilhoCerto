import { Router } from "express";
import controllerRoutes from "./controller.routes.js";

const rota = Router()

//Rota inicial do projeto ao subir o servidor e envio de arquivos necessários
rota.get("/", (req, res) => {
    res.sendFile("index.html", {root: './src/public'});
});
rota.get("/index.html", (req, res) => {
    res.sendFile("index.html", {root: './src/public'});
});
rota.get("/doacao.html", (req, res) => {
    res.sendFile("doacao.html", {root: './src/public'});
});
rota.get("/contato.html", (req, res) => {
    res.sendFile("contato.html", {root: './src/public'});
});
rota.get("/login.html", (req, res) => {
    res.sendFile("login.html", {root: './src/public'});
});
rota.get("/login.js", (req, res) => {
    res.sendFile("login.js", {root: './src/public'});
});
rota.get("/gestao.html", (req, res) => {
    res.sendFile("gestao.html", {root: './src/public'});
});
rota.get("/gestao.js", (req, res) => {
    res.sendFile("gestao.js", {root: './src/public'});
});

rota.get("/reset.css", (req, res) => {
    res.sendFile("reset.css", {root: './src/public'});
});
rota.get("/style.css", (req, res) => {
    res.sendFile("style.css", {root: './src/public'});
});

//Rota imagens
rota.get("/assets/bg.jpg", (req, res) => {
    res.sendFile("bg.jpg", {root: './src/assets'});
});
rota.get("/assets/crianca.jpg", (req, res) => {
    res.sendFile("crianca.jpg", {root: './src/assets'});
});
rota.get("/assets/logo.png", (req, res) => {
    res.sendFile("logo.png", {root: './src/assets'});
});
rota.get("/assets/qr.png", (req, res) => {
    res.sendFile("qr.png", {root: './src/assets'});
});
rota.get("/assets/sobre.jpg", (req, res) => {
    res.sendFile("sobre.jpg", {root: './src/assets'});
});


//ROTA CREATE VOLUNTARIO
rota.post("/voluntarios", async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const telefone = req.body.telefone;
    const user = await controllerRoutes.createVoluntario(nome, email, cpf, telefone);
    res.status(200).send(user);
});

//ROTA CREATE RENDA
rota.post("/users/renda", async (req, res) => {
    const id_usuario = req.body.id_usuario;
    const valor = req.body.valor;
    const descricao = req.body.descricao;
    const renda = await controllerRoutes.createRenda(id_usuario, valor, descricao);
    res.status(200).send(renda);
});

//ROTA CREATE DESPESA
rota.post("/users/despesa", async (req, res) => {
    const id_usuario = req.body.id_usuario;
    const valor = req.body.valor;
    const descricao = req.body.descricao;
    const despesa = await controllerRoutes.createDespesa(id_usuario, valor, descricao);
    res.status(200).send(despesa);
});

//ROTA CREATE SALDO
rota.post("/users/saldo", async (req, res) => {
    const id_usuario = req.body.id_usuario;
    const renda = req.body.renda;
    const despesa = req.body.despesa;
    const saldo = req.body.saldo;
    const saldoFinal = await controllerRoutes.createSaldo(id_usuario, renda, despesa, saldo);
    res.status(200).send(saldoFinal);
});


//ROTA READ ALL Voluntarios
rota.get("/voluntarios/getAllVoluntarios", async(req, res) => {
    const getVoluntarios = await controllerRoutes.findAllVoluntarios();
    res.status(200).send(getVoluntarios);
});

//ROTA READ ALL RENDAS
rota.get("/users/getAllRendas", async(req, res) => {
    const getRendas = await controllerRoutes.findAllRendas();
    res.status(200).send(getRendas);
});

//ROTA READ ALL DESPESAS
rota.get("/users/getAllDespesas", async(req, res) => {
    const getDespesas = await controllerRoutes.findAllDespesas();
    res.status(200).send(getDespesas);
});

//ROTA READ ALL SALDOS
rota.get("/users/getAllSaldos", async(req, res) => {
    const getSaldos = await controllerRoutes.findAllSaldos();
    res.status(200).send(getSaldos);
});

//ROTA READ BY NAME
rota.get("/users/getByUser", async(req, res) => {
    try{
        const nome = req.body.nome;
        const email = req.body.email;
        const cpf = req.body.cpf;
        const getUserName = await controllerRoutes.findByUser(nome, email, cpf);
        res.status(200).send(getUserName);
    } catch(error){
        console.log("erro no retorno do usuário por Nome");
    }    
})

//ROTA UPDATE BY NAME
rota.put("/users/updateSaldo", async(req, res) => {
    const id_usuario = req.body.id_usuario;
    const renda = req.body.renda;
    const despesa = req.body.despesa;
    const saldo = req.body.saldo;
    await controllerRoutes.updateSaldo(id_usuario, renda, despesa, saldo);
    res.status(200).send();
});

//ROTA DELETE
rota.delete("/users/deleteUser", async(req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const cpf = req.body.cpf;
    await controllerRoutes.deleteUser(nome, email, cpf);
    res.status(200).send();
});

export default rota;