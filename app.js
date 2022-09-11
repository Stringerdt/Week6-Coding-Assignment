// Page for running HTML scripts and specific warGames

// importing classes from other files
import Deck from "/classes/deck.js";
import Player from "/classes/player.js";
import WarGame from "/classes/warGame.js";

// selecting elements from HTML **(There has to be a better way to do this)**
let inputForm = document.getElementById('inputForm');
let p1Input = document.getElementById('p1Input');
let p2Input = document.getElementById('p2Input');
let fullGameBoard = document.getElementById('fullGameBoard');
let nextRoundBtn = document.getElementById('nextRoundBtn');
let gameHeaderText = document.getElementById('gameHeaderText');
let roundCounter = document.getElementById('roundCounter');
let p1Info = document.getElementById('p1Info');
let p2Info = document.getElementById('p2Info');
let p1Name = document.getElementById('p1Name');
let p2Name = document.getElementById('p2Name'); 
let p1Score = document.getElementById('p1Score');
let p2Score = document.getElementById('p2Score');
let p1HandSpan = document.getElementById('p1HandSpan');
let p2HandSpan = document.getElementById('p2HandSpan');
let p1PlayedCardSuit = document.getElementById('p1CardSuit');
let p2PlayedCardSuit = document.getElementById('p2CardSuit');
let p1PlayedCardRank = document.getElementById('p1CardRank');
let p2PlayedCardRank = document.getElementById('p2CardRank');
// let checkValuesBtn = document.getElementById('checkValuesBtn'); // check values button, commented out when not in use


// on launch, assign variables to their class for warGame params
let deck = new Deck;
let playerOne = new Player;
let playerTwo = new Player;

// create a warGame using these variables
let warGame = new WarGame(deck, playerOne, playerTwo);

// function to reference the image for the suit display on the playedCard
const getSuitImage = (suit) => {
    switch (suit) {
        case 'Club':
            return "/images/club.png"
        case 'Diamond':
            return "/images/diamond.png"
        case 'Heart':
            return "/images/heart.png"
        case 'Spade':
            return "/images/spade.png"
        default:
            return suit;
    }
}

// after form is clicked with player name, if input is valid, will assign playerOne and playerTwo to warGame
// then will use the makeDeck(); method from Deck to create all 52 card objects for the warGame.deck
// then will "randomize" the card objects using the shuffle(); method from Deck
// then will hide the input form and display the game board
// Finally, it will set some of the values of gameBoard: the initial text of the button, the initial header message, and each players' name, and sets their score to 0
const initializeGame = () => {

    // if both player inputs have a value, then it allows the game to begin; verifies valid input
    if(p1Input.value.trim().length > 0 && p2Input.value.trim().length > 0) {

        // sets playerOne and playerTwo as the value of the inputs
        warGame.playerOne = new Player(p1Input.value);
        warGame.playerTwo = new Player(p2Input.value);

        // creates the card objects for the warGame.deck.cards array
        warGame.deck.makeDeck();

        // "randomizes" the elements in our warGame.deck.cards array to simulate a card shuffle
        warGame.deck.shuffleDeck();

        // hides the input form and displays the game board after form is submitted
        inputForm.style.visibility = 'hidden';
        fullGameBoard.style.visibility = 'visible';

        // then sets the text of the header and the names of the players
        p1Name.innerText = warGame.playerOne.name;
        p2Name.innerText = warGame.playerTwo.name;
    } else {
        // alert if both inputs do not have a value
        alert('Please enter name for both players');
    }
}

// after clicking 'click to deal cards' btn, each player gets their 26 cards, and their handSpan is set to that value;
const dealCards = () => {
    // uses dealCards method on WarGame to assign 26 cards to each player
    warGame.dealCards();

    // sets the span text to the length of each players' cards array 
    p1HandSpan.innerHTML = `Cards Remaining <br> ${warGame.playerOne.cards.length}`;
    p2HandSpan.innerHTML = `Cards Remaining <br> ${warGame.playerTwo.cards.length}`;
}

// after nextRoundBtn click...
const displayRoundWinner = () => {
    if (warGame.playerOne.cards[0].getValue() > warGame.playerTwo.cards[0].getValue()) {
        gameHeaderText.innerText = `${warGame.playerOne.name} wins the round!`;
    } else if (warGame.playerOne.cards[0].getValue() < warGame.playerTwo.cards[0].getValue()) {
        gameHeaderText.innerText = `${warGame.playerTwo.name} wins the round!`;
    } else {
        gameHeaderText.innerText = `The round is a tie!`
    }
}

