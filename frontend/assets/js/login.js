import service from "../services/user.js";

let btn = document.querySelector(".fa-eye");
let submit = document.querySelector("#submit");

btn.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

function entrar(event) {
  event.preventDefault(); // Impede o envio do formulário para evitar o recarregamento da página
  var email = document.querySelector("#email");
  var emailLabel = document.querySelector("#emailLabel");
  var senha = document.querySelector("#senha").value; // Obtém o valor da senha
  var senhaLabelEmail = document.querySelector("#senhaLabel");
  var msgErro = document.querySelector("#msgErro");
  var listaUsuario = [];
  var userValid = {
    id: null,
    nome: null,
    email: null,
    avatar: null,
    senha: null,
  };

  service.getUsers().then(function (data) {
    listaUsuario = data || [];
  
    listaUsuario.forEach((item) => {
      if (
        (email.value == item.email) &&
        senha == item.senha
      ) {
        // Verifica se o CPF/Email e senha coincidem
        userValid = {
          id: item.id,
          nome: item.nome,
          email: item.email,
          avatar: item.avatar,
          senha: item.senha,
        };
      }
    });
  
    if (
      userValid.nome &&
      (email.value == userValid.email) &&
      senha == userValid.senha
    ) {
      sessionStorage.setItem("userLogado", JSON.stringify(userValid));
      window.location.href = "../pages/comprador.html";
    } else {
      emailLabel.setAttribute("style", "color:red");
      email.setAttribute("style", "border-color:red");
      senhaLabelEmail.setAttribute("style", "color:red"); // Alterado para senhaLabelEmail
      msgErro.setAttribute("style", "display: block");
      msgErro.innerHTML = "Email ou senha incorreto.";
    }
  })
  .catch(function (err) {
    console.error("Erro ao buscar feedbacks:", err);
  });  
}

submit.addEventListener("click", entrar);
