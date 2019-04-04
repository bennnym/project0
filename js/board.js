$(document).ready(function(){

  
  $('#game').change(function(){
  game = $("option:selected").val();
  if (game === 'Sudoku' || game === 'Tic-Tac-Toe'){
    $('#game').addClass('none');
    $('#h1').addClass('none');
    gameToPlay(game);
  };
  });
  
  const gameToPlay = function( game ) {
    if (game === 'Tic-Tac-Toe'){
      $('#tictactoe').removeClass('none');
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
        playerScores[player1] = 0;
        playerScores[player2] = 0;
        move = player1;
        $('.player-turn').text(`${player1}'s move`)
    
      } else {
        $('td').off()
      }
    })
    }
    if (game === 'Sudoku'){
      $('#sudoku').removeClass('none');
    }
  };
  
  
  /////////TIC TAC TOE LOGIC
  $('svg').hide()
  $('.button').hide()
  $('.score').hide()
  $('.go-home').hide()
  $('p').hide()
  $('span').hide()

  const gameLoop = function(  ) { //main game loop
    $('td').on('click',function(){
      if (move === player1 ){ //player1 move
      $('.player-turn').text(`${player2}'s move`)
      $(this).children('i').addClass('fas fa-circle').hide().fadeIn(500);
      tictactoe.board[$(this).attr('id')] = 'X';
      win()
      draw()
      $(this).off()
      turn()
    } else { //player 2 move
      $('.player-turn').text(`${player1}'s move`)
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
    $('svg').hide();
    $('p').hide();
    $('rect').removeClass(tictactoe.winningCombination());
    $('i').removeClass('fas fa-times');
    $('i').removeClass('fas fa-circle');
    tictactoe.clearboard();
    $('.button').hide();
    $('.score').hide();
    $('.go-home').hide();
    $('.player-turn').text(`${move}, you get to go first this time!`);
    gameLoop();
  });
  
  $('.score').on('click',function(){
    Swal.fire({
    title: 'Score Update',
    text: `${player1.toUpperCase()}: ${playerScores[player1]} VS ${player2.toUpperCase()}: ${playerScores[player2]}`,
    imageUrl: 'img/fight.gif',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    animation: false
})
  });
  
  $('.go-home').on('click',function(){
    $('#game').removeClass('none');
    $('#h1').removeClass('none');
    $('#tictactoe').addClass('none');

  })
  
  gameLoop()
  
  //////////SUDOKU LOGIC STARTS HERE///////////////
  
  
  $('.difficulty').on('click', function(){ // initial click after difficulty selected
    let difficulty = $(this).text()
    sudokuBoard = sudoku.generate(`${difficulty}`)
    fillSudokuBoard(sudokuBoard)
    $('.choose').addClass('invisible')
    $('.difficulty').addClass('hidden');
    $('.hide').addClass('secondary').removeClass('hide')
  })

  const fillSudokuBoard = function( board ) {
    board = board.split('')
    $('input').hide()
    board.forEach((num,index) => {
      if(num!=='.'){ //fills the board 
        $(`#cell-${index}`).val(num)
                           .attr('readonly',true)
                           .addClass('fixed')
      };
    $('input').fadeIn(2000);
    
  })}
  
  $('#hint').on('click',hint); //gives player a hint 
  
  $('#solve').on('click',function(){
    Swal.fire(
      {
  title: 'Are you sure?',
  text: "You are nearly there!",
  type: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Solve it!'
}).then((result) => {
  if (result.value) {
    solveBoardEffect()  
  };
});
});
  
  
  $('#play-again').on('click',function(){
    $('.choose').fadeIn(300).text('Please select a difficulty:')
    $('.difficulty').removeClass('hidden').fadeIn(300);
    $('.secondary').addClass('hide');
    $('input').val('').removeClass('fixed').removeAttr('readonly')
    $('.winning').hide()
  })
  
  $('#home').on('click',function(){ // home button in Sudoku
    $('#sudoku').addClass('none');
    $('#game').removeClass('none');
    $('#h1').removeClass('none');
  })
  
  
});


