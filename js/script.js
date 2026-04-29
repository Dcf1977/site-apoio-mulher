// Função de saída rápida
function saidaRapida() {
    window.location.replace("https://www.google.com.br");
}

document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        saidaRapida();
    }
});


// Função chamada pelo botão "Responder" da página principal
function respQuestionario() {
    window.open("questionario.html", "_blank");
}



// Lógica do QUESTIONÁRIO (executada dentro do questionario.html)
document.addEventListener("DOMContentLoaded", function () {
    const btnEnviar = document.getElementById("btnEnviar");
    const msgErro = document.getElementById("mensagemErro");
    if (!btnEnviar) return;

    btnEnviar.addEventListener("click", function () {

        const todosRadios = document.querySelectorAll('input[type=radio]');
        const respostas = document.querySelectorAll('input[type=radio]:checked');

        const nomes = new Set();
        todosRadios.forEach(r => nomes.add(r.name)); // Coleta nomes únicos dos grupos de perguntas

        // Limpar erros antigos
        document.querySelectorAll('.erro-pergunta').forEach(el => {
            el.classList.remove('erro-pergunta');
        });

        msgErro.classList.remove('ativa'); 
        msgErro.textContent = "";

        let perguntasNaoRespondidas = [];

        // Verificar perguntas não respondidas
        nomes.forEach(nome => {
            const marcado = document.querySelector(`input[name="${nome}"]:checked`);
            if (!marcado) {
                perguntasNaoRespondidas.push(nome); // Adiciona nome à lista de perguntas não respondidas

                const grupo = document.querySelector(`input[name="${nome}"]`).closest('.pergunta'); // Armazena o container da pergunta (div)

                if (grupo) {
                    grupo.classList.add('erro-pergunta'); // Adiciona classe de erro ao grupo
                }
            }
        });

        // Validação
        if (perguntasNaoRespondidas.length > 0) {

            msgErro.textContent = "⚠️ Responda todas as perguntas destacadas antes de continuar.";
            msgErro.classList.add('ativa');

            const primeira = document.querySelector('.erro-pergunta');
            if (primeira) {
                primeira.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            return;
        }

        let temSim = false;

        respostas.forEach(radio => {
            if (radio.value === "sim") temSim = true;
        });

        const resultadoDiv = document.getElementById("resultado");
        if (temSim) {
            resultadoDiv.textContent = "⚠️ Atenção: Identificamos pelo menos uma resposta SIM. Seu relacionamento tem sinais de abusividade e é recomendado que você procure orientação especializada.";
        } else {
            resultadoDiv.textContent = "Nenhuma resposta SIM foi identificada. Então seu relacionamento está saudável.";
        }

        // Aplica efeito de fade-in na mensagem
        resultadoDiv.style.opacity = 0;
        resultadoDiv.style.transition = "opacity 1s ease";
        setTimeout(() => {
            resultadoDiv.style.opacity = 1;
        }, 50);

        // Exibe barra de progresso contínua
        const progressContainer = document.querySelector(".progress");
        const progressBar = document.getElementById("progressBar");
        progressContainer.style.display = "block";

        // Define largura inicial e aplica transição suave até 0%
        progressBar.style.width = "100%";
        progressBar.style.transition = "width 10s linear";
        setTimeout(() => {
            progressBar.style.width = "0%";
        }, 100); // pequeno delay para garantir aplicação da transição

        // Fecha a aba após 10 segundos
        setTimeout(() => {
            window.close();
        }, 10000);
    });


});



// Lógica para abrir a página das delegacias
document.addEventListener("DOMContentLoaded", () => {
    // Busca o link específico pelo texto
    const links = document.getElementsByTagName("a");
    let linkDelegacia = null;

    for (let a of links) {
        if (a.textContent.includes("Clique aqui")) {
            linkDelegacia = a;
            break;
        }
    }

    if (linkDelegacia) {
        linkDelegacia.addEventListener("click", (e) => {
            // e.preventDefault(); // Opcional com javascript:void(0), mas boa prática
            abrirPaginaDelegacias();
        });
    }
});


function abrirPaginaDelegacias() {
    const novaJanela = window.open("", "_blank");
    
    if (!novaJanela) {
        alert("Por favor, permita pop-ups para ver as informações.");
        return;
    }

    const iconWhats = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#25D366" viewBox="0 0 16 16" style="vertical-align: middle; margin-right: 8px;"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.104-1.076a7.863 7.863 0 0 0 3.89 1.017h.005c4.368 0 7.926-3.558 7.93-7.93a7.897 7.897 0 0 0-2.33-5.594l-.002-.005zm-5.607 11.334h-.005a6.55 6.55 0 0 1-3.333-.913l-.24-.142-2.471.648.66-2.408-.156-.248a6.539 6.539 0 0 1-1.003-3.504c0-3.612 2.941-6.553 6.555-6.553a6.51 6.51 0 0 1 4.634 1.921 6.52 6.52 0 0 1 1.92 4.63c-.002 3.613-2.943 6.555-6.556 6.555zm3.505-4.805c-.192-.096-1.135-.56-1.312-.624-.176-.064-.305-.096-.433.096-.128.192-.496.624-.608.752-.112.128-.224.144-.416.048-.192-.096-.812-.3-1.547-.955-.572-.51-1.002-1.14-1.114-1.332-.112-.192-.012-.296.084-.391.086-.086.192-.224.288-.336.096-.112.128-.192.192-.32.064-.128.032-.24-.016-.336-.048-.096-.433-1.04-.592-1.424-.156-.376-.328-.325-.456-.331-.117-.005-.252-.005-.388-.005-.136 0-.356.051-.543.256-.187.205-.715.698-.715 1.702 0 1.004.73 1.976.832 2.112.102.144 1.438 2.196 3.484 3.08.488.21 0.869.335 1.166.429.49.156.935.134 1.287.081.393-.059 1.135-.464 1.296-.912.16-.448.16-.832.112-.912-.048-.08-.176-.128-.368-.224z"/></svg>`;

    const delegacias = [
        { nome: "Casa da Mulher Brasileira - Fortaleza", tel: "(85) 3108-2996", end: "Rua Tabuleiro do norte, s/n - Couto Fernandes", temWhats: false},
        { nome: "DDM Pacatuba", tel: "(11) 98161-7982", end: "Av. Marginal Nordeste, s/n - Conj. Jereissati 3", temWhats: true },
        { nome: "DDM Caucaia", tel: "(85) 3101-7927", end: "Rua Porcina Leite, 113 - Parque Soledade", temWhats: false },
        { nome: "DDM Maracanaú", tel: "(85) 99757-3132", end: "Av. Padre José Holanda do Vale, 1691 - Piratininga", temWhats: true },
        { nome: "DDM Crato", tel: "(88) 3102-1250", end: "Rua Dom Quintino, 704 - Centro", temWhats: false },
        { nome: "Casa da Mulher Cearense - Juazeiro do Norte", tel: "(85) 98128-8071", end: "Av. Padre Cicero, 4501 - São José", temWhats: false },
        { nome: "DDM Iguatu", tel: "(88) 3581-9454", end: "Av. Monsenhor Coelho, s/n - São Sebastião", temWhats: false },
        { nome: "DDM Icó", tel: "(85) 3561-5551", end: "Rua Padre José Alves de Macedo, 963 - Cidade Nova", temWhats: false },
        { nome: "Casa da Mulher Cearense - Sobral", tel: "(85) 98959-7453", end: "Rua Mons. Aloisio Pinho, s/n - Gerardo Cristino Menezes", temWhats: true },
        { nome: "Casa da Mulher Cearense - Quixadá", tel: "(85) 98959-2422", end: "Rua Luiz Barbosa da Silva, s/n - Planalto Renascer", temWhats: false },
    ];

    let cardsHtml = "";
    delegacias.forEach(d => {
        const icone = d.temWhats ? iconWhats : "📞 ";
        const textoBotao = d.temWhats ? "WhatsApp / Ligar" : "Ligar";
        const linkTel = d.tel.replace(/\D/g, "");

        cardsHtml += `
            <div class="card" style="display: flex; flex-direction: column; margin-bottom: 20px; padding: 20px; border-top: 4px solid #e85d75; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border-radius: 10px; background: white; height: 100%; /*Garante que todos os cards na mesma linha tenham a mesma altura */">
                <h3 style="color: #1e1e2f; margin-bottom: 10px;">${d.nome}</h3>
                <p style="color: #555; margin-bottom: 15px;">📍 ${d.end}</p>
                <a href="tel:${linkTel}" style="margin-top: auto; display: flex; align-items: center; justify-content: center; gap: 8px; background: #1e1e2f; color: white; padding: 12px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                    ${icone} ${textoBotao}: ${d.tel}
                </a>
            </div>
        `;
    });

    // Construção do documento final
    const htmlFinal = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Delegacias Especializadas</title>
            <link rel="stylesheet" href="css/style.css">
        </head>
        <body style="font-family: 'Inter', sans-serif; background: #f7f7f7; padding: 20px;">
            <div style="max-width: 800px; margin: 0 auto;">
                <h1 style="text-align: center; color: #e85d75;">Unidades de Atendimento</h1>
                <p style="text-align: center; color: #555; margin-bottom: 30px;">Delegacias de Defesa da Mulher no Ceará</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                    ${cardsHtml}
                </div>
                <div style="text-align: center; margin-top: 40px;">
                    <button onclick="window.close()" style="background: #e85d75; color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: 600;">Fechar e Voltar</button>
                </div>
            </div>
        </body>
        </html>
    `;

    novaJanela.document.write(htmlFinal);
    novaJanela.document.close();
}