var buttonGestaoVoluntarios = document.getElementById("gestaoVoluntarios");
var btnVoluntarios = 0;

var buttonGestaoDoacoes = document.getElementById("gestaoDoacoes");
var btnDoacoes = 0;

var buttonGestaoBazar = document.getElementById("gestaoBazar");
var btnBazar = 0;

var inicioRetorno = document.getElementById("retorno");
var inicioRetornoTable = document.getElementById("retornoTable");

var gestaoV = 0;


buttonGestaoVoluntarios.addEventListener("click", (form) => {

    form.preventDefault();

    if(btnVoluntarios > 0) return;
    
    //Remover mensagens anteriores
    if(btnDoacoes == 1){
        var textDoacoes = document.getElementById("cadastroDoacoes");
        textDoacoes.remove();
        btnDoacoes--;
    }
    if(btnBazar == 1){
        var textBazar = document.getElementById("cadastroBazar");
        textBazar.remove();
        btnBazar--;
    }

    //Printar na tela as caixas
    inicioRetorno.insertAdjacentHTML("afterend", `
        <form id="cadastroVoluntarios">
        <input id="setNomeVoluntario" placeholder="Nome"/>
        <input id="setEmailVoluntario" placeholder="Email"/>
        <input id="setCPFVoluntario" placeholder="CPF"/>
        <input id="setTelefoneVoluntario" placeholder="Telefone"/>
        <button id="inserirVoluntario">Inserir Voluntario</button>
        <button id="exibirVoluntarios">Exibir Voluntarios</button>
        </form>
        `);
    btnVoluntarios++;

    var btnInserirV = document.getElementById("inserirVoluntario");
    var btnExibirV = document.getElementById("exibirVoluntarios");

    btnInserirV.addEventListener("click", async(form) => {
        form.preventDefault();
        if (gestaoV > 0){
            var tableV = document.querySelector("#tableVoluntario")
            var tableValoresV = document.querySelectorAll("#tableValoresVoluntarios");
            tableV.remove();
            tableValoresV.forEach(element => element.remove());
            gestaoV--;
        }

        var campoNomeV = document.getElementById("setNomeVoluntario");
        var campoEmailV = document.getElementById("setEmailVoluntario");
        var campoCPFV = document.getElementById("setCPFVoluntario");
        var campoTelefoneV = document.getElementById("setTelefoneVoluntario");
    
        var nomeV = campoNomeV.value;
        var emailV = campoEmailV.value;
        var cpfV = campoCPFV.value;
        var telefoneV = campoTelefoneV.value;

        if(!nomeV || !emailV || !cpfV || !telefoneV || isNaN(cpfV) === true || isNaN(telefoneV) === true){
            console.log("dados incorretos");
            return;
        }
    
        await fetch('/voluntarios', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: nomeV, email: emailV, cpf: cpfV, telefone: telefoneV})
        });

        campoNomeV.value = "";
        campoEmailV.value = "";
        campoCPFV.value = "";
        campoTelefoneV.value = "";
    });

    btnExibirV.addEventListener("click", async(form) => {
        form.preventDefault();

        if (gestaoV > 0) return;

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios",{
            method: "GET"
            })
            .then(response => response.json())          
            .then(json => allVoluntarios = json);
            
            inicioRetornoTable.insertAdjacentHTML("afterbegin", `<tr id="tableVoluntario"><td style="font-weight: bold;">Nome</td><td style="font-weight: bold;">Email</td><td style="font-weight: bold;">CPF</td><td style="font-weight: bold;">Telefone</td></tr>            
            `);
        for(var i=0; i < allVoluntarios.length; i++){
            inicioRetornoTable.insertAdjacentHTML("beforeend", `<tr id="tableValoresVoluntarios"><td>${allVoluntarios[i].nome}</td><td>${allVoluntarios[i].email}</td><td>${allVoluntarios[i].cpf}</td><td>${allVoluntarios[i].cpf}</td></tr>`);
        };
        gestaoV++;
    });
});

buttonGestaoDoacoes.addEventListener("click", () => {
    if(btnDoacoes > 0) return;

    //Remover mensagens anteriores
    if(btnVoluntarios == 1){
        var textVoluntarios = document.getElementById("cadastroVoluntarios");
        textVoluntarios.remove();
        btnVoluntarios--;
    }
    if(btnBazar == 1){
        var textBazar = document.getElementById("cadastroBazar");
        textBazar.remove();
        btnBazar--;
    }
    if (gestaoV > 0){
        var tableV = document.querySelector("#tableVoluntario")
        var tableValoresV = document.querySelectorAll("#tableValoresVoluntarios");
        tableV.remove();
        tableValoresV.forEach(element => element.remove());
        gestaoV--;
    }

    //Printar na tela as caixas
    inicioRetorno.insertAdjacentHTML("afterend", `
        <form id="cadastroDoacoes">
        <input id="setValorDoacao" placeholder="Valor da Doação ex: 25.99"/>
        <input id="setCPFDoacao" placeholder="CPF do Doador"/>
        <button id="inserirDoacao">Inserir Doação</button>
        <button id="exibirDoacoes">Exibir Doações</button>
        </form>
        `);
    btnDoacoes++;

    var btnInserirD = document.getElementById("inserirDoacao");
    var btnExibirD = document.getElementById("exibirDoacoes");

    btnInserirD.addEventListener("click", async(form) => {
        form.preventDefault();

        var campoValorD = document.getElementById("setValorDoacao");
        var campoCPFD = document.getElementById("setCPFDoacao");

        var valorD = campoValorD.value;
        var cpfD = campoCPFD.value;

        if(!valorD || !cpfD || isNaN(valorD) === true || isNaN(cpfD) === true){
            console.log("dados incorretos");
            return;
        }

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios",{
            method: "GET"
            })
            .then(response => response.json())          
            .then(json => allVoluntarios = json);

      
        let voluntarioID = cpfD;
        for(var i=0; i < allVoluntarios.length; i++){
            if(cpfD == allVoluntarios[i].cpf){
                voluntarioID = allVoluntarios[i].uuid;
            };
        };

        await fetch('/doacoes', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({valor: valorD, id_voluntario: voluntarioID})
        });

        campoValorD.value = "";
        campoCPFD.value = "";

    });
});

buttonGestaoBazar.addEventListener("click", () => {
    if(btnBazar > 0) return;

    //Remover mensagens anteriores
    if(btnVoluntarios == 1){
        var textVoluntarios = document.getElementById("cadastroVoluntarios");
        textVoluntarios.remove();
        btnVoluntarios--;
    }
    if(btnDoacoes == 1){
        var textDoacoes = document.getElementById("cadastroDoacoes");
        textDoacoes.remove();
        btnDoacoes--;
    }
    if (gestaoV > 0){
        var tableV = document.querySelector("#tableVoluntario")
        var tableValoresV = document.querySelectorAll("#tableValoresVoluntarios");
        tableV.remove();
        tableValoresV.forEach(element => element.remove());
        gestaoV--;
    }

    //Printar na tela as caixas
    inicioRetorno.insertAdjacentHTML("afterend", `
        <form id="cadastroBazar">
        <input id="setDescricaoBazar" placeholder="Descrição do Item do Bazar"/>
        <input id="setCPFBazar" placeholder="CPF do Doador"/>
        <button id="inserirBazar">Inserir Item do Bazar</button>
        <button id="exibirBazar">Exibir Itens do Bazar</button>
        </form>
        `);
    btnBazar++;
});