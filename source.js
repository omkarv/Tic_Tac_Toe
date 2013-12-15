$( document ).ready(function()
    {
     //initialising an empty grid object
     var grid = [["_", "_", "_"], ["_","_","_"], ["_", "_", "_"]];
     var startPlayer = 1;  
     var currPlayer = startPlayer;  //  start with Player 1, first time around
     var winCount = [0,0]; // Player 1 and 2 win counts
     var gameFinished = false;

    //logic to check if the game over is over should be applied prior to this

    //when a grid element is clicked...
     $('.el').click(function(){ 
    
      var playerInput = this.id;  //$(this).attr('id'); - this identifies the grid row, column clicked
      //if the grid element is empty update it with the current players token
      if ($(this).text().length === 0)
      {
        //converts the row, column of element clicked to a format compatbile with the grid Obhect (convert two digit string into integers)
        var gridInput = gridConvert(playerInput);
        if (gameFinished === false) // only update grid if game not over
        {
            if(currPlayer===1)
            {
              currToken = "O";
              //change marker color to white
             // $(this).css('color', 'white'); change without altering hover
              // this updates the current displayed grid element selected with the player token
              $(this).text(currToken); 
              // enter converted player entry into grid object
              gridEntry(gridInput, grid, currPlayer);
              currPlayer = 2; //swap player
            }
            else
            {
              currToken = "X";
              // change marker color to green
             // $(this).css('color', '#99FF33');
              $(this).text(currToken); 
              // enter converted player entry into grid object
              gridEntry(gridInput, grid, currPlayer);
              currPlayer = 1; //swap player
            }

            gameFinished = isGameOver(grid); // check if there are any winning sequences
        }
        //once game over offer retry option, block entry into grid

        //updates the displayed message depending on the current Player, if game not over
        if (gameFinished === false)
        {
            $('#textdisplay').text("Player " + currPlayer + ", it's your turn");
        }
        else 
        {
            // highlights winning elements - to do this the gameOver function must output the winning col, row or diagonal
            $('#retry').text("Click here to play again!");
            //update scores displayed
            $('#score').text("Player 1: " + winCount[0] + "     Player 2: " + winCount[1] + " ");
        }    
      }

     });
    
     // resets all elements if clicked
     $('#retry').click(function()
     { 
                // clear retry
                $('#retry').text("Click here to reset");
                // switch startPlayer
                if (startPlayer === 1) // if player who started previous game is player 1 switch to start with p2
                {
                    startPlayer = 2;
                    currPlayer = startPlayer;
                }
                    
                else
                {
                    startPlayer = 1;
                    currPlayer = startPlayer;
                }
                    
                //clear text display to prompt player
                $('#textdisplay').text("Player " + currPlayer +", it's your turn");
                //clear grid
                $('.el').text("");
                //clear gameFinished flag and reset grid Object
                gameFinished = false;
                grid = [["_", "_", "_"], ["_","_","_"], ["_", "_", "_"]];

     }); 

    //function to convert two digit string to grid entry
     var gridConvert = function(twodigitstring) 
     {
      return [parseInt(twodigitstring.charAt(0)), parseInt(twodigitstring.charAt(1))];
     }

    // function to update grid Object
     var gridEntry = function(input, grid, currentPlayer)
     {
     var gridRow = input[0] - 1; 
     var gridCol = input[1] - 1;
     // input is valid
     if (currPlayer === 1)
      grid[gridRow][gridCol] = "o";
     else if (currPlayer === 2)
       grid[gridRow][gridCol] = "x";
     outputGrid = grid;

     return outputGrid;
     }

     //function to check whether either player has won, or the game is drawn
     var isGameOver = function(grid) // TO DO tidy this function
     {
     //checks if any rows are winning rows
     var gameOver = false;
     for(var row in grid)
     {
         var rowCount = {};  
         for(var col in grid[row])
         {
             
             if(!(grid[row][col] in rowCount))
                 rowCount[grid[row][col]] = 1;
             else
                 rowCount[grid[row][col]] += 1;
            
         }
        
         if("x" in rowCount)
         {
             if(rowCount[grid[row][col]] === 3)
             {
                 $('#textdisplay').text("Game Over!!! Player 2 Wins!");
                // console.log(row);
                 winCount[1] += 1  
                 gameOver = true;
             }
         }
         else if ("o" in rowCount)
         {
             if(rowCount[grid[row][col]] === 3)
             {
                 $('#textdisplay').text("Game Over!!! Player 1 Wins!");
                 //console.log(row);
                 winCount[0] += 1;  
                 gameOver = true;     
             }
         }  
     }
    
     //check if there are winning columns
     if (gameOver !== true)  // only run if game not over
     {
        for (var columns = 0; columns < 3; columns++)
        {
         var colCount = {};
         for (var rows = 0; rows <3; rows++)
         {
             if(!(grid[rows][columns] in colCount))
                 colCount[grid[rows][columns]] = 1;
             else
                 colCount[grid[rows][columns]] += 1;
         }
         if("x" in colCount)
         {
             if(colCount["x"] === 3)
             {
                 $('#textdisplay').text("Game Over!!  Player 2 Wins!");
                 //console.log(col);
                 winCount[1] += 1;  
                 gameOver = true;
             }
         }
         else if ("o" in colCount)
         {
             if(colCount["o"] === 3)
             {
                 $('#textdisplay').text("Game Over!!!  Player 1 Wins!");
                 //console.log(col);
                 winCount[0] += 1;  
                 gameOver = true;     
             } 
         }
        }
     }
     
   // check if there are winning diagonals
   if (gameOver!== true)
   {
     if((grid[0][0]===grid[1][1]) && (grid[1][1]===grid[2][2])||(grid[0][2]===grid[1][1]) && (grid[1][1]===grid[2][0]))
     {
         if(grid[1][1] === "o")
         {
             $('#textdisplay').text("Game Over!! Player 1 Wins!");
             winCount[0] += 1  
             gameOver = true;
         }
         else if( grid[1][1] === "x")
         {
             $('#textdisplay').text("Game Over!! Player 2 Wins!");
             winCount[1] += 1  
             gameOver = true;
         }
     }
   }

   if (gameOver !== true)
   {
     var rowsFullCount = 0;
     //check if there is a draw condition
     for (var k = 0; k < grid.length; k++)
     {
       if(grid[k].indexOf("_") === -1)
       {
         rowsFullCount += 1;     
       }
        if(rowsFullCount===3 && gameOver===false)
        {            
           $('#textdisplay').text("It's a Draw, You Both Lose.      GAME OVER.");
             gameOver = true;
        }
     }
     
    }

     return gameOver;
    
    }

  });


    