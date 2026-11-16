// ===== Dados do jogo =====
const palavras = [
    "javascript",
    "html",
    "css",
    "internet",
    "navegador",
    "programacao",
    "computador",
    "teclado",
    "variavel",
    "funcao"
];

// ===== Estado do jogo =====
let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;

// ===== Elementos da página (DOM) =====
const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// ===== Funções =====
function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao;
}

function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);
    palavraSecreta = palavras[indice];
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];

    atualizarPalavra();
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "";
    mensagem.textContent = "Bem-vindo ao jogo!";
    inputLetra.value = "";
    inputLetra.disabled = false;
    botaoTentar.disabled = false;
    inputLetra.focus();
}

function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }
    return true;
}

function encerrarPartida() {
    inputLetra.disabled = true;
    botaoTentar.disabled = true;
}

function verificarLetra() {
    const letra = inputLetra.value.toLowerCase();

    if (letra === "") {
        mensagem.textContent = "Digite uma letra.";
        return;
    }

    if (letra < "a" || letra > "z") {
        mensagem.textContent = "Use apenas letras de A a Z.";
        inputLetra.value = "";
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Letra já utilizada.";
        inputLetra.value = "";
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Você acertou!";
    } else {
        tentativas--;
        mensagem.textContent = "Você errou!";
    }

    atualizarPalavra();
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");
    inputLetra.value = "";

    if (venceu()) {
        mensagem.textContent = "Parabéns! Você venceu!";
        encerrarPartida();
    } else if (tentativas === 0) {
        mensagem.textContent = "Você perdeu! A palavra era " + palavraSecreta;
        encerrarPartida();
    }
}

// ===== Eventos =====
botaoTentar.addEventListener("click", verificarLetra);
botaoReiniciar.addEventListener("click", iniciarJogo);

// Desafio extra: enviar a letra com a tecla Enter
inputLetra.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        verificarLetra();
    }
});

// ===== Início =====
iniciarJogo();
