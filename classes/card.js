// making card class, with suit and rank, and exporting it
export default class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    // converts the rank of Jack, Queen, King, and Ace to numbers to allow comparison
    getValue() {
        switch(this.rank) {
            case 'J':
                return 11;
            case 'Q':
                return 12;
            case 'K': 
                return 13;
            case 'A':
                return 14;
            default:
                return parseInt(this.rank);
        }
    }
    
    // returns a string of the name of the card 
    getCardName() {
        return `${this.rank} of ${this.suit}s`
    }
}

