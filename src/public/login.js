var buttonLogin = document.getElementById("logarUsuario");

buttonLogin.addEventListener("click", async(form) =>{
    form.preventDefault();

    var user = document.getElementById("setUsuario").value;
    var senha = document.getElementById("setSenha").value;

    if (user === "admin" && senha === "admin"){
        location.replace("http://localhost:8080/gestao.html");
    };
});