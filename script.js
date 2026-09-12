// ==========================================
// RANKSYSTEM
// ==========================================


// ==========================================
// VARIÁVEIS
// ==========================================

let participantes = [];

let ordemAtual = "maior";


// ==========================================
// CARREGAR DADOS SALVOS
// ==========================================

const dadosSalvos =
    localStorage.getItem("rankSystem");


if (dadosSalvos) {

    try {

        participantes =
            JSON.parse(dadosSalvos);

    } catch (erro) {

        participantes = [];

    }

}


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const nomeInput =
    document.getElementById("nome");

const pontosInput =
    document.getElementById("pontos");

const botaoAdicionar =
    document.getElementById("adicionar");

const pesquisaInput =
    document.getElementById("pesquisa");

const ordenacao =
    document.getElementById("ordenacao");

const botaoExportar =
    document.getElementById("exportar");

const botaoLimpar =
    document.getElementById("limparRanking");

const botaoTema =
    document.getElementById("modoEscuro");

const ranking =
    document.getElementById("ranking");

const podio =
    document.getElementById("podio");

const grafico =
    document.getElementById("grafico");

const quantidade =
    document.getElementById("quantidade");

const maiorPontuacao =
    document.getElementById("maiorPontuacao");

const menorPontuacao =
    document.getElementById("menorPontuacao");

const media =
    document.getElementById("media");

const mensagem =
    document.getElementById("mensagem");


// ==========================================
// SALVAR
// ==========================================

function salvarRanking() {

    localStorage.setItem(
        "rankSystem",
        JSON.stringify(participantes)
    );

}


// ==========================================
// MENSAGEM
// ==========================================

function mostrarMensagem(texto) {

    mensagem.textContent = texto;

    mensagem.classList.add("mostrar");


    setTimeout(function () {

        mensagem.classList.remove("mostrar");

    }, 2500);

}


// ==========================================
// ORGANIZAR
// ==========================================

function organizarRanking() {

    if (ordemAtual === "maior") {

        participantes.sort(
            (a, b) => b.pontos - a.pontos
        );

    }


    if (ordemAtual === "menor") {

        participantes.sort(
            (a, b) => a.pontos - b.pontos
        );

    }


    if (ordemAtual === "az") {

        participantes.sort(
            (a, b) =>
                a.nome.localeCompare(b.nome)
        );

    }


    if (ordemAtual === "za") {

        participantes.sort(
            (a, b) =>
                b.nome.localeCompare(a.nome)
        );

    }

}


// ==========================================
// ESTATÍSTICAS
// ==========================================

function atualizarEstatisticas() {

    quantidade.textContent =
        participantes.length;


    if (participantes.length === 0) {

        maiorPontuacao.textContent = 0;

        menorPontuacao.textContent = 0;

        media.textContent = 0;

        return;

    }


    const pontuacoes =
        participantes.map(
            participante => participante.pontos
        );


    const maior =
        Math.max(...pontuacoes);


    const menor =
        Math.min(...pontuacoes);


    const total =
        pontuacoes.reduce(
            (soma, valor) => soma + valor,
            0
        );


    const mediaCalculada =
        total / participantes.length;


    maiorPontuacao.textContent =
        maior;


    menorPontuacao.textContent =
        menor;


    media.textContent =
        mediaCalculada.toFixed(2);

}


// ==========================================
// ADICIONAR PARTICIPANTE
// ==========================================

botaoAdicionar.addEventListener(
    "click",
    adicionarParticipante
);


function adicionarParticipante() {

    const nome =
        nomeInput.value.trim();


    const pontosTexto =
        pontosInput.value;


    const pontos =
        Number(pontosTexto);


    // Verificar nome

    if (nome === "") {

        mostrarMensagem(
            "⚠️ Digite o nome do participante."
        );

        nomeInput.focus();

        return;

    }


    // Verificar pontuação

    if (
        pontosTexto === "" ||
        isNaN(pontos) ||
        pontos < 0
    ) {

        mostrarMensagem(
            "⚠️ Digite uma pontuação válida."
        );

        pontosInput.focus();

        return;

    }


    // Verificar nome repetido

    const nomeExiste =
        participantes.some(
            participante =>
                participante.nome.toLowerCase() ===
                nome.toLowerCase()
        );


    if (nomeExiste) {

        mostrarMensagem(
            "⚠️ Esse nome já está no ranking."
        );

        return;

    }


    // Adicionar

    participantes.push({

        nome: nome,

        pontos: pontos

    });


    // Organizar

    organizarRanking();


    // Salvar

    salvarRanking();


    // Atualizar

    atualizarTudo();


    // Limpar campos

    nomeInput.value = "";

    pontosInput.value = "";

    nomeInput.focus();


    mostrarMensagem(
        "✓ Participante adicionado."
    );

}


