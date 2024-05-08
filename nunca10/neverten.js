let numPlayers = sessionStorage.getItem('numPlayers');
let ordem = 1;
function iniciarJogo() {
    const playersContainer = document.getElementById('players');
    playersContainer.innerHTML = '';
}
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
function exibirRegras() {

    const blurContainer = document.createElement('div');
    blurContainer.classList.add('blur-container');

    const regrasContainer = document.createElement('div');
    regrasContainer.classList.add('regrasContainer');
    regrasContainer.innerHTML = `
        <h2>Regras do Jogo</h2>
        <p class="fonte-divertida">
    1. Para saber quem será o primeiro, os participantes escolhem um entre eles e o jogo continua no sentido horário.
    </p>
    <p class="fonte-divertida">
    2. O primeiro jogador clica no botão e aguarda a visualização do número gerado pelo sistema. Em seguida, ele adiciona as unidades em uma área reservada para ele.
    </p>
    <p class="fonte-divertida">
    3. O próximo jogador participará da mesma maneira que o primeiro e assim sucessivamente, por várias rodadas seguidas.
    </p>
    <p class="fonte-divertida">
    4. Ao juntar 10 números, com 1 unidade simples cada, o jogador deve trocá-las por 1 estrela com dez unidades, ou seja, uma dezena. OBS: Dezena está sendo representada pela estrela " ★ ".
    </p>
    <p class="fonte-divertida">
    5.Ao juntar 10 barras com 1 dezena em cada, o jogador deve trocá-las pela placa contendo uma centena. OBS: Centena está sendo representada pelo Sol " ☀ " .
    </p>
    <p class="fonte-divertida"> 
    6. Será vencedor o jogador que primeiro fizer a troca por uma placa, que representa a terceira ordem, isto é, 100 unidades. 
    </p>
        <button class="fecharRegras" onclick="fecharRegras()">OK</button>
    `;
    blurContainer.appendChild(regrasContainer);
    document.body.appendChild(blurContainer);
    
        
}

function fecharRegras() {
    const blurContainer = document.querySelector('.blur-container');
    if (blurContainer) {
        blurContainer.remove();
    }
}

function updateNumPlayers() {
    const selectElement = document.getElementById('numPlayersSelect');
    numPlayers = parseInt(selectElement.value); 
    const playersContainer = document.getElementById('players');
    playersContainer.innerHTML = '';
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
    resetAll();
}


function updateButtons(playerName) {
    
    const buttons = document.querySelectorAll('.playerButton');
    buttons.forEach(button => {
        button.disabled = true;
    });

    
    const currentPlayerButton = document.getElementById(`playerButton${playerName}`);
    if (currentPlayerButton) {
        currentPlayerButton.disabled = false;
        currentPlayerButton.innerText = 'Espere'; 
    }

    
    const nextplayerName = playerName % numPlayers + 1;
    const nextPlayerButton = document.getElementById(`playerButton${nextplayerName}`);
    if (nextPlayerButton) {
        nextPlayerButton.disabled = false;
        nextPlayerButton.innerText = 'Rolar Dado'; 
    }
}

function rollDice(playerName) {
    const player = players[playerName];
    if (ordem == playerName) {
        if (!player.iswon) {
            const diceRoll = Math.floor(Math.random() * 10);
            const imgElement = document.getElementById('diceImage');
            const playerContainer = document.querySelectorAll('.playerContainer')[playerName - 1];
            const diceResult = playerContainer.querySelector('.diceResult');
            diceResult.innerText = `Resultado do dado: ${diceRoll}`;
            player.totalPoints += diceRoll;

            if (player.totalPoints >= 10) {
                
                player.totalPoints -= 10;
                player.dezenas += " \u2605 ";

                
                if (player.dezenas.split(' \u2605 ').length - 1 >= 10) {
                    player.centenas += " \u2600 ";
                    player.dezenas = "";
                }
                if (player.centenas.split(' \u2600 ').length - 1 >= 1) {
                    player.iswon = true;
                    diceResult.innerText = "Fim do jogo, chegou a 100";
                                    const totalresult = playerContainer.querySelector('.totalresult');
                    totalresult.innerText = `Pontuação: ${player.centenas}${player.dezenas}${player.totalPoints}`;
                    updateButtons(playerName);
                     const winnerMessage = document.createElement('div');
                    winnerMessage.innerHTML = `<h1>Jogador ${playerName} venceu!</h1>`;
                    winnerMessage.classList.add('winnerMessage'); 
                    document.body.appendChild(winnerMessage);
                    const buttons = document.querySelectorAll('.playerButton');
                    buttons.forEach(button => {
                        button.disabled = true;
                    });
                        const restartButton = document.createElement('button');
                        restartButton.innerText = 'Reiniciar Jogo';
                        restartButton.classList.add('restartButton'); 
                        restartButton.onclick = () => resetAll();
                        winnerMessage.appendChild(restartButton);
                        document.body.appendChild(div);
                } else {
                    diceResult.innerText = `Resultado do dado: ${diceRoll}`;
                    const totalresult = playerContainer.querySelector('.totalresult');
                    totalresult.innerText = `Pontuação: ${player.centenas}${player.dezenas}${player.totalPoints}`;
                    updateButtons(playerName);
                }
            }
            const totalresult = playerContainer.querySelector('.totalresult');
            totalresult.innerText = `Pontuação: ${player.centenas}${player.dezenas}${player.totalPoints}`;
            updateButtons(playerName);
        }

        
        ordem++;
        if (ordem > numPlayers) {
            ordem = 1;
        }
    }
}

function resetAll() {
    ordem = 1; 
    for (let i = 1; i <= numPlayers; i++) {
        resetPlayer(i);
    }
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
