$(document).ready(function(){

  Swal.mixin({ // gets user names to play the game and saves the names in variables
  input: 'text',
  confirmButtonText: 'Next &rarr;',
  showCancelButton: false,
  progressSteps: ['1', '2']
}).queue([
  {
    title: 'Player 1',
    text: 'Enter your Name:'
  },
   {
    title: 'Player 2',
    text: 'Enter your Name:'
  },

]).then((result) => {
  if (result.value) {
    Swal.fire({
      title: 'Ready to Play?',
      confirmButtonText: 'Lets Go!'
    })
    player1 = result.value[0];
    player2 = result.value[1];
    move = player1;
    $('h3').text(`${player1}'s move`)

  } else {
    $('td').off()
  }
})  
  
  $('svg').hide()
  $('button').hide()
  $('p').hide()

  const gameLoop = function(  ) { //main game loop
    $('td').on('click',function(){
      if (move === player1 ){ //player1 move
      $('h3').text(`${player2}'s move`)
      $(this).children('i').addClass('fas fa-circle').hide().fadeIn(500);
      tictactoe.board[$(this).attr('id')] = 'X';
      win()
      draw()
      $(this).off()
      turn()
    } else { //player 2 move
      $('h3').text(`${player1}'s move`)
      $(this).children('i').addClass('fas fa-times').hide().fadeIn(500);
      tictactoe.board[$(this).attr('id')] = 'O';
      win()
      draw()
      $(this).off()
      turn()
    };
    })
  };
  
  $('.button').on('click',function(){ // play again button - restarts game and clears all text pertaining to the previous game 
    $('svg').hide()
    $('p').hide()
    $('rect').removeClass(tictactoe.winningCombination())
    $('i').removeClass('fas fa-times')
    $('i').removeClass('fas fa-circle')
    tictactoe.clearboard()
    $('.button').hide()
    $('h3').text(`${move}, you get to go first this time!`)
    gameLoop()
  });
  
  gameLoop()
  
  
});

let move;
let player1;
let player2;

const turn = function(  ) { //changes the players turn after each go
  move === player1 ? move = player2 : move = player1
};

const win = function(  ) { //checks for a win and makes changes accordingly
  if ( tictactoe.checkForWin() ){
    $('p').text(`${move} WINS!`)
          .show()
          $('td').off()
            
    $('rect').addClass(tictactoe.winningCombination())
    $('svg').show()  
    $('button').show()
  }
};

const draw = function ( ){ // checks for a draw and configs changes accordingly
  if ( tictactoe.checkForDraw() ){
    $('p').text(`IT'S A DRAW!`)
          .show()
    $('button').show()
    $('td').off()
  }
};