// ==========================================
// PESQUISA
// ==========================================

pesquisaInput.addEventListener(
    "input",
    mostrarRanking
);


// ==========================================
// ORDENAR
// ==========================================

ordenacao.addEventListener(
    "change",
    function () {

        ordemAtual =
            ordenacao.value;

        organizarRanking();

        salvarRanking();

        atualizarTudo();

    }
);


// ==========================================
// MOSTRAR RANKING
// ==========================================

function mostrarRanking() {

    ranking.innerHTML = "";


    const pesquisa =
        pesquisaInput.value
            .toLowerCase()
            .trim();


    const filtrados =
        participantes.filter(
            participante =>
                participante.nome
                    .toLowerCase()
                    .includes(pesquisa)
        );


    if (filtrados.length === 0) {

        ranking.innerHTML = `

            <p class="vazio">

                ${
                    participantes.length === 0
                    ? "Nenhum participante cadastrado."
                    : "Nenhum participante encontrado."
                }

            </p>

        `;

        return;

    }


    filtrados.forEach(
        function (participante) {

            const indice =
                participantes.indexOf(
                    participante
                );


            const div =
                document.createElement("div");


            div.classList.add(
                "participante"
            );


            // Destaque

            if (indice === 0) {

                div.classList.add("primeiro");

            }

            else if (indice === 1) {

                div.classList.add("segundo");

            }

            else if (indice === 2) {

                div.classList.add("terceiro");

            }


            // Medalha

            let medalha = "";


            if (indice === 0) {

                medalha = "🥇";

            }

            else if (indice === 1) {

                medalha = "🥈";

            }

            else if (indice === 2) {

                medalha = "🥉";

            }


            div.innerHTML = `

                <span class="posicao">

                    ${medalha}
                    ${indice + 1}º

                </span>


                <span class="nome-participante">

                    ${escaparHTML(
                        participante.nome
                    )}

                </span>


                <span class="pontos">

                    ${participante.pontos} pts

                </span>


                <div class="acoes">

                    <button
                        class="editar"
                        onclick="editarParticipante(${indice})"
                        title="Editar">

                        ✏️

                    </button>


                    <button
                        class="excluir"
                        onclick="excluirParticipante(${indice})"
                        title="Excluir">

                        🗑️

                    </button>

                </div>

            `;


            ranking.appendChild(div);

        }
    );

}


// ==========================================
// PROTEGER TEXTO
// ==========================================

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}


// ==========================================
// PODIO
// ==========================================

function mostrarPodio() {

    podio.innerHTML = "";


    if (participantes.length === 0) {

        podio.innerHTML = `

            <p class="vazio">

                Adicione participantes para formar o pódio.

            </p>

        `;

        return;

    }


    const itens = [];


    // Segundo

    if (participantes[1]) {

        itens.push({

            participante: participantes[1],

            posicao: 2,

            medalha: "🥈",

            classe: "podio-segundo"

        });

    }


    // Primeiro

    if (participantes[0]) {

        itens.push({

            participante: participantes[0],

            posicao: 1,

            medalha: "🥇",

            classe: "podio-primeiro"

        });

    }


    // Terceiro

    if (participantes[2]) {

        itens.push({

            participante: participantes[2],

            posicao: 3,

            medalha: "🥉",

            classe: "podio-terceiro"

        });

    }


    itens.forEach(
        function (item) {

            const div =
                document.createElement("div");


            div.className =
                `podio-item ${item.classe}`;


            div.innerHTML = `

                <span class="medalha">

                    ${item.medalha}

                </span>


                <span class="nome-podio">

                    ${escaparHTML(
                        item.participante.nome
                    )}

                </span>


                <span>

                    ${item.posicao}º lugar

                </span>


                <span class="pontos-podio">

                    ${item.participante.pontos} pontos

                </span>

            `;


            podio.appendChild(div);

        }
    );

}


// ==========================================
// GRÁFICO
// ==========================================

