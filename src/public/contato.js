var enviar = document.getElementById("formEnviar");

enviar.addEventListener("click", async() => {
    var campoMotivoVoluntario = document.getElementById("radio-voluntario");
    var campoMotivoApadrinhamento = document.getElementById("radio-apadrinhamento");
    var campoMotivoInformacoes = document.getElementById("radio-informacoes");
    
    var nome = document.getElementById("nomesobrenome").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;
    var mensagem = document.getElementById("mensagem").value;

    console.log(email)
    console.log(telefone)
    console.log(mensagem)

    if(campoMotivoVoluntario.checked){
        console.log("motivoVoluntario");
    } else if(campoMotivoApadrinhamento.checked){
        console.log("motivoApadrinhamento");
    } else if(campoMotivoInformacoes.checked){
        console.log("motivoinfos")
    }

    await fetch('/mensagem', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({nome: nome, email: email, telefone: telefone, mensagem: mensagem, tipoContato: tipoContato})
    });
    
    alert(`Mensagem de ${nome} enviada com sucesso!`);
})