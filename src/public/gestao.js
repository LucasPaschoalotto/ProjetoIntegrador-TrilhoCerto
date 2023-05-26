var buttonGestaoVoluntarios = document.getElementById("gestaoVoluntarios");
var btnVoluntarios = 0;

var buttonGestaoDoacoes = document.getElementById("gestaoDoacoes");
var btnDoacoes = 0;

var buttonGestaoBazar = document.getElementById("gestaoBazar");
var btnBazar = 0;

var buttonGestaoContato = document.getElementById("gestaoContato");
var btnContato = 0;

var buttonGestaoRelatorios = document.getElementById("gestaoRelatorios");
var btnRelatorios = 0;

var inicioRetorno = document.getElementById("retorno");
var inicioRetornoTable = document.getElementById("retornoTable");

var gestaoV = 0;
var gestaoD = 0;
var gestaoB = 0;
var gestaoC = 0;
var gestaoR = 0;

//VOLUNTÁRIOS
buttonGestaoVoluntarios.addEventListener("click", (form) => {
    form.preventDefault();
    
    if(btnVoluntarios > 0) return;
    
    //Remover mensagens anteriores
    if(btnDoacoes == 1){
        var textDoacoes = document.getElementById("cadastroDoacoes");
        textDoacoes.remove();
        btnDoacoes--;
    };
    if(btnBazar == 1){
        var textBazar = document.getElementById("cadastroBazar");
        textBazar.remove();
        btnBazar--;
    };
    if (gestaoR == 1){
        var tipoR = document.getElementById("tipoRelatorio");
        var periodoR = document.getElementById("periodoRelatorio");
        tipoR.remove();
        periodoR.remove();
        gestaoR--;
    };
    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0){
        var tableRetorno = document.querySelector("#tableRetorno")
        var tableRetornoValores = document.querySelectorAll("#tableRetornoValores");
        tableRetorno.remove();
        tableRetornoValores.forEach(element => element.remove());
        gestaoV = 0;
        gestaoD = 0;
        gestaoB = 0;
        gestaoC = 0;
    };
    
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

    //Inserir Voluntários
    btnInserirV.addEventListener("click", async(form) => {
        form.preventDefault();

    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0){
        var tableRetorno = document.querySelector("#tableRetorno")
        var tableRetornoValores = document.querySelectorAll("#tableRetornoValores");
        tableRetorno.remove();
        tableRetornoValores.forEach(element => element.remove());
        gestaoV = 0;
        gestaoD = 0;
        gestaoB = 0;
        gestaoC = 0;
    };

        var campoNomeV = document.getElementById("setNomeVoluntario");
        var campoEmailV = document.getElementById("setEmailVoluntario");
        var campoCPFV = document.getElementById("setCPFVoluntario");
        var campoTelefoneV = document.getElementById("setTelefoneVoluntario");
    
        var nomeV = campoNomeV.value;
        var emailV = campoEmailV.value;
        var cpfV = campoCPFV.value;
        var telefoneV = campoTelefoneV.value;

        //Verifica se os dados estão corretos
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

        //Limpa os campos
        campoNomeV.value = "";
        campoEmailV.value = "";
        campoCPFV.value = "";
        campoTelefoneV.value = "";
    });

    //Exibir todos os voluntários
    btnExibirV.addEventListener("click", async(form) => {
        form.preventDefault();

        if (gestaoV > 0) return;

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios",{
            method: "GET"
            })
            .then(response => response.json())          
            .then(json => allVoluntarios = json);
        
        //Printa na tela uma tabela com os dados dos voluntários
        inicioRetornoTable.insertAdjacentHTML("afterbegin", `<tr id="tableRetorno"><td style="font-weight: bold;">Nome</td><td style="font-weight: bold;">Email</td><td style="font-weight: bold;">CPF</td><td style="font-weight: bold;">Telefone</td></tr>            
        `);
        for(var i=0; i < allVoluntarios.length; i++){
            inicioRetornoTable.insertAdjacentHTML("beforeend", `<tr id="tableRetornoValores"><td>${allVoluntarios[i].nome}</td><td>${allVoluntarios[i].email}</td><td>${allVoluntarios[i].cpf}</td><td>${allVoluntarios[i].telefone}</td></tr>`);
        };
        gestaoV++;
    });
});


