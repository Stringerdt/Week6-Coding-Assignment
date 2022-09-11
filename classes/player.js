// Player class, only needs to have a name to create
// and will hold cards and a score for WarGame to use
export default class Player {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.score = 0;
    }
}