//////////////////TIC TAC TOE LOGIC//////////////////////////////
let move;
let player1;
let player2;
const playerScores = {}
let game;
let sudokuBoard;



const turn = function(  ) { //changes the players turn after each go
  move === player1 ? move = player2 : move = player1
};

const win = function(  ) { //checks for a win and makes changes accordingly
  if ( tictactoe.checkForWin() ){
    playerScores[move] += 1;
    $('p').text(`${move} WINS!`)
          .show();
          $('td').off();
            
    $('rect').addClass(tictactoe.winningCombination());
    $('svg').show();
    $('.button').show();
    $('.score').show();
    $('.go-home').show();
    
    
  }
};

const draw = function ( ){ // checks for a draw and configs changes accordingly
  if ( tictactoe.checkForDraw() ){
    $('p').text(`IT'S A DRAW!`)
          .show();
    $('.button').show();
    $('.score').show();
    $('.go-home').show();
    $('td').off();
  }
};

//////////////////SUDOKU LOGIC STARTS HERE ///////////////////////////

const hint = function(  ) { // should check to see if all input is correct and if so then it gives the player 3 numbers as a hint (can flash them on the screen quickly)
  
  let inputSoFar = $('input') //can turn into an array to compare to original
  let stringSudoku = $('input').map((i, element) => $(element).val() >= 1 ? $(element).val():'.').get().join(''); //gets a string of all input for comparison
  let solvedBoard = sudoku.solve(stringSudoku)
  
  let hint1 = stringSudoku.indexOf('.');
  let hint2 = stringSudoku.indexOf('.', hint1 + 10);
  let hint3 = stringSudoku.indexOf('.', hint2 + 10);
  
  
  $(`#cell-${hint1}`).val(solvedBoard[hint1]).hide().fadeIn(300).addClass('hint')
  $(`#cell-${hint2}`).val(solvedBoard[hint2]).hide().fadeIn(300).addClass('hint')
  $(`#cell-${hint3}`).val(solvedBoard[hint3]).hide().fadeIn(300).addClass('hint')
  
  const sleep = function(ms) { // allows the hint to show and then go 
  return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  sleep(1500).then(function() {
    $(`#cell-${hint1}`).val('').removeClass('hint')
    $(`#cell-${hint2}`).val('').removeClass('hint')
    $(`#cell-${hint3}`).val('').removeClass('hint')
  });
  
  };
  
  const solveBoardEffect = function(  ) {
    let stringSudoku = $('input').map((i, element) => $(element).val() >= 1 ? $(element).val():'.').get().join('')
    stringSudoku = stringSudoku.slice(0,81)
    const solvedBoard = sudoku.solve(stringSudoku)
    stringSudoku = stringSudoku.split('')
    const sleep = function(ms) { // allows the hint to show and then go 
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    if (stringSudoku.indexOf('.') >= 0){
      let i = 0;
      while (stringSudoku.indexOf('.') !== -1){
        let index = stringSudoku.indexOf('.'); // gets the index of the empty val
        stringSudoku[index] = solvedBoard[index]
        sleep(100 * i++).then(function() {
          $(`#cell-${index}`).val(solvedBoard[index])
        });
      };
    } else { //check to see if the players input it correct 
      if (stringSudoku.join('') === solvedBoard){
        $('.choose').removeClass('invisible').fadeIn(300).text('Congratulations you are the Sudoku Master!')
      } else {
        let solution = sudoku.solve(sudokuBoard)
        let errors = []
        for (let i=0;i <= sudokuBoard.length; i++){
          if ( stringSudoku[i] !== solution[i]){
            errors.push(i);
          };
        };
        
        for (let nums of errors){
          $(`#cell-${nums}`).addClass('hint')
        };
        
        sleep(1000).then(function(){
          for (let nums of errors){
            $(`#cell-${nums}`).removeClass('hint')
          }})
        
        $('.choose').removeClass('invisible').fadeIn(300).text('You have an error somewhere. Watch the board for a hint.')
      };
    };

  };


  






