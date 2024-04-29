class Player {
    constructor(name) {
        this.name = name;
        this.unidade = 0;
        this.dezena = 0;
        this.centena = 0;
    }

    addUnits(unidade) {
        this.unidade += unidade;
        if (this.unidade >= 10) {
            this.unidade -= 10;
            this.dezena++;
        }
        if (this.dezena >= 10) {
            this.dezena -= 10;
            this.centena++;
        }
    }

    hasWon() {
        return this.centena > 0;
    }
}

let players = [];
let currentPlayerIndex = 0;

function startGame() {
    // Adicione os jogadores
    players.push(new Player("Jogador 1"));
    players.push(new Player("Jogador 2"));
    players.push(new Player("Jogador 3"));
    players.push(new Player("Jogador 4"));
}

function playTurn() {
    let currentPlayer = players[currentPlayerIndex];
    let units = Math.floor(Math.random() * 10);
    currentPlayer.addUnits(units);
    if (currentPlayer.hasWon()) {
        console.log(currentPlayer.name + " venceu o jogo!");
    } else {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    }
}

startGame();
while (true) {
    playTurn();
}