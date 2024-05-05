numPlayers = sessionStorage.getItem('numPlayers');
let ordem = 1;
if (numPlayers == null) {
    numPlayers = 4;
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

let players = [];
for (let i = 1; i <= numPlayers; i++) {
    players[i] = {
        totalPoints: 0,
        dezenas: "",
        centenas: "",
        iswon: false
    };
}
function updateNumPlayers() {
    const selectElement = document.getElementById('numPlayersSelect');
    numPlayers = parseInt(selectElement.value); // Converte para número inteiro

    // Remove todos os jogadores existentes
    const playersContainer = document.getElementById('players');
    playersContainer.innerHTML = '';

    // Adiciona os novos jogadores com base na seleção
    for (let i = 1; i <= numPlayers; i++) {
        
        const playerName = prompt(`Digite o nome do Jogador ${i}:`);
        
        const playerContainer = document.createElement('div');
        playerContainer.classList.add('playerContainer');
        playerContainer.innerHTML = `
            <h2>${playerName}</h2>
            <div class="diceResult">Resultado do dado:</div>
            <div class="totalresult">Pontuação:</div>
            <button id="playerButton${i}" onclick="rollDice(${i})">Rolar Dado</button>
        `;
        playersContainer.appendChild(playerContainer);
    }

    // Reinicia o jogo para refletir a nova configuração de jogadores
    resetAll();
}


function updateButtons(playerName) {
    // Desabilitar todos os botões
    const buttons = document.querySelectorAll('.playerButton');
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Habilitar o botão do jogador atual
    const currentPlayerButton = document.getElementById(`playerButton${playerName}`);
    if (currentPlayerButton) {
        currentPlayerButton.disabled = false;
        currentPlayerButton.innerText = 'Espere'; // Alterar o texto do botão para 'Espere'
    }

    // Habilitar o botão do próximo jogador
    const nextplayerName = playerName % numPlayers + 1;
    const nextPlayerButton = document.getElementById(`playerButton${nextplayerName}`);
    if (nextPlayerButton) {
        nextPlayerButton.disabled = false;
        nextPlayerButton.innerText = 'Rolar Dado'; // Alterar o texto do botão de volta para 'Rolar Dado'
    }
}

function rollDice(playerName) {
    const player = players[playerName];
    if (ordem == playerName) {
        if (!player.iswon) {
            // Gerar um número aleatório de 1 a 6
            const diceRoll = Math.floor(Math.random() * 6) + 1;

            // Selecione o elemento de imagem
            const imgElement = document.getElementById('diceImage');

            // Obter o contêiner do jogador correspondente
            const playerContainer = document.querySelectorAll('.playerContainer')[playerName - 1];

            // Atualizar o resultado do dado na página
            const diceResult = playerContainer.querySelector('.diceResult');
            diceResult.innerText = `Resultado do dado: ${diceRoll}`;

            // Adicionar o valor do dado aos pontos totais
            player.totalPoints += diceRoll;

            // Verificar se o total de pontos é maior ou igual a 10
            if (player.totalPoints >= 10) {
                // Substituir os pontos por um ícone (estrela)
                player.totalPoints -= 10;
                player.dezenas += " \u2605 ";

                // Corrigir a condição para verificar se o jogador atingiu 10 dezenas
                if (player.dezenas.split(' \u2605 ').length - 1 >= 10) {
                    player.centenas += " Δ ";
                    player.dezenas = "";
                }

                // Corrigir a condição para verificar se o jogador ganhou o jogo
                if (player.centenas.split(' Δ ').length - 1 >= 1) {
                    player.iswon = true;
                    diceResult.innerText = "Fim do jogo, chegou a 100";

                    // Exibir pontuação atualizada
                    const totalresult = playerContainer.querySelector('.totalresult');
                    totalresult.innerText = `Pontuação: ${player.centenas}${player.dezenas}${player.totalPoints}`;
                    updateButtons(playerName);

                    // Exibir mensagem de vencedor
                    const winnerMessage = document.createElement('div');
                    winnerMessage.innerText = `Jogador ${playerName} venceu!`;
                    winnerMessage.classList.add('winnerMessage'); // Adiciona a classe para estilização CSS
                    document.body.appendChild(winnerMessage);
                    const buttons = document.querySelectorAll('.playerButton');
                    buttons.forEach(button => {
                        button.disabled = true;
                    });

                    // Botão de restart
                    const restartButton = document.createElement('button');
                    restartButton.innerText = 'Reiniciar Jogo';
                    restartButton.classList.add('restartButton'); // Adiciona a classe para estilização CSS
                    restartButton.onclick = () => resetAll();
                    document.body.appendChild(restartButton);
                } else {
                    diceResult.innerText = `Resultado do dado: ${diceRoll}`;

                    // Exibir pontuação atualizada
                    const totalresult = playerContainer.querySelector('.totalresult');
                    totalresult.innerText = `Pontuação: ${player.centenas}${player.dezenas}${player.totalPoints}`;
                    updateButtons(playerName);
                }
            }

            // Exibir pontuação atualizada
            const totalresult = playerContainer.querySelector('.totalresult');
            totalresult.innerText = `Pontuação: ${player.centenas}${player.dezenas}${player.totalPoints}`;
            updateButtons(playerName);
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

    // Remove a mensagem de vencedor e o botão de restart
    const winnerMessage = document.querySelector('.winnerMessage');
    const restartButton = document.querySelector('.restartButton');
    if (winnerMessage) winnerMessage.remove();
    if (restartButton) restartButton.remove();
}

function resetPlayer(playerName) {
    const player = players[playerName];
    player.totalPoints = 0;
    player.dezenas = "";
    player.centenas = "";
    player.iswon = false;

    const playerContainer = document.querySelectorAll('.playerContainer')[playerName - 1];
    const diceResult = playerContainer.querySelector('.diceResult');
    diceResult.innerText = "Resultado do dado:";

    const totalresult = playerContainer.querySelector('.totalresult');
    totalresult.innerText = `Pontuação: ${player.centenas}${player.dezenas}${player.totalPoints}`;
}