//DOAÇÕES
buttonGestaoDoacoes.addEventListener("click", (form) => {
    form.preventDefault();

    if(btnDoacoes > 0) return;

    //Remover mensagens anteriores
    if(btnVoluntarios == 1){
        var textVoluntarios = document.getElementById("cadastroVoluntarios");
        textVoluntarios.remove();
        btnVoluntarios--;
    };
    if(btnBazar == 1){
        var textBazar = document.getElementById("cadastroBazar");
        textBazar.remove();
        btnBazar--;
    };
    if (gestaoR == 1){
        var tipoR = document.getElementById("tipoRelatorio");
        var periodoR = document.getElementById("periodoRelatorio");
        tipoR.remove();
        periodoR.remove();
        gestaoR--;
    };
    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0){
        var tableRetorno = document.querySelector("#tableRetorno")
        var tableRetornoValores = document.querySelectorAll("#tableRetornoValores");
        tableRetorno.remove();
        tableRetornoValores.forEach(element => element.remove());
        gestaoV = 0;
        gestaoD = 0;
        gestaoB = 0;
        gestaoC = 0;
    };

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

    //Inserir Doações
    btnInserirD.addEventListener("click", async(form) => {
        form.preventDefault();

        //Remove retorno de tabelas
        if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0){
            var tableRetorno = document.querySelector("#tableRetorno")
            var tableRetornoValores = document.querySelectorAll("#tableRetornoValores");
            tableRetorno.remove();
            tableRetornoValores.forEach(element => element.remove());
            gestaoV = 0;
            gestaoD = 0;
            gestaoB = 0;
            gestaoC = 0;
        };
   
        var campoValorD = document.getElementById("setValorDoacao");
        var campoCPFD = document.getElementById("setCPFDoacao");

        var valorD = campoValorD.value;
        var cpfD = campoCPFD.value;

        //Verifica se os dados inseridos estão corretos
        if(!valorD || !cpfD || isNaN(valorD) === true || isNaN(cpfD) === true){
            console.log("dados incorretos");
            return;
        };

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

        //Limpa os campos
        campoValorD.value = "";
        campoCPFD.value = "";
    });

    //Exibir todas as doações
    btnExibirD.addEventListener("click", async(form) => {
        form.preventDefault();

        if (gestaoD > 0) return;

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios",{
            method: "GET"
            })
            .then(response => response.json())          
            .then(json => allVoluntarios = json);
   
        let allDoacoes;
        await fetch("/doacoes/getAllDoacoes",{
            method: "GET"
            })
            .then(response => response.json())          
            .then(json => allDoacoes = json);
        
        //Printa na tela uma tabela com os dados das doações
        inicioRetornoTable.insertAdjacentHTML("afterbegin", `<tr id="tableRetorno"><td style="font-weight: bold;">Nome</td><td style="font-weight: bold;">Valor da Doação</td><td style="font-weight: bold;">Data</td></tr>            
        `);

        //Verifica, a partir do cpf, o nome do usuário responsável pela doação
        let doacaoNome;
        for(var i=0; i < allDoacoes.length; i++){
            let data = new Date(allDoacoes[i].datahora)
            let dataFormatada = ((data.getDate() + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()));

            for(var j=0; j < allVoluntarios.length; j++){
                if (allDoacoes[i].id_voluntario == allVoluntarios[j].uuid){
                    doacaoNome = allVoluntarios[j].nome;
                };
            };
            inicioRetornoTable.insertAdjacentHTML("beforeend", `<tr id="tableRetornoValores"><td>${doacaoNome}</td><td>R$ ${allDoacoes[i].valor}</td><td>${dataFormatada}</td></tr>`);
        };
        gestaoD++;
    });
});