// also after nextRoundBtn click...
const playRound = () => {
    
    // displays the 0 index card for each players' cards array, I do this before the array is shifted from playround() to get the accurate [0] card
    p1PlayedCardRank.innerText = warGame.playerOne.cards[0].rank;
    p2PlayedCardRank.innerText = warGame.playerTwo.cards[0].rank;
    p1PlayedCardSuit.src = getSuitImage(warGame.playerOne.cards[0].suit)
    p2PlayedCardSuit.src = getSuitImage(warGame.playerTwo.cards[0].suit)

    // uses the playRound method from WarGame to play the top (first) card of each players' cards array. Then it scores accordingly
    warGame.playRound();

    // updates the new span text to the new length, since we are shifting a card each time. 
    p1HandSpan.innerText = warGame.playerOne.cards.length;
    p2HandSpan.innerText = warGame.playerTwo.cards.length;

    // iterates over the roundCounter to keep track of what round it is.
    roundCounter.innerText = `Next Round: ${warGame.round+1}/26`

    // updates each players score to their current score. 
    p1Score.innerText = `Score: ${warGame.playerOne.score}`;
    p2Score.innerText = `Score: ${warGame.playerTwo.score}`;

    // changes button text situationally
    if(warGame.round === 25) {
        nextRoundBtn.innerText = 'Click to play final round'
    } else if (warGame.round > 0) {
        nextRoundBtn.innerText = 'Click to play next round'
    }
}

// After game is over, this checks to see which player has the higher score, and displays content accordingly
const displayGameOver = () => {
    // hides roundCounter, since rounds are over
    roundCounter.innerText = ''

    // message if playerOne wins
    if (warGame.playerOne.score > warGame.playerTwo.score) {
        gameHeaderText.innerHTML = `Game Over! <br> ${warGame.playerOne.name} wins the match! <br> Congratulations!`
        p1Info.style.backgroundColor = 'green'
        p2Info.style.backgroundColor = 'red'

    // message if playerTwo wins
    } else if (warGame.playerOne.score < warGame.playerTwo.score) {
        gameHeaderText.innerHTML = `Game Over! <br> ${warGame.playerTwo.name} wins the match! <br> Congratulations!`
        p1Info.style.backgroundColor = 'red'
        p2Info.style.backgroundColor = 'green'

    // message if it is a tie
    } else {
        gameHeaderText.innerHTML = `Game Over! <br><br> Wow! The match was a tie!`
        p1Info.style.backgroundColor = 'yellow';
        p2Info.style.backgroundColor = 'yellow';
    }

    // changes button text to let user know they can return to main menu
    nextRoundBtn.innerText = 'Click to return to main menu!'
} 

// resets the gameboard and values to default
const reset = () => {
    warGame.isGameOver = false;
    warGame.round = 0;
    warGame.playerOne.score = 0;
    warGame.playerOne.score = 0;
    p2Info.style.backgroundColor = null;
    p1Info.style.backgroundColor = null;
    p1PlayedCardRank.innerText = null;
    p2PlayedCardRank.innerText = null;
    p1PlayedCardSuit.src = ''
    p2PlayedCardSuit.src = ''
    inputForm.style.visibility = null;
    fullGameBoard.style.visibility = null;
    p1Input.value = ''
    p2Input.value = ''
    gameHeaderText.innerText = 'Get Ready For WAR!!!';
    p1Score.innerText = 'Score: 0'
    p2Score.innerText = 'Score: 0'
    nextRoundBtn.innerText = 'Click here to deal cards'
}

// when the input form is submitted, this runs preventDefault() to keep user on same page/address, and then runs the initializeGame() funciton.
inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    initializeGame();
})

// checks values for testing purposes, commented out when not in use
// checkValuesBtn.addEventListener('click', () => {
//     console.log('warGame:');
//     console.log(warGame);
// })

// nextRoundBtn that uses conditionals to know if program needs to deal cards / display a round winner/play round, or if it needs to declare the game over and displayGameOver()
// once displayGameOver() sets warGame.isGameOver to true, this button will instead run the reset() function to return the game to the main menu with default values
nextRoundBtn.addEventListener('click', () => {
    // first checks that game is not over
    if (warGame.isGameOver != true) {
        // deals card before first round
        if(warGame.round === 0) {
            dealCards();
        }

        // if game is not over, will always display the round winner anad play the round each time clicked
        displayRoundWinner();
        playRound();

        // once the last round has been played, the button displays 'check results' text. Then if clicked again will display the game over screen/message. Then it will set the game to over
        if(warGame.round === 26) {
            displayGameOver();
            warGame.isGameOver = true;
        }
    
    // if warGame.isGameOver is equal to true, that means the game over screen has already been displayed. So when the button is clicked again, it will return the user to the main menu
    // and reset necessary values.
    } else {
        reset();
    }
})
