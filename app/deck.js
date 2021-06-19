class Deck {
    numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    suits = ['♣', '♦', '♥', '♠'];
  
    cards = [];
  
    constructor() {
      this.suits.forEach(suit => {
        this.numbers.forEach(face => {
          this.cards.push(face + suit);
        });
      });
    }
  
    refillDeck() {
      this.suits.forEach(suit => {
        this.numbers.forEach(face => {
          this.cards.push(face + suit);
        });
      });
    }
  
    dispatchCards(size) {
      if (this.cards.length < size) {
        let leftCards = [];
        leftCards = leftCards.concat(this.cards);
        let times = leftCards.length;
  
        this.refillDeck();
        for (let i = 0; i < times; i++) {
          this.cards = this.cards.filter(card => card !== leftCards[i]);
        }
  
        let deal = new Array(parseInt(size - times))
          .fill()
          .map(
            () =>
              this.cards.splice(parseInt(Math.random() * this.cards.length), 1)[0]
          );
        return deal.concat(leftCards);
      } else {
        return new Array(size)
          .fill()
          .map(
            () =>
              this.cards.splice(parseInt(Math.random() * this.cards.length), 1)[0]
          );
      }
    }
  
    dispatchCardsOnce(size) {
      if (this.cards.length < size) {
        //alert(`There are only ${this.cards.length} and you request ${size}!`);
        return new Array(0);
      } else {
        return new Array(parseInt(size))
          .fill('')
          .map(
            () =>
              this.cards.splice(parseInt(Math.random() * this.cards.length), 1)[0]
          );
      }
    }
  }
  
  class Hand {
    cards = [];
    constructor(deck, size) {
      this.cards = deck.dispatchCards(size);
    }
  
    bringbackCards(deck) {
      deck.cards = deck.cards.concat(this.cards);
      this.cards = [];
    }
  }
  
  /*class Deal {
    cards = [];
    constructor(size, player) {
      players = size * player;
    }
    more(hand) {
      if (this.cards.length < this.players) {
        this.cards = deck.dispatchCards(size);
      } else {
        this.hand;
      }
    }
  }*/
  
  module.exports = {
    Deck,
    Hand
    //Deal
  };
  