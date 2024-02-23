const CARD = "card"
const FRONT = "card-front"
const BACK = "card-back"
var board = document.getElementById("board")
var click = 0;
var endGame = 0
var card1 = null
var card2 = null

var techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
]

var pair = createPairOfCard(techs)
var shuffledPairs = shuffleCards(pair)
createBoard(shuffledPairs)


var restartBtn = document.getElementById("restart")
restartBtn.addEventListener('click', restart)

function restart() {

    let restart = document.getElementById("game-over")
    restart.style.display = 'none'
    board.innerHTML = ` `
    pair = createPairOfCard(techs)
    shuffledPairs = shuffleCards(pair)
    createBoard(shuffledPairs)
    click = 0;
    endGame = 0
    card1 = null
    card2 = null
}


function flipCard(event) {

    var clickedCard = event.target.offsetParent



    clickedCard.classList.add("flip")

    click++;

    if (click == 1) {
        card1 = clickedCard
    }
    if (click == 2) {
        card2 = clickedCard
        isThePairCorrect(card1, card2)
    }
    if (endGame == 10) {
        gameOver(shuffledPairs)

    }
}

function gameOver(cards) {

    let restart = document.getElementById("game-over")

    for (let x = 0; x < cards.length; x++) {

        let cardID = document.getElementById(cards[x].id)
        cardID.removeEventListener("mousedown", flipCard)
    }
    setTimeout(() => {

        restart.style.display = 'flex'
    }, 700)
}

function isThePairCorrect(c1, c2) {

    let clickedCard1 = c1.dataset.card
    let clickedCard2 = c2.dataset.card

    if (clickedCard1 === clickedCard2) {
        endGame++
    }
    else {
        setTimeout(() => {

            c1.classList.remove("flip")
            c2.classList.remove("flip")

        }, 800)
    }

    click = 0

}

function createBoard(cards) {

    let contador = 0

    for (card in cards) {

        board.innerHTML += `
        
        <div class="card" id="${cards[contador].id}" data-card="${cards[contador].nome}">
        <div class="card-front">
        <img src="./img/${cards[contador].nome}.png">
        </div>
        <div class="card-back">
        &lt/&gt
        </div>
        </div>
        
        `
        contador++;
    }
    addActionToFlipCard(cards)

}

function addActionToFlipCard(cards) {

    for (let x = 0; x < cards.length; x++) {
        let cardID = document.getElementById(cards[x].id)
        cardID.addEventListener("mousedown", flipCard)
    }

}


function shuffleCards(pares) {

    var shuffle = pares
    for (let i = shuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }
    return shuffle;

}


function createPairOfCard(techs) {
    var cards = []

    for (tech of techs) {

        cards.push(createArray(tech))
        cards.push(createArray(tech))

    }

    return cards;
}

function randomNumber() {
    var random = parseInt(Math.random() * 1000)
    return random;
}

function createArray(tech) {

    var array =
    {
        nome: tech,
        id: tech + randomNumber()
    }

    return array
}