numPlayers = sessionStorage.getItem('numPlayers');
let ordem = 1;
if (numPlayers==null){
    numPlayers=4;
}
for (let i = 1; i <= numPlayers; i++) {
    const playerContainer = document.createElement('div');
    playerContainer.classList.add('playerContainer');
    playerContainer.innerHTML = `
        <h2>Jogador ${i}</h2>
        <div class="diceResult">Resultado do dado:</div>
        <div class="totalresult">Pontuação:</div>
        <button id="playerButton${i}" onclick="rollDice(${i})">Rolar Dado</button>
    `;
    document.getElementById('players').appendChild(playerContainer);
}


function updateButtons(playerIndex) {
    // Desabilitar todos os botões
    const buttons = document.querySelectorAll('.playerButton');
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Habilitar o botão do jogador atual
    const currentPlayerButton = document.getElementById(`playerButton${playerIndex}`);
    if (currentPlayerButton) {
        currentPlayerButton.disabled = false;
        currentPlayerButton.innerText = 'Espere'; // Alterar o texto do botão para 'Espere'
    }

    // Habilitar o botão do próximo jogador
    const nextPlayerIndex = playerIndex % numPlayers + 1;
    const nextPlayerButton = document.getElementById(`playerButton${nextPlayerIndex}`);
    if (nextPlayerButton) {
        nextPlayerButton.disabled = false;
        nextPlayerButton.innerText = 'Rolar Dado'; // Alterar o texto do botão de volta para 'Rolar Dado'
    }
}





let players = [];
for (let i = 1; i <= numPlayers; i++) {
   
    players[i] = {
        totalPoints: 0,
        dezenas: "",
        centenas: "",
        iswon: false
    };
}


function rollDice(playerIndex) {
    const player = players[playerIndex];
    if (ordem == playerIndex) {
        if (!player.iswon) {
            // Gerar um número aleatório de 1 a 6
            const diceRoll = Math.floor(Math.random() * 6) + 1;

            // Selecione o elemento de imagem
            const imgElement = document.getElementById('diceImage');
           
            // Obter o contêiner do jogador correspondente
            const playerContainer = document.querySelectorAll('.playerContainer')[playerIndex - 1];

            // Atualizar o resultado do dado na página
            const diceResult = playerContainer.querySelector('.diceResult');
            diceResult.innerText = `Resultado do dado: ${diceRoll}`;

            // Adicionar o valor do dado aos pontos totais
            player.totalPoints += diceRoll;

            // Verificar se o total de pontos é maior ou igual a 10
            if (player.totalPoints >= 10) {
                // Substituir os pontos por símbolos °
                player.totalPoints -= 10;
                player.dezenas += " ° ";
                if (player.dezenas === " °  °  °  °  °  °  °  °  °  ° ") {
                    player.centenas += " Δ ";
                    player.dezenas = "";
                }
                if (player.centenas === " Δ ") {
                    player.iswon = true;
                    player.totalPoints = "";
                    player.dezenas = "";
                    diceResult.innerText = "Fim do jogo, chegou a 100";
                }
           
            }

            // Exibir pontuação atualizada
            const totalresult = playerContainer.querySelector('.totalresult');
            totalresult.innerText = `Pontuação: ${player.centenas}${player.dezenas}${player.totalPoints}`;
            updateButtons(playerIndex);
        }

        // Atualiza a ordem para o próximo jogador ativo
        ordem++;
        if (ordem > numPlayers) {
            ordem = 1;
        }
    }
}

function resetAll() {
    ordem = 1; // Reseta a ordem dos jogadores
    for (let i = 1; i <= numPlayers; i++) {
        resetPlayer(i);
    }
}

function resetPlayer(playerIndex) {
    const player = players[playerIndex];
    player.totalPoints = 0;
    player.dezenas = "";
    player.centenas = "";
    player.iswon = false;

    const playerContainer = document.querySelectorAll('.playerContainer')[playerIndex - 1];
    const diceResult = playerContainer.querySelector('.diceResult');
    diceResult.innerText = "Resultado do dado:";

    const totalresult = playerContainer.querySelector('.totalresult');
    totalresult.innerText = `Pontuação: ${player.centenas}${player.dezenas}${player.totalPoints}`;
}