function mostrarGrafico() {

    grafico.innerHTML = "";


    if (participantes.length === 0) {

        grafico.innerHTML = `

            <p class="vazio">

                O gráfico aparecerá quando houver participantes.

            </p>

        `;

        return;

    }


    const maior =
        Math.max(
            ...participantes.map(
                participante =>
                    participante.pontos
            )
        );


    participantes
        .slice(0, 10)
        .forEach(
            function (participante) {

                let porcentagem = 0;


                if (maior > 0) {

                    porcentagem =
                        (participante.pontos / maior) * 100;

                }


                const container =
                    document.createElement("div");


                container.className =
                    "barra-container";


                container.innerHTML = `

                    <span class="barra-nome">

                        ${escaparHTML(
                            participante.nome
                        )}

                    </span>


                    <div class="barra-fundo">

                        <div
                            class="barra"
                            style="width: ${porcentagem}%">
                        </div>

                    </div>


                    <span class="barra-pontos">

                        ${participante.pontos}

                    </span>

                `;


                grafico.appendChild(container);

            }
        );

}


// ==========================================
// EDITAR
// ==========================================

function editarParticipante(indice) {

    const participante =
        participantes[indice];


    const novaPontuacao =
        prompt(
            `Nova pontuação para ${participante.nome}:`,
            participante.pontos
        );


    if (novaPontuacao === null) {

        return;

    }


    const pontos =
        Number(novaPontuacao);


    if (
        novaPontuacao.trim() === "" ||
        isNaN(pontos) ||
        pontos < 0
    ) {

        mostrarMensagem(
            "⚠️ Pontuação inválida."
        );

        return;

    }


    participante.pontos =
        pontos;


    organizarRanking();

    salvarRanking();

    atualizarTudo();


    mostrarMensagem(
        "✓ Pontuação atualizada."
    );

}


// ==========================================
// EXCLUIR
// ==========================================

function excluirParticipante(indice) {

    const participante =
        participantes[indice];


    const confirmar =
        confirm(
            `Deseja excluir ${participante.nome}?`
        );


    if (!confirmar) {

        return;

    }


    participantes.splice(
        indice,
        1
    );


    salvarRanking();

    atualizarTudo();


    mostrarMensagem(
        "✓ Participante excluído."
    );

}


// ==========================================
// LIMPAR RANKING
// ==========================================

botaoLimpar.addEventListener(
    "click",
    function () {

        if (participantes.length === 0) {

            mostrarMensagem(
                "O ranking já está vazio."
            );

            return;

        }


        const confirmar =
            confirm(
                "Tem certeza que deseja apagar todos os participantes?"
            );


        if (!confirmar) {

            return;

        }


        participantes = [];


        localStorage.removeItem(
            "rankSystem"
        );


        pesquisaInput.value = "";


        atualizarTudo();


        mostrarMensagem(
            "✓ Ranking apagado."
        );

    }
);


// ==========================================
// EXPORTAR CSV
// ==========================================

botaoExportar.addEventListener(
    "click",
    exportarCSV
);


function exportarCSV() {

    if (participantes.length === 0) {

        mostrarMensagem(
            "⚠️ Não há participantes para exportar."
        );

        return;

    }


    let csv =
        "Posição,Nome,Pontuação\n";


    participantes.forEach(
        function (participante, indice) {

            csv +=
                `${indice + 1},"${participante.nome.replace(/"/g, '""')}",${participante.pontos}\n`;

        }
    );


    const blob =
        new Blob(
            ["\ufeff" + csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "ranking-ranksystem.csv";


    link.click();


    URL.revokeObjectURL(url);


    mostrarMensagem(
        "✓ Ranking exportado."
    );

}


// ==========================================
// MODO ESCURO
// ==========================================

const temaSalvo =
    localStorage.getItem(
        "temaRankSystem"
    );


if (temaSalvo === "escuro") {

    document.body.classList.add(
        "escuro"
    );

    botaoTema.textContent = "☀️";

}


botaoTema.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "escuro"
        );


        const escuro =
            document.body.classList.contains(
                "escuro"
            );


        if (escuro) {

            botaoTema.textContent =
                "☀️";

            localStorage.setItem(
                "temaRankSystem",
                "escuro"
            );

        }

        else {

            botaoTema.textContent =
                "🌙";

            localStorage.setItem(
                "temaRankSystem",
                "claro"
            );

        }

    }
);


// ==========================================
// ATUALIZAR TUDO
// ==========================================

function atualizarTudo() {

    atualizarEstatisticas();

    mostrarRanking();

    mostrarPodio();

    mostrarGrafico();

}


// ==========================================
// ENTER PARA ADICIONAR
// ==========================================

nomeInput.addEventListener(
    "keydown",
    function (evento) {

        if (evento.key === "Enter") {

            adicionarParticipante();

        }

    }
);


pontosInput.addEventListener(
    "keydown",
    function (evento) {

        if (evento.key === "Enter") {

            adicionarParticipante();

        }

    }
);


// ==========================================
// INICIAR
// ==========================================

ordemAtual =
    ordenacao.value;


organizarRanking();

atualizarTudo();