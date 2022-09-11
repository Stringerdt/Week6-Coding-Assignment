import Card from "./card.js"

// WarGame class for creating instances of the game WAR
// with the ability to deal cards and play rounds
export default class WarGame {
    constructor(deck, playerOne, playerTwo) {
        this.deck = deck;
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.round = 0;
        this.isGameOver = false;
    }

    dealCards() {
        // sets playerOne.cards & playerTwo.cards to first half and second half of deck.cards array, respectively, to "deal" each player their cards
        this.playerOne.cards = this.deck.cards.splice(0, (this.deck.cards.length / 2));
        this.playerTwo.cards = this.deck.cards.splice(0, this.deck.cards.length);
    }

    playRound() {
        if (this.round >= 26) {
            this.isGameOver = true;
        }
        // sets players' card to their 0 index card in their array, simulating "drawing" a card, assuming the 0 index card is the "top card"
        let playerOneCard = new Card(this.playerOne.cards[0].rank, this.playerOne.cards[0].suit);
        let playerTwoCard = new Card(this.playerTwo.cards[0].rank, this.playerTwo.cards[0].suit);

        // shifts the card element from each players' cards array to simulate the removal of the card from their pile/hand
        this.playerOne.cards.shift();
        this.playerTwo.cards.shift();

        // this is adding 1 to the round counter, to let us & the player know what round it is
        this.round++;

        // logic to determine who gets a point
        if (playerOneCard.getValue() > playerTwoCard.getValue()) {
            this.playerOne.score++;
        } else if (playerOneCard.getValue() < playerTwoCard.getValue()) {
            this.playerTwo.score++;
        }
    }
}

