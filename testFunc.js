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