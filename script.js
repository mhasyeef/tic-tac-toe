// 1. function to render contents of gameboard array to the webpage
// 2. function to allow players to add marks to a spot in the board and tie to the DOM

//factory function
const createPlayer = (name, icon, turn) => {
  return {name, icon, turn};
}

//game object
const game = (function() {

  //gameboard array
  let gameboardArray = ['', '', '', '', '', '', '', '', '',];

  //to declare players
  const playerOne = createPlayer('Player 1', 'O', true);
  const playerTwo = createPlayer('Player 2', 'X', false);

  let turnsLeft = 9;

  //winning combinations
  let winningCombo = [[0, 1, 2], 
                      [3, 4, 5], 
                      [6, 7, 8], 
                      [0, 3, 6], 
                      [1, 4, 7], 
                      [2, 5, 8], 
                      [0, 4, 8], 
                      [2, 4, 6]];

  //to check the winner
  function checkWinner() {
    let roundWon = false;
    for(let i = 0; i < game.winningCombo.length; i++) {
      const condition = game.winningCombo[i];  //[0, 1, 2]...[3, 4, 5].. total of 8 winning combos
      const cellA = game.gameboardArray[condition[0]]; //assign variable to inner array eg. [0,1,2]
      const cellB = game.gameboardArray[condition[1]]; //assign variable to inner array eg. [0,1,2]
      const cellC = game.gameboardArray[condition[2]]; //assign variable to inner array eg. [0,1,2]
      //starting point the arrays are ""
      if(cellA == "" || cellB == "" || cellC == "") {
        console.log(roundWon);
        continue;
      }
      //if the cells(Xs or Os) matches, winner is found
      if(cellA == cellB && cellB == cellC) {
        if(cellA && cellB && cellC === game.playerOne.icon) {
          renderGameboard.gameStatusDisplay.textContent = `${game.playerOne.name} won!`
        } else {
          renderGameboard.gameStatusDisplay.textContent = `${game.playerTwo.name} won!`
        }
        console.log(roundWon);
        break;
      }
    }
    
  }

  function restartGame() {
    renderGameboard.resetButton.onclick = function() {
      location.reload();
    }
  }

  return {gameboardArray, playerOne, playerTwo, turnsLeft, winningCombo, checkWinner, turnsLeft, restartGame};
})();

const renderGameboard = (function() {
  //selectors
  const squares = document.querySelectorAll('.squares');
  const gameStatusDisplay = document.querySelector('.gameStatus');
  const resetButton = document.querySelector('.resetBtn');

  //onclick event to generate Xs and Os on the gameboard
  for(let i = 0; i < squares.length; i++) {
    //attaching onclick event to 'squares' nodes
    squares[i].addEventListener('click', () => {
      if(game.playerOne.turn === true) {
        //updates array value
        game.gameboardArray.splice(i, 1, game.playerOne.icon)
        squares[i].textContent = game.playerOne.icon;
        game.playerOne.turn = false;
        game.turnsLeft -= 1;
        gameStatusDisplay.textContent = `${game.playerTwo.name} turn`;        
      } else{
        //updates array value
        game.gameboardArray.splice(i, 1, game.playerTwo.icon)
        squares[i].textContent = game.playerTwo.icon;
        game.playerOne.turn = true;
        game.turnsLeft -= 1;
        gameStatusDisplay.textContent = `${game.playerOne.name} turn`;
      }

      if(game.turnsLeft == 0) {
        renderGameboard.gameStatusDisplay.textContent = `It's a draw!`
      }

      game.checkWinner();
      game.restartGame();
      // resetButton.onclick = function() {
      //   location.reload();
      // }

      console.log(game.gameboardArray);
    }, {once:true})
  }
   
  return {gameStatusDisplay, resetButton};
})();




