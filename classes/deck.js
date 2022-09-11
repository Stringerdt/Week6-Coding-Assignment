import Card from "./card.js"

// deck class to hold an array of cards
// and will contain suits and ranks to create the cards of the deck with
export default class Deck {
    constructor() {
        this.cards = [];
        this.suits = [ 'Club', 'Diamond', 'Heart', 'Spade' ];
        this.ranks = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ];
    }

    // Method to loop through each rank, pushing a card of that rank each time, then looping that for each suit, so you get a card of each rank for each suit.
    // This creates our deck of 52 cards, in order of suit and rank
    makeDeck() {
        for(let i = 0; i < this.suits.length; i++) {
            for( let j = 0; j < this.ranks.length; j++) {
                this.cards.push(new Card(this.ranks[j], this.suits[i],));
            }
        }
    }
4
    // Method to randomize the array to simulate shuffling the cards. This randomizes a number between 0 51 to find a random index of the deck. 
    // First, it sets tempCard to the i index card. Then it sets the i index card to the card at the random index. Finally, it sets the random index card to equal to tempcard.
    // ex. loop1: i = 0 1) randomIndex = 12(random number) => tempCard = this.cards[0] = '2 of Clubs' => this.cards[0] = this.cards[12] ('A of Clubs') => this.cards[12] = '2 of Clubs';
    // now, after 1 loop, this.cards = [ 'A of Clubs', ..., '2 of Clubs', ... ];
    // loop2: i = 1 1) randomIndex = 50 => tempCard = this.cards[1] = '3' of 'Clubs' => this.cards[1] = this.cards[50] ('K' of 'Spades') => this.cards[50] = '3' of 'Clubs';
    // now, after 2 loop, this.cards = [ 'A of Clubs', 'K of Spades', ..., '2 of Clubs', ... '3 of Clubs' ];
    // etc... until all cards are shuffled. 
    shuffleDeck() {
        for (let i = 0; i < this.cards.length; i++) {
            let randomIndex = Math.floor(Math.random() * (this.cards.length));
            let tempCard = this.cards[i];
            this.cards[i] = this.cards[randomIndex];
            this.cards[randomIndex] = tempCard;
        }
    }
}

