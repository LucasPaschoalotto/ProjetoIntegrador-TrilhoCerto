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
var relatorioBGerado = 0;

//VOLUNTÁRIOS
buttonGestaoVoluntarios.addEventListener("click", (form) => {
    form.preventDefault();

    if (btnVoluntarios > 0) return;

    //Remover mensagens anteriores
    if (btnDoacoes == 1) {
        var textDoacoes = document.getElementById("cadastroDoacoes");
        textDoacoes.remove();
        btnDoacoes--;
    };
    if (btnBazar == 1) {
        var textBazar = document.getElementById("cadastroBazar");
        textBazar.remove();
        btnBazar--;
    };
    if (gestaoR == 1) {
        var textR = document.getElementById("relatorios");
        var chartRetorno = document.querySelector("#chart");
        if (relatorioBGerado > 0) {
            var divChart1 = document.querySelector("#chart1");
            divChart1.remove();
            var divChart2 = document.querySelector("#chart2");
            divChart2.remove();
        }
        textR.remove();
        chartRetorno.remove();
        gestaoR--;
    };
    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0) {
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
    btnInserirV.addEventListener("click", async (form) => {
        form.preventDefault();

        //Remove retorno de tabelas
        if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0) {
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
        if (!nomeV || !emailV || !cpfV || !telefoneV || isNaN(cpfV) === true || isNaN(telefoneV) === true) {
            console.log("dados incorretos");
            return;
        }

        await fetch('/voluntarios', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nomeV, email: emailV, cpf: cpfV, telefone: telefoneV })
        });

        //Limpa os campos
        campoNomeV.value = "";
        campoEmailV.value = "";
        campoCPFV.value = "";
        campoTelefoneV.value = "";
    });

    //Exibir todos os voluntários
    btnExibirV.addEventListener("click", async (form) => {
        form.preventDefault();

        if (gestaoV > 0) return;

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios", {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => allVoluntarios = json);

        //Printa na tela uma tabela com os dados dos voluntários
        inicioRetornoTable.insertAdjacentHTML("afterbegin", `<tr id="tableRetorno"><td style="font-weight: bold;">Nome</td><td style="font-weight: bold;">Email</td><td style="font-weight: bold;">CPF</td><td style="font-weight: bold;">Telefone</td></tr>            
        `);
        for (var i = 0; i < allVoluntarios.length; i++) {
            inicioRetornoTable.insertAdjacentHTML("beforeend", `<tr id="tableRetornoValores"><td>${allVoluntarios[i].nome}</td><td>${allVoluntarios[i].email}</td><td>${allVoluntarios[i].cpf}</td><td>${allVoluntarios[i].telefone}</td></tr>`);
        };
        gestaoV++;
    });
});


