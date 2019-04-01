let move = 'Player 1'

const turn = function(  ) {
  move === 'Player 1' ? move = 'Player 2' : move = 'Player 1'
};

const win = function(  ) {
  if ( tictactoe.checkForWin() ){
    $('<p>').text(`${move} WINS!`)
            .appendTo('body')
            $('td').off()
    $('rect').addClass(tictactoe.winningCombination())
    $('svg').show()  
  }
};

const draw = function ( ){
  if ( tictactoe.checkForDraw() ){
    $('<p>').text(`IT IS A DRAW!`)
            .appendTo('body')
            $('td').off()
  }
};


$(document).ready(function(){
  
  $('svg').hide()

  
  $('td').on('click',function(){
    if (move === 'Player 1'){ //player1 move
    $(this).children('i').addClass('fas fa-circle').hide().fadeIn(500);
    tictactoe.board[$(this).attr('id')] = 'X';
    win()
    draw()
    $(this).off()
    turn()
  } else { //player 2 move
    $(this).children('i').addClass('fas fa-times').hide().fadeIn(500);
    tictactoe.board[$(this).attr('id')] = 'O';
    win()
    draw()
    $(this).off()
    turn()
  };
  })
  
  
});