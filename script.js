// 1. function to render contents of gameboard array to the webpage
// 2. function to allow players to add marks to a spot in the board and tie to the DOM

//factory function
const createPlayer = (name, icon, turn) => {

  return {name, icon, turn};
}

// game object
const game = (function() {

  //gameboard array
  let gameboardArray = ['', '', '', '', '', '', '', '', '',];

  //to declare players
  const playerOne = createPlayer('Player 1', 'O', true);
  const playerTwo = createPlayer('Player 2', 'X', false);

  let winningCombo = [[0, 1, 2], 
                      [3, 4, 5], 
                      [6, 7, 8], 
                      [0, 3, 6], 
                      [1, 4, 7], 
                      [2, 5, 8], 
                      [0, 4, 8], 
                      [2, 4, 6]];

  return {gameboardArray, playerOne, playerTwo, winningCombo};
})();

const renderGameboard = (function() {
  //selectors
  const squares = document.querySelectorAll('.squares');
  const playerTurnDisplay = document.querySelector('.playerTurn');

  //onclick event to generate Xs and Os on the gameboard
  for(let i = 0; i < squares.length; i++) {
    //attaching onclick event to 'squares' nodes
    squares[i].addEventListener('click', () => {
      if(game.playerOne.turn === true) {
        //updates array value
        game.gameboardArray.splice(i, 1, game.playerOne.icon)
        squares[i].textContent = game.playerOne.icon;
        game.playerOne.turn = false;
        playerTurnDisplay.textContent = `${game.playerTwo.name} turn`;
      } else{
        //updates array value
        game.gameboardArray.splice(i, 1, game.playerTwo.icon)
        squares[i].textContent = game.playerTwo.icon;
        game.playerOne.turn = true;
        playerTurnDisplay.textContent = `${game.playerOne.name} turn`;
      }

      console.log(game.gameboardArray);
    }, {once:true})
  }
   
  return {};
})();

// const winnerDeclared = (function() {
//     winningCombo.forEach((item, index) => {

//     })
//   return {};
// })();




