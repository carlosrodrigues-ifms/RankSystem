// Lista dos participantes
let participantes = [];

let nome = document.getElementById("nome");
let pontos = document.getElementById("pontos");
let adicionar = document.getElementById("adicionar");

let ranking = document.getElementById("ranking");
let podio = document.getElementById("podio");
let grafico = document.getElementById("grafico");

let pesquisa = document.getElementById("pesquisa");
let ordenacao = document.getElementById("ordenacao");

let quantidade = document.getElementById("quantidade");
let maiorPontuacao = document.getElementById("maiorPontuacao");
let menorPontuacao = document.getElementById("menorPontuacao");
let media = document.getElementById("media");

let mensagem = document.getElementById("mensagem");


// Adicionar participante

adicionar.onclick = function() {

    let nomeDigitado = nome.value;
    let pontosDigitados = Number(pontos.value);

    // Verifica se o nome foi digitado
    if (nomeDigitado == "") {

        mostrarMensagem("Digite um nome.");

        return;
    }

    // Verifica a pontuação
    if (pontos.value == "" || pontosDigitados < 0) {

        mostrarMensagem("Digite uma pontuação válida.");

        return;
    }

    // Verifica se o participante já existe
    for (let i = 0; i < participantes.length; i++) {

        if (participantes[i].nome.toLowerCase() == nomeDigitado.toLowerCase()) {

            mostrarMensagem("Esse participante já existe.");

            return;
        }
    }

    let participante = {
        nome: nomeDigitado,
        pontos: pontosDigitados
    };

    // Adiciona na lista
    participantes.push(participante);

    nome.value = "";
    pontos.value = "";

    organizar();
    atualizar();

    mostrarMensagem("Participante adicionado.");
};


// Organizar ranking

function organizar() {

    let tipo = ordenacao.value;

    // Maior pontuação primeiro
    if (tipo == "maior") {

        participantes.sort(function(a, b) {

            return b.pontos - a.pontos;

        });
    }

    // Menor pontuação primeiro
    if (tipo == "menor") {

        participantes.sort(function(a, b) {

            return a.pontos - b.pontos;

        });
    }

    // Ordem alfabética
    if (tipo == "az") {

        participantes.sort(function(a, b) {

            return a.nome.localeCompare(b.nome);

        });
    }

    // Ordem alfabética inversa
    if (tipo == "za") {

        participantes.sort(function(a, b) {

            return b.nome.localeCompare(a.nome);

        });
    }
}


// Atualiza o sistema

function atualizar() {

    organizar();

    mostrarRanking();

    mostrarPodio();

    mostrarEstatisticas();

    mostrarGrafico();
}


// Mostrar ranking

function mostrarRanking() {

    ranking.innerHTML = "";

    let textoPesquisa = pesquisa.value.toLowerCase();

    let encontrados = 0;

    for (let i = 0; i < participantes.length; i++) {

        let participante = participantes[i];

        if (participante.nome.toLowerCase().includes(textoPesquisa)) {

            encontrados++;

            let div = document.createElement("div");

            div.className = "participante";

            // Destaca os três primeiros
            if (i == 0) {
                div.classList.add("primeiro");
            }

            if (i == 1) {
                div.classList.add("segundo");
            }

            if (i == 2) {
                div.classList.add("terceiro");
            }

            let medalha = "";

            if (i == 0) {
                medalha = "🥇";
            }

            if (i == 1) {
                medalha = "🥈";
            }

            if (i == 2) {
                medalha = "🥉";
            }

            div.innerHTML = `
                <span class="posicao">${medalha} ${i + 1}º</span>

                <span class="nome-participante">
                    ${participante.nome}
                </span>

                <span class="pontos">
                    ${participante.pontos} pts
                </span>

                <div class="acoes">

                    <button class="editar" onclick="editar(${i})">
                        ✏️
                    </button>

                    <button class="excluir" onclick="excluir(${i})">
                        🗑️
                    </button>

                </div>
            `;

            ranking.appendChild(div);
        }
    }

    if (encontrados == 0) {

        ranking.innerHTML = `
            <p class="vazio">
                Nenhum participante encontrado.
            </p>
        `;
    }
}


// Mostrar pódio