//BAZAR
buttonGestaoBazar.addEventListener("click", () => {
    if(btnBazar > 0) return;

    //Remover mensagens anteriores
    if(btnVoluntarios == 1){
        var textVoluntarios = document.getElementById("cadastroVoluntarios");
        textVoluntarios.remove();
        btnVoluntarios--;
    };
    if(btnDoacoes == 1){
        var textDoacoes = document.getElementById("cadastroDoacoes");
        textDoacoes.remove();
        btnDoacoes--;
    };
    if (gestaoR == 1){
        var tipoR = document.getElementById("tipoRelatorio");
        var periodoR = document.getElementById("periodoRelatorio");
        tipoR.remove();
        periodoR.remove();
        gestaoR--;
    };
    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0){
        var tableRetorno = document.querySelector("#tableRetorno")
        var tableRetornoValores = document.querySelectorAll("#tableRetornoValores");
        tableRetorno.remove();
        tableRetornoValores.forEach(element => element.remove());
        gestaoV = 0;
        gestaoD = 0;
        gestaoB = 0;
        gestaoC = 0;
    };

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

    var btnInserirB = document.getElementById("inserirBazar");
    var btnExibirB = document.getElementById("exibirBazar");

    //Inserir Bazar
    btnInserirB.addEventListener("click", async(form) => {
        form.preventDefault();
        //Remove retorno de tabelas
        if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0){
            var tableRetorno = document.querySelector("#tableRetorno")
            var tableRetornoValores = document.querySelectorAll("#tableRetornoValores");
            tableRetorno.remove();
            tableRetornoValores.forEach(element => element.remove());
            gestaoV = 0;
            gestaoD = 0;
            gestaoB = 0;
            gestaoC = 0;
        };

        var campoDescricaoB = document.getElementById("setDescricaoBazar");
        var campoCPFB = document.getElementById("setCPFBazar");

        var descricaoB = campoDescricaoB.value;
        var cpfB = campoCPFB.value;

        //Verifica se os dados inseridos estão corretos
        if(!descricaoB || !cpfB || isNaN(descricaoB) === false || isNaN(cpfB) === true){
            console.log("dados incorretos");
            return;
        }

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios",{
            method: "GET"
            })
            .then(response => response.json())          
            .then(json => allVoluntarios = json);

        let voluntarioID = cpfB;
        for(var i=0; i < allVoluntarios.length; i++){
            if(cpfB == allVoluntarios[i].cpf){
                voluntarioID = allVoluntarios[i].uuid;
            };
        };

        await fetch('/bazar', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({descricao: descricaoB, id_voluntario: voluntarioID})
        });
    
        //Limpa os campos
        campoDescricaoB.value = "";
        campoCPFB.value = "";
    });

    //Exibir todos os itens do Bazar
    btnExibirB.addEventListener("click", async(form) => {
        form.preventDefault();

        if (gestaoB > 0) return;

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios",{
            method: "GET"
            })
            .then(response => response.json())          
            .then(json => allVoluntarios = json);
   
        let allBazar;
        await fetch("/bazar/getAllBazar",{
            method: "GET"
            })
            .then(response => response.json())          
            .then(json => allBazar = json);
        
        //Printa na tela uma tabela com os dados do Bazar
        inicioRetornoTable.insertAdjacentHTML("afterbegin", `<tr id="tableRetorno"><td style="font-weight: bold;">Nome</td><td style="font-weight: bold;">Descrição do Item</td><td style="font-weight: bold;">Data</td></tr>            
        `);

        //Verifica, a partir do cpf, o nome do usuário responsável pelo item do bazar
        let bazarNome;
        for(var i=0; i < allBazar.length; i++){
            let data = new Date(allBazar[i].datahora)
            let dataFormatada = ((data.getDate() + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()));

            for(var j=0; j < allVoluntarios.length; j++){
                if (allBazar[i].id_voluntario == allVoluntarios[j].uuid){
                    bazarNome = allVoluntarios[j].nome;
                };
            };
            inicioRetornoTable.insertAdjacentHTML("beforeend", `<tr id="tableRetornoValores"><td>${bazarNome}</td><td>${allBazar[i].descricao}</td><td>${dataFormatada}</td></tr>`);
        };
        gestaoB++;
    });
});

