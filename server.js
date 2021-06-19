const { red } = require('color-name');
const express = require('express');
const app = express();

app.use(express.static('public'));

const { Deck, Hand } = require('./app/deck');

const deck = new Deck();

let table = deck.dispatchCardsOnce(5);

app.get('/table', (req, res) => {
  res.send(table);
});

app.get('/deck/:size', (req, res) => {
  const {size} = req.params;
  res.send(deck.dispatchCardsOnce(size));
});

/*const hand1 = new Hand(deck, 5);
  const hand2 = new Hand(deck, 5);
  const hand3 = new Hand(deck, 5);
  const hand4 = new Hand(deck, 5);
  const hand5 = new Hand(deck, 5);
  const hand6 = new Hand(deck, 5);
  const more = new Deal(3, 4);
  hand1.bringbackCards(deck);
  hand2.bringbackCards(deck);
  hand3.bringbackCards(deck);
  hand4.bringbackCards(deck);*/

  /*{
    cards: deck.cards
    handUser1: hand1.cards,
    handUser2: hand2.cards,
    handUser3: hand3.cards,
    handUser4: hand4.cards,
    handUser5: hand5.cards,
    handUser6: hand6.cards,
    moreCards: more.cards
  });*/

app.listen(4001, () => {
  console.log('Server running on port 4001');
});
