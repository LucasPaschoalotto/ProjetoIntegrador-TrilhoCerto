var enviar = document.getElementById("formEnviar");

enviar.addEventListener("click", async() => {
    let tipoContato;
    var campoMotivoVoluntario = document.getElementById("radio-voluntario");
    var campoMotivoApadrinhamento = document.getElementById("radio-apadrinhamento");
    var campoMotivoInformacoes = document.getElementById("radio-informacoes");
    
    var nome = document.getElementById("nomesobrenome").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;
    var mensagem = document.getElementById("mensagem").value;

    //Verificar qual o tipo de contato
    if(campoMotivoVoluntario.checked){
        tipoContato = "Voluntário";
    } else if(campoMotivoApadrinhamento.checked){
        tipoContato = "Apadrinhamento/Doações";
    } else if(campoMotivoInformacoes.checked){
        tipoContato = "Informações";
    }

    //Verificar se os campos estão preenchidos
    if(!nome || !email || !telefone || !mensagem || isNaN(nome) === false || isNaN(email) === false || isNaN(telefone) === true) return;

    await fetch('/contato', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({nome: nome, email: email, telefone: telefone, mensagem: mensagem, tipoContato: tipoContato})
    });
    
    alert(`Mensagem de ${nome} enviada com sucesso!`);
})