buttonGestaoContato.addEventListener("click", async(form) => {
    form.preventDefault();
    if(btnContato > 0) return;

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
    if(btnBazar == 1){
        var textBazar = document.getElementById("cadastroBazar");
        textBazar.remove();
        btnBazar--;
    };
    if (gestaoR == 1){
        var tipoR = document.getElementById("tipoRelatorio");
        var periodoR = document.getElementById("periodoRelatorio");
        tipoR.remove();
        periodoR.remove();
        gestaoR--;
    };

    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0){
        var tableRetorno = document.querySelector("#tableRetorno")
        var tableRetornoValores = document.querySelectorAll("#tableRetornoValores");
        tableRetorno.remove();
        tableRetornoValores.forEach(element => element.remove());
        gestaoV = 0;
        gestaoD = 0;
        gestaoB = 0;
        gestaoC = 0;
    };

    let allContato;
    await fetch("/contato/getAllContato",{
        method: "GET"
        })
        .then(response => response.json())          
        .then(json => allContato = json);
    
    //Printa na tela uma tabela com os dados do Bazar
    inicioRetornoTable.insertAdjacentHTML("afterbegin", `<tr id="tableRetorno"><td style="font-weight: bold;">Nome</td><td style="font-weight: bold;">Email</td><td style="font-weight: bold;">Telefone</td><td style="font-weight: bold;">Tipo de Contato</td><td style="font-weight: bold;">Mensagem</td><td style="font-weight: bold;">Data</td></tr>            
    `);
    
    for(var i = (allContato.length - 1); i > -1; i--){
        let data = new Date(allContato[i].datahora)
        let dataFormatada = ((data.getDate() + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()));

        inicioRetornoTable.insertAdjacentHTML("beforeend", `<tr id="tableRetornoValores"><td>${allContato[i].nome}</td><td>${allContato[i].email}</td><td>${allContato[i].telefone}</td><td>${allContato[i].tipocontato}</td><td>${allContato[i].mensagem}</td><td>${dataFormatada}</td></tr>`);
    };
    gestaoC++;
});

//RELATÓRIOS
buttonGestaoRelatorios.addEventListener("click", () => {
    if(btnRelatorios > 0) return;

    //Remover mensagens anteriores
    if(btnVoluntarios == 1){
        var textVoluntarios = document.getElementById("cadastroVoluntarios");
        textVoluntarios.remove();
        btnVoluntarios--;
    };
    if(btnDoacoes == 1){
        var textDoacoes = document.getElementById("cadastroDoacoes");
        textDoacoes.remove();
        btnDoacoes--;
    };
    if(btnBazar == 1){
        var textBazar = document.getElementById("cadastroBazar");
        textBazar.remove();
        btnBazar--;
    };
    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0){
        var tableRetorno = document.querySelector("#tableRetorno")
        var tableRetornoValores = document.querySelectorAll("#tableRetornoValores");
        tableRetorno.remove();
        tableRetornoValores.forEach(element => element.remove());
        gestaoV = 0;
        gestaoD = 0;
        gestaoB = 0;
        gestaoC = 0;
    };

     //Printar na tela as caixas
     inicioRetorno.insertAdjacentHTML("afterend", `
     <div id="relatorios">
     <fieldset id="tipoRelatorio">
        <legend>Tipo de relatórios:</legend>
        <select id="tipoRelatorios">
            <option>Voluntários</option>
            <option>Doações</option>
            <option>Itens do Bazar</option>
            <option>Mensagens</option>
        </select>
    </fieldset>
    <fieldset id="periodoRelatorio">
        <legend>Tipo de relatórios:</legend>
        <select id="periodoRelatorios">
            <option>Voluntários</option>
            <option>Doações</option>
            <option>Itens do Bazar</option>
            <option>Mensagens</option>
        </select>
   </fieldset>
   <button id="gerarRelatorio">Gerar Relatório</button>
   </div>
    `);

    gestaoR++;
});