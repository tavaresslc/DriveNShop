import service from '../services/user.js';

var btn = document.querySelector('#verSenha')
var submit = document.querySelector('#submit')
const userLogado = JSON.parse(sessionStorage.getItem('userLogado'));

// INICIO DO ARMAZENAMENTO DAS VARIAVEIS

var nome = document.querySelector('#nome')
var labelNome = document.querySelector('#labelNome')
var validNome = false

var email = document.querySelector('#email')
var labelEmail = document.querySelector('#labelEmail')
var validEmail = false

var senha = document.querySelector('#senha')
var labelSenha = document.querySelector('#labelSenha')
var validSenha = false

// MENSAGENS PARA MOSTRAR SE O CADASTRO FOI FEITO OU NÃO 
var msgErro = document.querySelector('#msgErro') // MENSAGEM DE ERRO
var msgSucesso = document.querySelector('#msgSucesso') // MENSAGEM DE SUCESSO

window.addEventListener('DOMContentLoaded', () => {
    if(userLogado) {
        nome.placeholder = userLogado.nome;
        email.placeholder = userLogado.email;
    } else {
        window.location.href = 'login.html'
    }
});


// EVENTOS NOS CAMPOS DE MENSAGEM
nome.addEventListener('keyup', () => {
    if(nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = '<strong>Nome *Insira no mínimo 3 caracteres</strong>'
        validNome = false
    } else {
        labelNome.setAttribute('style', 'color: #272262')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: #272262')
        validNome = true
    }
})

email.addEventListener('keyup', () => {
    if(email.value.length <= 4) {
        labelEmail.setAttribute('style', 'color: red')
        labelEmail.innerHTML = '<strong>Email *Insira no mínimo 5 caracteres</strong>'
        email.setAttribute('style', 'border-color: red')
        validEmail = false
    } else {
        labelEmail.setAttribute('style', 'color: #272262')
        labelEmail.innerHTML = 'Email'
        email.setAttribute('style', 'border-color: #272262')
        validEmail = true
    }
})

senha.addEventListener('keyup', () => {
    if(senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = '<strong>Senha *Insira no mínimo 6 caracteres</strong>'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    } else {
        labelSenha.setAttribute('style', 'color: #272262')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: #272262')
        validSenha = true
    }
});

// FUNCAO DO BOTAO CADASTRAR
function cadastrar(){
    if(validNome && validEmail && validSenha) {
        const user = {
            nome: nome.value,
            email: email.value,
            avatar: 'https://avatar.iran.liara.run/public',
            senha: senha.value
        }

        service.updateUser(user, userLogado.id);

        msgSucesso.setAttribute('style', 'display: block')
        msgSucesso.innerHTML = '<strong>Atualizando usuário...</strong>'
        msgErro.setAttribute('style', 'display: none')
        msgErro.innerHTML = ''
        sessionStorage.clear();

        setTimeout(() => {
            window.location.href = 'login.html'
        }, 2000)

    } else {
        msgErro.setAttribute('style', 'display: block')
        msgErro.innerHTML = '<strong>Preencha todos os campos corretamente!</strong>'
        msgSucesso.setAttribute('style', 'display: none')
        msgSucesso.innerHTML = ''
    }
}

// ACÃO PARA ESCONDER E APARECER SENHA
btn.addEventListener('click', () => {

    let inputSenha = document.querySelector('#senha')

    if(inputSenha.getAttribute('type') == 'password'){
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

submit.addEventListener('click', () => {
    cadastrar()
})

/* 
---- COMANDO PARA PEGAR A LISTA ORDENADA DE TODOS OS USUARIOS E SEUS DADOS NO CONSOLE ----
    var listaUsuario = JSON.parse(localStorage.getItem('listaUsuario') || '[]');
    console.log(listaUsuario);
---- COMANDO PARA PEGAR A LISTA ORDENADA DE TODOS OS USUARIOS E SEUS DADOS NO CONSOLE ----
*/