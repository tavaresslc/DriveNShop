import { Categorias } from "../enum/categorias.js";
import { Estados } from "../enum/estados.js";
import { Marcas } from "../enum/marcas.js";
import { Modelos } from "../enum/modelos.js";
import { Mascaras } from "../enum/mascaras.js";
import service from "../services/veiculo.js";

const location = document.getElementById("location");
const brand = document.getElementById("brand");
const category = document.getElementById("category");
const model = document.getElementById("model");

for (let key in Estados) {
  const option = document.createElement("option");
  option.value = key;
  option.text = Estados[key];
  location.appendChild(option);
}

for (let key in Marcas) {
  const option = document.createElement("option");
  option.value = key;
  option.text = Marcas[key];
  brand.appendChild(option);
}

for (let key in Categorias) {
    const option = document.createElement("option");
    option.value = key;
    option.text = Categorias[key];
    category.appendChild(option);
}

for (let key in Modelos) {
    const option = document.createElement("option");
    option.value = key;
    option.text = Modelos[key];
    model.appendChild(option);
}

function mascararInput(input, mask) {
    let value = input.value.replace(/\D/g, '');
    let i = 0;

    if (value === '') {
        input.value = '';
        return;
    }

    while (value[0] === '0') {
        value = value.substr(1);
    }

    input.value = Mascaras[mask].replace(/#/g, function() {
        return i < value.length ? value.charAt(i++) : '';
    });
}

window.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll("input[mask]");
    const condition = document.getElementById("condition");
    const kms = document.getElementById("kms");

    inputs.forEach(function(input) {
        input.addEventListener("blur", function() {
            var mask = input.getAttribute("mask");
            mascararInput(input, mask);
        });
    });

    condition.addEventListener("change", function() {
        if (condition.value === '0') {
            kms.value = '0 KM';
            kms.disabled = true;
        } else {
            kms.value = '';
            kms.disabled = false;
        }
    });
})

const form = document.getElementById("put_form");
const user = JSON.parse(sessionStorage.getItem("userLogado"));
const submit = document.getElementById("put_btn");


form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = JSON.parse(sessionStorage.getItem("idVeiculo"));

    const category = document.getElementById("category");
    const type = document.getElementById("type");
    const condition = document.getElementById("condition");
    const brand = document.getElementById("brand");
    const model = document.getElementById("model");
    const year = document.getElementById("year");
    const kms = document.getElementById("kms");
    const description = document.getElementById("desc");
    const price = document.getElementById("price");
    const location = document.getElementById("location");

    const anuncio = {
        ano: year.value,
        categoria: category.value,
        condicao: condition.value,
        descricao: description.value,
        localizacao: location.value,
        marca: brand.value,
        modelo: model.value,
        preco: price.value.replace(/\D/g, ''),  
        quilometragem: kms.value.replace(/\D/g, '') === '' ? '0' : kms.value.replace(/\D/g, ''),
        tipo: type.value,
        id_usuario: user.id
    };

    console.log(anuncio);
    service.updateVeiculo(anuncio, id);
    submit.disabled = true;
    submit.textContent = "Salvando...";
    sessionStorage.removeItem("idVeiculo");

    setTimeout(function() {
        window.location.href = "../pages/meus-anuncios.html";
    }, 3000);
});