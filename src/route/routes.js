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
rota.get("/contato.js", (req, res) => {
    res.sendFile("contato.js", {root: './src/public'});
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

//ROTA CREATE DOAÇÃO
rota.post("/doacoes", async (req, res) => {
    const valor = req.body.valor;
    const id_voluntario = req.body.id_voluntario;
    const doacao = await controllerRoutes.createDoacao(valor, id_voluntario);
    res.status(200).send(doacao);
});

//ROTA CREATE BAZAR
rota.post("/bazar", async (req, res) => {
    const descricao = req.body.descricao;
    const id_voluntario = req.body.id_voluntario;
    const bazar = await controllerRoutes.createBazar(descricao, id_voluntario);
    res.status(200).send(bazar);
});

//ROTA CREATE MENSAGEM
rota.post("/contato", async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const mensagem = req.body.mensagem;
    const tipoContato = req.body.tipoContato;
    const contato = await controllerRoutes.createContato(nome, email, telefone, mensagem, tipoContato);
    res.status(200).send(contato);
});

//ROTA READ ALL Voluntarios
rota.get("/voluntarios/getAllVoluntarios", async(req, res) => {
    const getVoluntarios = await controllerRoutes.findAllVoluntarios();
    res.status(200).send(getVoluntarios);
});

//ROTA READ ALL Doações
rota.get("/doacoes/getAllDoacoes", async(req, res) => {
    const getDoacoes = await controllerRoutes.findAllDoacoes();
    res.status(200).send(getDoacoes);
});

//ROTA READ ALL Bazar
rota.get("/bazar/getAllBazar", async(req, res) => {
    const getBazar = await controllerRoutes.findAllBazar();
    res.status(200).send(getBazar);
});

//ROTA READ ALL Contato
rota.get("/contato/getAllContato", async(req, res) => {
    const getContato = await controllerRoutes.findAllContato();
    res.status(200).send(getContato);
});

export default rota;