function mostrarPodio() {

    podio.innerHTML = "";

    if (participantes.length == 0) {

        podio.innerHTML = `
            <p class="vazio">
                Adicione participantes para formar o pódio.
            </p>
        `;

        return;
    }

    let ordem = [];

    // Segundo lugar
    if (participantes[1]) {

        ordem.push({

            pessoa: participantes[1],
            medalha: "🥈",
            classe: "podio-segundo",
            lugar: "2º lugar"

        });
    }

    // Primeiro lugar
    if (participantes[0]) {

        ordem.push({

            pessoa: participantes[0],
            medalha: "🥇",
            classe: "podio-primeiro",
            lugar: "1º lugar"

        });
    }

    // Terceiro lugar
    if (participantes[2]) {

        ordem.push({

            pessoa: participantes[2],
            medalha: "🥉",
            classe: "podio-terceiro",
            lugar: "3º lugar"

        });
    }

    for (let i = 0; i < ordem.length; i++) {

        let item = ordem[i];

        let div = document.createElement("div");

        div.className = "podio-item " + item.classe;

        div.innerHTML = `
            <span class="medalha">
                ${item.medalha}
            </span>

            <span class="nome-podio">
                ${item.pessoa.nome}
            </span>

            <span>
                ${item.lugar}
            </span>

            <span class="pontos-podio">
                ${item.pessoa.pontos} pontos
            </span>
        `;

        podio.appendChild(div);
    }
}


// Mostrar estatísticas

function mostrarEstatisticas() {

    quantidade.innerText = participantes.length;

    if (participantes.length == 0) {

        maiorPontuacao.innerText = 0;
        menorPontuacao.innerText = 0;
        media.innerText = 0;

        return;
    }

    let maior = participantes[0].pontos;
    let menor = participantes[0].pontos;
    let total = 0;

    for (let i = 0; i < participantes.length; i++) {

        let valor = participantes[i].pontos;

        total = total + valor;

        if (valor > maior) {
            maior = valor;
        }

        if (valor < menor) {
            menor = valor;
        }
    }

    let mediaCalculada = total / participantes.length;

    maiorPontuacao.innerText = maior;

    menorPontuacao.innerText = menor;

    media.innerText = mediaCalculada.toFixed(2);
}


// Editar participante

function editar(indice) {

    let novoValor = prompt(
        "Digite a nova pontuação:",
        participantes[indice].pontos
    );

    if (novoValor == null) {
        return;
    }

    novoValor = Number(novoValor);

    if (novoValor < 0 || isNaN(novoValor)) {

        mostrarMensagem("Pontuação inválida.");

        return;
    }

    participantes[indice].pontos = novoValor;

    atualizar();

    mostrarMensagem("Pontuação alterada.");
}


// Excluir participante

function excluir(indice) {

    let resposta = confirm(
        "Deseja excluir " + participantes[indice].nome + "?"
    );

    if (resposta == true) {

        participantes.splice(indice, 1);

        atualizar();

        mostrarMensagem("Participante excluído.");
    }
}


// Pesquisar participante

pesquisa.oninput = function() {

    mostrarRanking();
};


// Mudar a ordem do ranking

ordenacao.onchange = function() {

    organizar();

    atualizar();
};


// Limpar ranking

document.getElementById("limparRanking").onclick = function() {

    if (participantes.length == 0) {

        mostrarMensagem("O ranking já está vazio.");

        return;
    }

    let resposta = confirm(
        "Deseja apagar todos os participantes?"
    );

    if (resposta == true) {

        participantes = [];

        atualizar();

        mostrarMensagem("Ranking apagado.");
    }
};


// Modo escuro

document.getElementById("modoEscuro").onclick = function() {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {

        document.getElementById("modoEscuro").innerText = "☀️";

    } else {

        document.getElementById("modoEscuro").innerText = "🌙";
    }
};


// Mostrar mensagem

function mostrarMensagem(texto) {

    mensagem.innerText = texto;

    mensagem.classList.add("mostrar");

    setTimeout(function() {

        mensagem.classList.remove("mostrar");

    }, 2000);
}


// Mostrar gráfico

function mostrarGrafico() {

    grafico.innerHTML = "";

    if (participantes.length == 0) {

        grafico.innerHTML = `
            <p class="vazio">
                O gráfico aparecerá quando houver participantes.
            </p>
        `;

        return;
    }

    let maior = participantes[0].pontos;

    // Descobre a maior pontuação
    for (let i = 0; i < participantes.length; i++) {

        if (participantes[i].pontos > maior) {

            maior = participantes[i].pontos;

        }
    }

    let limite = participantes.length;

    // Mostra no máximo 10 participantes
    if (limite > 10) {

        limite = 10;

    }

    for (let i = 0; i < limite; i++) {

        let pessoa = participantes[i];

        let porcentagem = 0;

        if (maior > 0) {

            porcentagem = (pessoa.pontos / maior) * 100;

        }

        let div = document.createElement("div");

        div.className = "barra-container";

        div.innerHTML = `
            <span class="barra-nome">
                ${pessoa.nome}
            </span>

            <div class="barra-fundo">

                <div
                    class="barra"
                    style="width: ${porcentagem}%">
                </div>

            </div>

            <span class="barra-pontos">
                ${pessoa.pontos}
            </span>
        `;

        grafico.appendChild(div);
    }
}


// Começa o sistema

atualizar();