const createCardCorner = (number, symbol) => {
  return `<div class="card-corner">
                <div>${number}</div>
                <div>${symbol}</div>
            </div>`;
};

const createCardSymbols = (number, symbol) => {
  let symbols = "";
  const isNumber = !isNaN(number);

  if (number === "A") {
    symbols = `<div>${symbol}</div>`;
  }

  if (number === "J" || number === "Q" || number === "K") {
    symbols = `<div class='image'></div>`;
  }

  if (isNumber) {
    symbols = `${new Array(parseInt(number))
      .fill(symbol)
      .map((cardSymbol) => `<div>${cardSymbol}</div>`)
      .join("")}`;
  }
  //return '';
  return `<div class="symbols">${symbols}</div>`;
};

const createCardFront = (content) => {
  return `<div class="front">${content}</div>`;
};

const createCardBack = () => {
  return `<div class="back"></div>`;
};

const createCardDiv = (attibutes) => {
  const cardDiv = document.createElement("div");

  cardDiv.classList.add("card");
  Object.entries(attibutes).forEach(([key, value]) => {
    cardDiv.setAttribute(key, value);
  });
  return cardDiv;
};

const createCard = (card, flipped) => {
  const number = card.slice(0, -1);
  const symbol = card.slice(-1);
  const cardDiv = createCardDiv({ symbol, number });

  //const cardDiv = document.createElement('div');

  cardDiv.innerHTML = `
    <div class="container">
        ${createCardFront(`
            ${createCardCorner(number, symbol)}
            ${createCardSymbols(number, symbol)}
            ${createCardCorner(number, symbol)}
        `)}           
        ${createCardBack()}
    </div>
    `;
  /*cardDiv.classList.add('card');
    cardDiv.setAttribute('symbol', symbol);
    cardDiv.setAttribute('number', number);

    cardDiv.innerHTML = `${createCardCorner(number, symbol)}
                        <div class="symbols">
                            ${createCardSymbols(number, symbol)}
                        </div>
                        ${createCardCorner(number, symbol)}`;*/

  cardDiv.addEventListener("click", () => {
    //console.log(`card${number} ${symbol} has been clicked`)
    if (cardDiv.classList.contains("flipped")) {
      cardDiv.classList.remove("flipped");
    } else {
      cardDiv.classList.add("flipped");
    }
  });

  if (flipped) {
    cardDiv.classList.add("flipped");
  }

  return cardDiv;
};

const createDeck = async (selector, path, flipped) => {
  const container = document.querySelector(selector);
  const cards = await (await fetch(path)).json();
  cards.forEach((card, index) =>
    container.append(createCard(card, index < flipped))
  );
};

const onClickElementById = (id, callback) => {
  document.getElementById(id).addEventListener("click", callback);
};

window.addEventListener("load", function () {
  //const container = document.querySelector('.deck.hand');
  //const containerWidow = document.querySelector('.deck.widow')
  (async () => {
    //const deck = await (await fetch('/deck')).json();
    //const deck = await fetch('/deck');
    //const container = document.querySelector('.deck');
    await createDeck(".deck.table", "/table", 2);
    const cardSize = 2;
    await createDeck(".deck.hand", `/deck/${cardSize}`, cardSize);
    //deck.forEach((card) => {
    //container.append(createCard(card));
    onClickElementById("flip-cards", () => {
      document
        .querySelectorAll(".deck.hand .card")
        .forEach((element, index) => {
          setTimeout(() => {
            element.classList.remove("flipped");
          }, 500 * index);
        });
    });
    onClickElementById("button-hold", () => {
      console.log("HOLD");
    });
    onClickElementById("button-withdraw", () => {
      console.log("WITHDRAW");
    });
  })();
});
