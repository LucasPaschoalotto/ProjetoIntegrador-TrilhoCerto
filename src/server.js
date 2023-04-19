import server from "./app.js";

const porta = 8080;

//Inicializando o servidor na rota 5000
server.listen(porta, () => {
    console.log("Executando aplicação na porta 8080\nhttp://localhost:8080");
});