//DOAÇÕES
buttonGestaoDoacoes.addEventListener("click", (form) => {
    form.preventDefault();

    if (btnDoacoes > 0) return;

    //Remover mensagens anteriores
    if (btnVoluntarios == 1) {
        var textVoluntarios = document.getElementById("cadastroVoluntarios");
        textVoluntarios.remove();
        btnVoluntarios--;
    };
    if (btnBazar == 1) {
        var textBazar = document.getElementById("cadastroBazar");
        textBazar.remove();
        btnBazar--;
    };
    if (gestaoR == 1) {
        var textR = document.getElementById("relatorios");
        var chartRetorno = document.querySelector("#chart");
        if (relatorioBGerado > 0) {
            var divChart1 = document.querySelector("#chart1");
            divChart1.remove();
            var divChart2 = document.querySelector("#chart2");
            divChart2.remove();
        }
        textR.remove();
        chartRetorno.remove();
        gestaoR--;
    };
    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0) {
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
    btnInserirD.addEventListener("click", async (form) => {
        form.preventDefault();

        //Remove retorno de tabelas
        if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0) {
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
        if (!valorD || !cpfD || isNaN(valorD) === true || isNaN(cpfD) === true) {
            console.log("dados incorretos");
            return;
        };

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios", {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => allVoluntarios = json);


        let voluntarioID = cpfD;
        for (var i = 0; i < allVoluntarios.length; i++) {
            if (cpfD == allVoluntarios[i].cpf) {
                voluntarioID = allVoluntarios[i].uuid;
            };
        };

        await fetch('/doacoes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ valor: valorD, id_voluntario: voluntarioID })
        });

        //Limpa os campos
        campoValorD.value = "";
        campoCPFD.value = "";
    });

    //Exibir todas as doações
    btnExibirD.addEventListener("click", async (form) => {
        form.preventDefault();

        if (gestaoD > 0) return;

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios", {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => allVoluntarios = json);

        let allDoacoes;
        await fetch("/doacoes/getAllDoacoes", {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => allDoacoes = json);

        //Printa na tela uma tabela com os dados das doações
        inicioRetornoTable.insertAdjacentHTML("afterbegin", `<tr id="tableRetorno"><td style="font-weight: bold;">Nome</td><td style="font-weight: bold;">Valor da Doação</td><td style="font-weight: bold;">Data</td></tr>            
        `);

        //Verifica, a partir do cpf, o nome do usuário responsável pela doação
        let doacaoNome;
        for (var i = 0; i < allDoacoes.length; i++) {
            let data = new Date(allDoacoes[i].datahora)
            let dataFormatada = ((data.getDate() + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()));

            for (var j = 0; j < allVoluntarios.length; j++) {
                if (allDoacoes[i].id_voluntario == allVoluntarios[j].uuid) {
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
    if (btnBazar > 0) return;

    //Remover mensagens anteriores
    if (btnVoluntarios == 1) {
        var textVoluntarios = document.getElementById("cadastroVoluntarios");
        textVoluntarios.remove();
        btnVoluntarios--;
    };
    if (btnDoacoes == 1) {
        var textDoacoes = document.getElementById("cadastroDoacoes");
        textDoacoes.remove();
        btnDoacoes--;
    };
    if (gestaoR == 1) {
        var textR = document.getElementById("relatorios");
        var chartRetorno = document.querySelector("#chart");
        if (relatorioBGerado > 0) {
            var divChart1 = document.querySelector("#chart1");
            divChart1.remove();
            var divChart2 = document.querySelector("#chart2");
            divChart2.remove();
        }
        textR.remove();
        chartRetorno.remove();
        gestaoR--;
    };
    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0) {
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
    btnInserirB.addEventListener("click", async (form) => {
        form.preventDefault();
        //Remove retorno de tabelas
        if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0) {
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
        if (!descricaoB || !cpfB || isNaN(descricaoB) === false || isNaN(cpfB) === true) {
            console.log("dados incorretos");
            return;
        }

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios", {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => allVoluntarios = json);

        let voluntarioID = cpfB;
        for (var i = 0; i < allVoluntarios.length; i++) {
            if (cpfB == allVoluntarios[i].cpf) {
                voluntarioID = allVoluntarios[i].uuid;
            };
        };

        await fetch('/bazar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao: descricaoB, id_voluntario: voluntarioID })
        });

        //Limpa os campos
        campoDescricaoB.value = "";
        campoCPFB.value = "";
    });

    //Exibir todos os itens do Bazar
    btnExibirB.addEventListener("click", async (form) => {
        form.preventDefault();

        if (gestaoB > 0) return;

        let allVoluntarios;
        await fetch("/voluntarios/getAllVoluntarios", {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => allVoluntarios = json);

        let allBazar;
        await fetch("/bazar/getAllBazar", {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => allBazar = json);

        let allBazarVendido;
        await fetch("/bazar/getAllBazarVendido", {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => allBazarVendido = json);

        //Printa na tela uma tabela com os dados do Bazar
        inicioRetornoTable.insertAdjacentHTML("afterbegin", `<tr id="tableRetorno"><td style="font-weight: bold;">Nome</td><td style="font-weight: bold;">Descrição do Item</td><td style="font-weight: bold;">Data</td><td style="font-weight: bold;">Remover Item</td></tr>            
        `);

        //Verifica, a partir do cpf, o nome do usuário responsável pelo item do bazar
        let bazarNome;
        for (var i = 0; i < allBazar.length - 1; i++) {
            let data = new Date(allBazar[i].datahora)
            let dataFormatada = ((data.getDate() + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()));

            for (var k = 0; k < allBazarVendido.length; k++) {
                if (allBazar[i].uuid == allBazarVendido[k].uuid) {
                    i++;
                    break;
                };
            };

            for (var j = 0; j < allVoluntarios.length; j++) {
                if (allBazar[i].id_voluntario == allVoluntarios[j].uuid) {
                    bazarNome = allVoluntarios[j].nome;
                };
            };
            inicioRetornoTable.insertAdjacentHTML("beforeend", `<tr id="tableRetornoValores"><td>${bazarNome}</td><td>${allBazar[i].descricao}</td><td>${dataFormatada}</td><td><button class="excluirItem" id="idExclusao">X</button> Remover</td></tr>`);
            let btnExclusao = document.getElementById("idExclusao");
            btnExclusao.id = i;
        };

        //Implementa a exclusão de itens do Bazar pelo botão
        var btnExcluir = document.getElementsByClassName("excluirItem");

        for (var i = 0; i < btnExcluir.length; i++) {
            btnExcluir[i].addEventListener("click", async function () {
                let itemVendido = this.id;
                let uuidV = allBazar[itemVendido].uuid
                let voluntarioV = allBazar[itemVendido].id_voluntario;
                let descricaoV = allBazar[itemVendido].descricao;
                let valorItem = prompt("Digite o valor do item vendido:");

                if (!valorItem) return;

                await fetch('/bazarVendido', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({ uuid: uuidV, descricao: descricaoV, id_voluntario: voluntarioV, valor: valorItem })
                });

                let btnSelecionado = document.getElementById(`${itemVendido}`)
                btnSelecionado.remove();
            });
        };

        gestaoB++;
    });
});

//Gestão Contato
buttonGestaoContato.addEventListener("click", async (form) => {
    form.preventDefault();
    if (btnContato > 0) return;

    //Remover mensagens anteriores
    if (btnVoluntarios == 1) {
        var textVoluntarios = document.getElementById("cadastroVoluntarios");
        textVoluntarios.remove();
        btnVoluntarios--;
    }
    if (btnDoacoes == 1) {
        var textDoacoes = document.getElementById("cadastroDoacoes");
        textDoacoes.remove();
        btnDoacoes--;
    }
    if (gestaoR == 1) {
        var textR = document.getElementById("relatorios");
        var chartRetorno = document.querySelector("#chart");
        if (relatorioBGerado > 0) {
            var divChart1 = document.querySelector("#chart1");
            divChart1.remove();
            var divChart2 = document.querySelector("#chart2");
            divChart2.remove();
        }
        textR.remove();
        chartRetorno.remove();
        gestaoR--;
    };
    if (gestaoR == 1) {
        var textR = document.getElementById("relatorios");
        var chartRetorno = document.querySelector("#chart");
        textR.remove();
        chartRetorno.remove();
        gestaoR--;
    };

    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0) {
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
    await fetch("/contato/getAllContato", {
        method: "GET"
    })
        .then(response => response.json())
        .then(json => allContato = json);

    //Printa na tela uma tabela com os dados do Bazar
    inicioRetornoTable.insertAdjacentHTML("afterbegin", `<tr id="tableRetorno"><td style="font-weight: bold;">Nome</td><td style="font-weight: bold;">Email</td><td style="font-weight: bold;">Telefone</td><td style="font-weight: bold;">Tipo de Contato</td><td style="font-weight: bold;">Mensagem</td><td style="font-weight: bold;">Data</td></tr>            
        `);

    for (var i = (allContato.length - 1); i > -1; i--) {
        let data = new Date(allContato[i].datahora)
        let dataFormatada = ((data.getDate() + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear()));

        inicioRetornoTable.insertAdjacentHTML("beforeend", `<tr id="tableRetornoValores"><td>${allContato[i].nome}</td><td>${allContato[i].email}</td><td>${allContato[i].telefone}</td><td>${allContato[i].tipocontato}</td><td>${allContato[i].mensagem}</td><td>${dataFormatada}</td></tr>`);
    };
    gestaoC++;
});

//RELATÓRIOS
buttonGestaoRelatorios.addEventListener("click", () => {
    if (btnRelatorios > 0) return;

    //Remover mensagens anteriores
    if (btnVoluntarios == 1) {
        var textVoluntarios = document.getElementById("cadastroVoluntarios");
        textVoluntarios.remove();
        btnVoluntarios--;
    };
    if (btnDoacoes == 1) {
        var textDoacoes = document.getElementById("cadastroDoacoes");
        textDoacoes.remove();
        btnDoacoes--;
    };
    if (btnBazar == 1) {
        var textBazar = document.getElementById("cadastroBazar");
        textBazar.remove();
        btnBazar--;
    };
    //Remove retorno de tabelas
    if (gestaoV > 0 || gestaoD > 0 || gestaoB > 0 || gestaoC > 0) {
        var tableRetorno = document.querySelector("#tableRetorno")
        var tableRetornoValores = document.querySelectorAll("#tableRetornoValores");
        tableRetorno.remove();
        tableRetornoValores.forEach(element => element.remove());
        gestaoV = 0;
        gestaoD = 0;
        gestaoB = 0;
        gestaoC = 0;
    };
    gestaoR++;

    //Printar na tela as caixas
    inicioRetorno.insertAdjacentHTML("afterend", `
        <div id="relatorios">
        <fieldset id="tipoRelatorio">
        <legend>Tipo de relatório:</legend>
        <select id="tipoRelatorios">
        <option id="relatorioVoluntario">Voluntários</option>
        <option id="relatorioDoacao">Doações</option>
        <option id="relatorioBazar">Itens do Bazar</option>
        <option id="relatorioMensagem">Mensagens</option>
        </select>
        </fieldset>
        </fieldset>
        <button id="gerarRelatorio">Gerar Relatório</button>
        </div>
        `);

    var btnGerarRelatorio = document.getElementById("gerarRelatorio");
    var relatorioVoluntario = document.getElementById("relatorioVoluntario")
    var relatorioDoacao = document.getElementById("relatorioDoacao");
    var relatorioBazar = document.getElementById("relatorioBazar");
    var relatorioMensagem = document.getElementById("relatorioMensagem");

    let fimRelatorios = document.getElementById("relatorios");

    fimRelatorios.insertAdjacentHTML("afterend", `
        <div id="chart">
        `)

    let fimChart1 = document.getElementById("chart");
    fimChart1.insertAdjacentHTML("afterend", `
        <div id="chart1">
        `);
    let fimChart2 = document.getElementById("chart");
    fimChart1.insertAdjacentHTML("afterend", `
        <div id="chart2">
        `);
    //Gerar Relatórios e Gráficos
    btnGerarRelatorio.addEventListener("click", async () => {
        if (relatorioBGerado > 0) {
            var divChart1 = document.querySelector("#chart1");
            divChart1.remove();
            var divChart2 = document.querySelector("#chart2");
            divChart2.remove();
            let fimChart1 = document.getElementById("chart");
            fimChart1.insertAdjacentHTML("afterend", `
                <div id="chart1">
                `);
            let fimChart2 = document.getElementById("chart");
            fimChart1.insertAdjacentHTML("afterend", `
                <div id="chart2">
                `);
        }
        if (relatorioVoluntario.selected) {
            let quantidadeVMes4 = 0;
            let quantidadeVMes5 = 0;
            let quantidadeVMes6 = 0;

            let allVoluntarios;
            await fetch("/voluntarios/getAllVoluntarios", {
                method: "GET"
            })
                .then(response => response.json())
                .then(json => allVoluntarios = json);

            for (let i = 0; i < allVoluntarios.length; i++) {
                let data = new Date(allVoluntarios[i].datahora)
                let voluntariosMes = data.getMonth() + 1;

                switch (voluntariosMes) {
                    case 4:
                        quantidadeVMes4++;
                        break;
                    case 5:
                        quantidadeVMes5++;
                        break;
                    case 6:
                        quantidadeVMes6++;
                        break;
                };
            };

            let totalV = quantidadeVMes4 + quantidadeVMes5 + quantidadeVMes6;
            let mediaV = parseFloat(((totalV) / 3).toFixed(2));

            let mesMaiorVQuantidade = Math.max(quantidadeVMes4, quantidadeVMes5, quantidadeVMes6);

            let mesMaiorV;
            switch (mesMaiorVQuantidade) {
                case quantidadeVMes4:
                    mesMaiorV = "Abril";
                    break;

                case quantidadeVMes5:
                    mesMaiorV = "Maio";
                    break;

                case quantidadeVMes6:
                    mesMaiorV = "Junho";
                    break;
            };

            console.log("Mês4:", quantidadeVMes4, "Mês5:", quantidadeVMes5, "Mês6:", quantidadeVMes6, "Média:", parseFloat(mediaV.toFixed(2)), "Mês com maior volume de cadastro:", mesMaiorV, "Quantidade:", mesMaiorVQuantidade);

            google.charts.load('current', { packages: ['corechart'] })
            google.charts.setOnLoadCallback(drawChartVoluntarios)
            function drawChartVoluntarios() {
                let data = new google.visualization.arrayToDataTable([
                    ["Mês", "Quantidade de Voluntários"],
                    ["Abril", quantidadeVMes4],
                    ["Maio", quantidadeVMes5],
                    ["Junho", quantidadeVMes6],
                    ["Média de Voluntários/mês", mediaV],
                    ["Total", totalV]
                ]);
                let options = {
                    title: "Voluntários:",
                    height: 540,
                }

                let chart = new google.visualization.ColumnChart(document.getElementById("chart"))
                chart.draw(data, options);
            };

            var dataVoluntarios = [ 
                ["Mês", "Quantidade de Voluntários"],
                ["Abril", quantidadeVMes4],
                ["Maio", quantidadeVMes5],
                ["Junho", quantidadeVMes6],
                ["Média de Voluntários/mês", mediaV],
                ["Total", totalV],
                ["Mês com maior quantidade de Voluntários", mesMaiorV]
            ];
            var workbook = XLSX.utils.book_new(),
            worksheet = XLSX.utils.aoa_to_sheet(dataVoluntarios);
            workbook.SheetNames.push("First");
            workbook.Sheets["First"] = worksheet;
            XLSX.writeFile(workbook, "relatorio_voluntarios.xlsx");

        } else if (relatorioDoacao.selected) {
            let quantidadeDMes4 = 0;
            let quantidadeDMes5 = 0;
            let quantidadeDMes6 = 0;

            let allDoacoes;
            await fetch("/doacoes/getAllDoacoes", {
                method: "GET"
            })
                .then(response => response.json())
                .then(json => allDoacoes = json);

            for (let i = 0; i < allDoacoes.length; i++) {
                let data = new Date(allDoacoes[i].datahora)
                let doacaoMes = data.getMonth() + 1;

                switch (doacaoMes) {
                    case 4:
                        quantidadeDMes4 += allDoacoes[i].valor;
                        break;
                    case 5:
                        quantidadeDMes5 += allDoacoes[i].valor;
                        break;
                    case 6:
                        quantidadeDMes6 += allDoacoes[i].valor;
                        break;
                };
            };
            let totalD = (quantidadeDMes4 + quantidadeDMes5 + quantidadeDMes6)
            let mediaD = parseFloat(( totalD / 3).toFixed(2));

            let mesMaiorDQuantidade = Math.max(quantidadeDMes4, quantidadeDMes5, quantidadeDMes6);

            let mesMaiorD;
            switch (mesMaiorDQuantidade) {
                case quantidadeDMes4:
                    mesMaiorD = "Abril";
                    break;

                case quantidadeDMes5:
                    mesMaiorD = "Maio";
                    break;

                case quantidadeDMes6:
                    mesMaiorD = "Junho";
                    break;
            };

            console.log("Mês4:", quantidadeDMes4, "Mês5:", quantidadeDMes5, "Mês6:", quantidadeDMes6, "Média:", parseFloat(mediaD.toFixed(2)), "Mês com maior volume de doações:", mesMaiorD, "Valor:", mesMaiorDQuantidade);

            google.charts.load('current', { packages: ['corechart'] })
            google.charts.setOnLoadCallback(drawChartDoacoes)
            function drawChartDoacoes() {
                let data = new google.visualization.arrayToDataTable([
                    ["Mês", "Total de Doações R$"],
                    ["Abril", quantidadeDMes4],
                    ["Maio", quantidadeDMes5],
                    ["Junho", quantidadeDMes6],
                    ["Média de Doações/mês", mediaD],
                    ["Total", totalD]
                ]);
                let options = {
                    title: "Doações:",
                    height: 540,
                }

                let chart = new google.visualization.ColumnChart(document.getElementById("chart"))
                chart.draw(data, options);
            };

            var dataDoacoes = [ 
                ["Mês", "Total de Doações R$"],
                ["Abril", quantidadeDMes4],
                ["Maio", quantidadeDMes5],
                ["Junho", quantidadeDMes6],
                ["Média de Doações/mês", mediaD],
                ["Total", totalD],
                ["Mês com maior volume de Doações", mesMaiorD]
            ];
            var workbook = XLSX.utils.book_new(),
            worksheet = XLSX.utils.aoa_to_sheet(dataDoacoes);
            workbook.SheetNames.push("First");
            workbook.Sheets["First"] = worksheet;
            XLSX.writeFile(workbook, "relatorio_doacoes.xlsx");

        } else if (relatorioBazar.selected) {
            let quantidadeBMes4 = 0;
            let quantidadeBMes5 = 0;
            let quantidadeBMes6 = 0;
            let quantidadeBVMes4 = 0;
            let quantidadeBVMes5 = 0;
            let quantidadeBVMes6 = 0;
            let itensBVMes4 = 0;
            let itensBVMes5 = 0;
            let itensBVMes6 = 0;

            let allBazar;
            await fetch("/bazar/getAllBazar", {
                method: "GET"
            })
                .then(response => response.json())
                .then(json => allBazar = json);

            let allBazarVendido;
            await fetch("/bazar/getAllBazarVendido", {
                method: "GET"
            })
                .then(response => response.json())
                .then(json => allBazarVendido = json);

            for (let i = 0; i < allBazar.length; i++) {
                let data = new Date(allBazar[i].datahora)
                let bazarMes = data.getMonth() + 1;

                switch (bazarMes) {
                    case 4:
                        quantidadeBMes4++;
                        break;
                    case 5:
                        quantidadeBMes5++;
                        break;
                    case 6:
                        quantidadeBMes6++;
                        break;
                };
            };
            
            let totalB = (quantidadeBMes4 + quantidadeBMes5 + quantidadeBMes6)
            let mediaB = parseFloat((totalB / 3).toFixed(2));

            let mesMaiorBQuantidade = Math.max(quantidadeBMes4, quantidadeBMes5, quantidadeBMes6);

            let mesMaiorB;
            switch (mesMaiorBQuantidade) {
                case quantidadeBMes4:
                    mesMaiorB = 4;
                    break;

                case quantidadeBMes5:
                    mesMaiorB = 5;
                    break;

                case quantidadeBMes6:
                    mesMaiorB = 6;
                    break;
            };

            for (let i = 0; i < allBazarVendido.length; i++) {
                let data = new Date(allBazarVendido[i].datahora)
                let bazarVendidoMes = data.getMonth() + 1;

                switch (bazarVendidoMes) {
                    case 4:
                        itensBVMes4++;
                        quantidadeBVMes4 += allBazarVendido[i].valor;
                        break;
                    case 5:
                        itensBVMes5++;
                        quantidadeBVMes5 += allBazarVendido[i].valor;
                        break;
                    case 6:
                        itensBVMes6++;
                        quantidadeBVMes6 += allBazarVendido[i].valor;
                        break;
                };
            };
            let totalBV = (itensBVMes4 + itensBVMes5 + itensBVMes6);
            let mediaBV = parseFloat((totalBV / 3).toFixed(2));
            let mediaBVValor = parseFloat(((quantidadeBVMes4 + quantidadeBVMes5 + quantidadeBVMes6) / 3).toFixed(2));

            let mesMaiorBVQuantidade = Math.max(quantidadeBVMes4, quantidadeBVMes5, quantidadeBVMes6);

            let mesMaiorBV;
            switch (mesMaiorBVQuantidade) {
                case quantidadeBVMes4:
                    mesMaiorBV = "Abril";
                    break;

                case quantidadeBVMes5:
                    mesMaiorBV = "Maio";
                    break;

                case quantidadeBVMes6:
                    mesMaiorBV = "Junho";
                    break;
            };

            let itensRestantesB = (quantidadeBMes4 + quantidadeBMes5 + quantidadeBMes6) - (itensBVMes4 + itensBVMes5 + itensBVMes6)
            let totalBVValor = quantidadeBVMes4 + quantidadeBVMes5 + quantidadeBVMes6;

            console.log("Itens Bazar:", "Mês4:", quantidadeBMes4, "Mês5:", quantidadeBMes5, "Mês6:", quantidadeBMes6, "Média:", parseFloat(mediaB.toFixed(2)), "Mês com maior volume de cadastro:", mesMaiorB, "Quantidade:", mesMaiorBQuantidade);

            console.log("Itens Bazar Vendido:", "Mês4:", itensBVMes4, "Total4:", quantidadeBVMes4, "\nMês5:", itensBVMes5, "Total5:", quantidadeBVMes5, "\nMês6:", itensBVMes6, "Total6:", quantidadeBVMes6, "\nMédia:", parseFloat(mediaBV.toFixed(2)), "\nMês com maior volume de doações:", mesMaiorBV, "Valor:", mesMaiorBVQuantidade, "\nQuantidade de itens restantes do Bazar:", itensRestantesB);

            google.charts.load('current', { packages: ['corechart'] })
            google.charts.setOnLoadCallback(drawChartBazar)
            function drawChartBazar() {
                let data = new google.visualization.arrayToDataTable([
                    ["Mês", "Quantidade de Itens Doados", "Quantidade de Itens Vendidos"],
                    ["Abril", quantidadeBMes4, itensBVMes4],
                    ["Maio", quantidadeBMes5, itensBVMes5],
                    ["Junho", quantidadeBMes6, itensBVMes6],
                    ["Média", mediaB, mediaBV],
                    ["Total", totalB, totalBV],
                    ["Itens Restantes", itensRestantesB, 0]
                ]);
                let options = {
                    title: "Itens do Bazar:",
                    height: 540,
                }

                let chart = new google.visualization.ColumnChart(document.getElementById("chart"))
                chart.draw(data, options);
            };

            google.charts.load('current', { packages: ['corechart'] })
            google.charts.setOnLoadCallback(drawChartBazarVendido)
            function drawChartBazarVendido() {
                let data = new google.visualization.arrayToDataTable([
                    ["Mês", "Valor Arrecadado R$"],
                    ["Abril", quantidadeBVMes4],
                    ["Maio", quantidadeBVMes5],
                    ["Junho", quantidadeBVMes6],
                    ["Média", mediaBVValor],
                    ["Total", totalBVValor]
                ]);
                let options = {
                    title: "Valor Arrecadado no Bazar:",
                    height: 540,
                }

                let chart = new google.visualization.ColumnChart(document.getElementById("chart1"))
                chart.draw(data, options);

                var dataBazar = [ 
                    ["Mês", "Quantidade de Itens Doados", "Quantidade de Itens Vendidos", "Valor Arrecadado R$"],
                    ["Abril", quantidadeBMes4, itensBVMes4, quantidadeBVMes4],
                    ["Maio", quantidadeBMes5, itensBVMes5, quantidadeBVMes5],
                    ["Junho", quantidadeBMes6, itensBVMes6, quantidadeBVMes6],
                    ["Média", mediaB, mediaBV, mediaBVValor],
                    ["Total", totalB, totalBV, totalBVValor],
                    ["Itens Restantes", itensRestantesB]
                ];
                var workbook = XLSX.utils.book_new(),
                worksheet = XLSX.utils.aoa_to_sheet(dataBazar);
                workbook.SheetNames.push("First");
                workbook.Sheets["First"] = worksheet;
                XLSX.writeFile(workbook, "relatorio_bazar.xlsx");
            };
            relatorioBGerado++;

        } else if (relatorioMensagem.selected) {
            let quantidadeCMes4 = 0;
            let tipoCMes4V = 0;
            let tipoCMes4A = 0;
            let tipoCMes4I = 0;
            let quantidadeCMes5 = 0;
            let tipoCMes5V = 0;
            let tipoCMes5A = 0;
            let tipoCMes5I = 0;
            let quantidadeCMes6 = 0;
            let tipoCMes6V = 0;
            let tipoCMes6A = 0;
            let tipoCMes6I = 0;

            let allContato;
            await fetch("/contato/getAllContato", {
                method: "GET"
            })
                .then(response => response.json())
                .then(json => allContato = json);

            for (let i = 0; i < allContato.length; i++) {
                let data = new Date(allContato[i].datahora)
                let contatoMes = data.getMonth() + 1;
                let tipoContato = allContato[i].tipocontato;

                switch (contatoMes) {
                    case 4:
                        switch (tipoContato) {
                            case "Voluntário":
                                tipoCMes4V++;
                                break;

                            case "Apadrinhamento/Doações":
                                tipoCMes4A++;
                                break;

                            case "Informações":
                                tipoCMes4I++;
                                break;
                        }
                        quantidadeCMes4++;
                        break;
                    case 5:
                        switch (tipoContato) {
                            case "Voluntário":
                                tipoCMes5V++;
                                break;

                            case "Apadrinhamento/Doações":
                                tipoCMes5A++;
                                break;

                            case "Informações":
                                tipoCMes5I++;
                                break;
                        }
                        quantidadeCMes5++;
                        break;
                    case 6:
                        switch (tipoContato) {
                            case "Voluntário":
                                tipoCMes6V++;
                                break;

                            case "Apadrinhamento/Doações":
                                tipoCMes6A++;
                                break;

                            case "Informações":
                                tipoCMes6I++;
                                break;
                        }
                        quantidadeCMes6++;
                        break;
                };
            };

            let totalC = (quantidadeCMes4 + quantidadeCMes5 + quantidadeCMes6);
            let mediaC = parseFloat((totalC / 3).toFixed(2));
            let totalCV = (tipoCMes4V + tipoCMes5V + tipoCMes6V);
            let mediaCV = parseFloat((totalCV / 3).toFixed(2));
            let totalCA = (tipoCMes4A + tipoCMes5A + tipoCMes6A);
            let mediaCA = parseFloat((totalCA / 3).toFixed(2));
            let totalCI = (tipoCMes4I + tipoCMes5I + tipoCMes6I);
            let mediaCI = parseFloat((totalCI / 3).toFixed(2));

            console.log("Mensagens 4:", quantidadeCMes4, "Tipo V:", tipoCMes4V, "Tipo A:", tipoCMes4A, "Tipo I:", tipoCMes4I, "\n",
                "Mensagens 5:", quantidadeCMes5, "Tipo V:", tipoCMes5V, "Tipo A:", tipoCMes5A, "Tipo I:", tipoCMes5I, "\n",
                "Mensagens 6:", quantidadeCMes6, "Tipo V:", tipoCMes6V, "Tipo A:", tipoCMes6A, "Tipo I:", tipoCMes6I)

            google.charts.load('current', { packages: ['corechart'] })
            google.charts.setOnLoadCallback(drawChartMensagens)
            function drawChartMensagens() {
                let data = new google.visualization.arrayToDataTable([
                    ["Mês", "Total de Mensagens", "Tipo Voluntário", "Tipo Apadrinhamento/Doação", "Tipo Informações"],
                    ["Abril", quantidadeCMes4, tipoCMes4V, tipoCMes4A, tipoCMes4I],
                    ["Maio", quantidadeCMes5, tipoCMes5V, tipoCMes5A, tipoCMes5I],
                    ["Junho", quantidadeCMes6, tipoCMes6V, tipoCMes6A, tipoCMes6I],
                    ["Média", mediaC, mediaCV, mediaCA, mediaCI],
                    ["Total", totalC, totalCV, totalCA, totalCI]
                ]);
                let options = {
                    title: "Mensagens:",
                    height: 720,
                }

                let chart = new google.visualization.ColumnChart(document.getElementById("chart"))
                chart.draw(data, options);

                var dataContato = [ 
                    ["Mês", "Total de Mensagens", "Tipo Voluntário", "Tipo Apadrinhamento/Doação", "Tipo Informações"],
                    ["Abril", quantidadeCMes4, tipoCMes4V, tipoCMes4A, tipoCMes4I],
                    ["Maio", quantidadeCMes5, tipoCMes5V, tipoCMes5A, tipoCMes5I],
                    ["Junho", quantidadeCMes6, tipoCMes6V, tipoCMes6A, tipoCMes6I],
                    ["Média", mediaC, mediaCV, mediaCA, mediaCI],
                    ["Total", totalC, totalCV, totalCA, totalCI]
                ];
                var workbook = XLSX.utils.book_new(),
                worksheet = XLSX.utils.aoa_to_sheet(dataContato);
                workbook.SheetNames.push("First");
                workbook.Sheets["First"] = worksheet;
                XLSX.writeFile(workbook, "relatorio_contato.xlsx");

            };
        };
    });
});