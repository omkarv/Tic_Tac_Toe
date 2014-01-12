  // client code
//"use strict";
//var grid = new Meteor.Collection("Grid");

$(document).ready(function()
    {
     //initialising an empty grid, each array representing a row
     var initGrid = [['_', '_', '_'], // row 1
                 ['_', '_', '_'], // row 2
                 ['_', '_', '_']]; // row 3
      //var grid = initGrid;
     //var rowCountGlobal = {"1": {"o": 0, "x": 0}, "2": {"o": 0, "x": 0}, "3": {"o": 0, "x": 0}};
     //var colCountGlobal = {"1": {"o": 0, "x": 0}, "2": {"o": 0, "x": 0}, "3": {"o": 0, "x": 0}};
      //boolean to indicate whether the game is finished, i.e. a win, draw or lose condition is present

     // defining jQuery functions that point to the visible html elements
     var message1 = $('#textdisplay'); // 1st message displayed to user
     var message2 = $('#retry'); // 2nd clickable message, in italics, displayed to user
     var gridElement = $('.el'); // grid element
     var displayedScore = $('#score'); // current score displayed to user
     
     var startPlayer = 1;           //  Player taking first turn  
     //var grid = GlobalGrid.findOne({type: "grid"}).value;
     //console.log(grid);
     var currPlayer = 1;//GlobalGrid.findOne({type: "grid"}).currPlayer;  //  start with Player 1, first time around
     var winCount = [0,0];//GlobalGrid.findOne({type: "grid"}).winCount; // Player 1 and 2 win counts
     var gameFinished = false;
     var reset = false;
     
     //when a grid element is clicked, execute the following code
     //console.log("running");
      var updateDisplay = function()
     {  
        gridId = GlobalGrid.findOne({type:"grid"})._id;
        grid = GlobalGrid.findOne({type: "grid"}).value;
        currPlayer = GlobalGrid.findOne({type: "grid"}).currentPlayer;
        if(!gameFinished)
            message1.text('Player ' + currPlayer +", it's your turn");
       // console.log(grid);
        gameFinished = isGameOver(grid);
        for(var row = 0; row < 3; row++)
        {
            for(var col = 0; col < 3; col++)
            {
                var reference = '#' + (row+1) + (col+1);
                //console.log(reference);
                if (grid[row][col] !== '_') {
                    $(reference).text(grid[row][col].toUpperCase());
                }
                else if(reset)
                {
                    $(reference).text('');
                    reset = false;
                    GlobalGrid.update({_id:gridId}, {$set: {currentPlayer : currPlayer, value:initGrid, winsCount : winCount}});
                }
                else if (grid[row][col] == '_') {
                    $(reference).text('');
                }

                    //console.log('element updated '+ grid[row][col].toUpperCase()); } //console.log(reference)
            }
        }
         if (!gameFinished)
        {
            message1.text('Player ' + currPlayer + ", it's your turn");
        }
        else 
        {
            message2.text('Click here to play again!');
            //update scores displayed
            displayedScore.text('Player 1: ' + winCount[0] + '     Player 2: ' + winCount[1] + ' ');
        }    
     }

    setInterval(updateDisplay, 200);

     gridElement.click(function() 
     { 
      var playerInput = this.id;  // this identifies the grid row, column clicked
      var $clickedElement = $(this); // this identifies the current element selected / clicked, and jQuery functions may be used to change this element
      // only if the grid element is empty update it with the current players token
      if (!$clickedElement.text().length)
      {
                //converts the row, column of element clicked to a format compatbile with the grid array (convert two digit string into integers)
        var gridInput = gridConvert(playerInput); // this needs to be passed to the server
        if (!gameFinished) // only update grid if game not over, thus entries into the drig are blocked after the game is over
        {
            if(currPlayer === 1)
            {
              // this updates the current displayed grid element selected with the player 1's token, "O"
              // enter converted player entry into grid object
              grid = gridEntry(gridInput, grid, currPlayer);
              //call setGrid
              currPlayer = 2;
              GlobalGrid.update({_id:gridId}, {$set: {currentPlayer : currPlayer, value:grid, winsCount : winCount}});
               //swap player
            }
            else
            {
              grid = gridEntry(gridInput, grid, currPlayer);
              currPlayer = 1; 
              GlobalGrid.update({_id:gridId}, {$set: {currentPlayer : currPlayer, value:grid, winsCount : winCount}});
              
            }
        }
      }

     });
    
     // resets all elements if clicked
     message2.click(function()
     { 
                // clear retry
                message2.text('Click here to reset');
                // switch startPlayer
                reset = true;
                startPlayer === 1 ? startPlayer = 2 : startPlayer = 1;   // if player who started previous game is player 1 switch to start with p2
                currPlayer = startPlayer;        
                //clear text display to prompt player
                message1.text('Player ' + currPlayer +", it's your turn");
                //clear all grid elements
                gridElement.text('');
                //clear gameFinished flag and reset grid array
                gameFinished = false;
                GlobalGrid.update({_id:gridId}, {$set: {currentPlayer : currPlayer, value : initGrid, winsCount : winCount}});
     }); 

     //function to convert two digit string to grid entry
     var gridConvert = function(twoDigitString) 
     {
        return [parseInt(twoDigitString.charAt(0)), parseInt(twoDigitString.charAt(1))];
     }

     // function to update grid array
     var gridEntry = function(input, grid, currentPlayer)
     {
        var gridRow = input[0] - 1; 
        var gridCol = input[1] - 1;
        currPlayer === 1 ? grid[gridRow][gridCol] = 'o' :  grid[gridRow][gridCol] = 'x'; 
     //   currPlayer === 1 ? rowCountGlobal[input[0].toString]['o'] += 1 :  rowCountGlobal[input[0].toString]['x'] += 1 ;
   //     currPlayer === 1 ? colCountGlobal[input[1].toString]['o'] += 1 :  rowCountGlobal[input[1].toString]['x'] += 1 ;
        return grid;
     }

    

     //function to check whether either player has won, or the game is drawn, returns boolean gameOver. Also updates the screen with who has won.  Also returns the player that has won
     var isGameOver = function(grid) // TO DO tidy this function
     {
     
     var gameOver = false;
     var playerWon;
     // counts no of 'x' and 'o' in rows

     for(var row in grid)
     {
         var rowCount = {};  
         for(var col in grid[row])
         {
    
             if(!rowCount[grid[row][col]])
                 rowCount[grid[row][col]] = 1;
             else
                 rowCount[grid[row][col]] += 1;
            
         }
         //checks if any rows are winning rows
         if(rowCount['x'] === 3)
         {
             playerWon = 2;  
             gameOver = true;
         }
         else if(rowCount['o'] === 3)
         {
             playerWon = 1;  
             gameOver = true;     
         }

     }
    
     //check if there are winning columns
     if (!gameOver)  // only run if game not over
     {
        for (var columns = 0; columns < 3; columns++)
        {
             var colCount = {};
             for (var rows in grid[columns])
             {
               // console.log(grid[rows][columns]);
                 if(!colCount[grid[rows][columns]])
                     colCount[grid[rows][columns]] = 1;
                 else
                     colCount[grid[rows][columns]] += 1;
             }
             if(colCount['x'] === 3) 
             {
                 playerWon = 2;
                 gameOver = true;
             }
             else if(colCount['o'] === 3) 
             {
                 playerWon = 1; 
                 gameOver = true;     
             } 
        }
     }

     // check if there are winning diagonals
     if (!gameOver)
     {
        if((grid[0][0] === grid[1][1]) && (grid[1][1] === grid[2][2]) || (grid[0][2] === grid[1][1]) && (grid[1][1] === grid[2][0]))
        {
            if(grid[1][1] === 'o')
            {
             playerWon = 1; 
             gameOver = true;
            }
            else if( grid[1][1] === 'x')
            {
             playerWon = 2; 
             gameOver = true;
            }
        }
     }

     if (!gameOver)
     {
         var rowsFullCount = 0;
         //check if there is a draw condition, i.e. if all rows are full and there is no win yet
         for (var row1 = 0; row1 < grid.length; row1++) 
          {
            if(grid[row1].indexOf('_') === -1)
                rowsFullCount += 1;   
          }
         if(rowsFullCount === 3)
         {            
            message1.text("It's a Draw, You Both Lose.  GAME OVER.");
            playerWon = 0; 
            gameOver = true;
         }
     }
     else if(playerWon&&!gameFinished)
     {  
            message1.text('Game Over!! Player ' + playerWon + ' Wins!');
            winCount[playerWon-1] += 1;
     }

    return gameOver;
    }

  });


    
