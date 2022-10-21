'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const currentEl0 = document.querySelector('#current--0');
const currentEL1 = document.querySelector('#current--1');

const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
let scores, currentscore, activeplayer, playing;
// initial function
const init = function () {
  // variables
  scores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentEL1.textContent = 0;
  currentEl0.textContent = 0;
  currentscore = 0;
  activeplayer = 0;

  diceEl.classList.add('hidden');
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
};
init();
//swuch users
const swichplayers = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

//playing the gamey
rollBtn.addEventListener('click', function () {
  if (playing) {
    // generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //show the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check for role one
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      swichplayers();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    //add current score to the active player score
    scores[activeplayer] += currentscore;
    document.querySelector(`#score--${activeplayer}`).textContent =
      scores[activeplayer];
    //check if score higher than 100
    if (scores[activeplayer] >= 100) {
      console.log('hol');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      // swiching the players
      swichplayers();
    }
  }
});

newBtn.addEventListener('click', init);
