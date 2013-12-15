$( document ).ready(function()
    {
     //initialising an empty grid object
     var grid = [["_", "_", "_"], ["_","_","_"], ["_", "_", "_"]];
     var currPlayer = 1; // by default start with Player 1

    //logic to check if the game over is over should be applied prior to this

    //when a grid element is clicked...
     $('.el').click(function(){ 
    
      var playerInput = this.id;  //$(this).attr('id'); - this identifies the grid row, column clicked
      //if the grid element is empty update it with the current players token
      if ($(this).text().length === 0)
      {
        //converts the row, column of element clicked to a format compatbile with the grid Obhect (convert two digit string into integers)
        var gridInput = gridConvert(playerInput);
        if(currPlayer===1)
        {
          currToken = "O";
          // this updates the current displayed grid element selected with the player token
          $(this).text(currToken); 
          // enter converted player entry into grid object
          gridEntry(gridInput, grid, currPlayer);
          currPlayer = 2; //swap player
        }
        else
        {
          currToken = "X";
          $(this).text(currToken); 
          // enter converted player entry into grid object
          gridEntry(gridInput, grid, currPlayer);
          currPlayer = 1; //swap player
        }
        
        var gameFinished = isGameOver(grid);
        //once game over offer retry option, block entry into grid

        //updates the displayed message depending on the current Player, if game not over
        if (gameFinished === false)
            $('#textdisplay').text("Player " + currPlayer + ", it's your turn");
      }

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
                 gameOver = true;
             }
         }
         else if ("o" in rowCount)
         {
             if(rowCount[grid[row][col]] === 3)
             {
                 $('#textdisplay').text("Game Over!!! Player 1 Wins!");
                 gameOver = true;     
             }
            
         }  
     }
    
     //check if there are winning columns
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
                 gameOver = true;
             }
         }
         else if ("o" in colCount)
         {
             if(colCount["o"] === 3)
             {
                 $('#textdisplay').text("Game Over!!!  Player 1 Wins!");
                 gameOver = true;     
             }
            
         }
       
     }
   // check if there are winning diagonals
     if((grid[0][0]===grid[1][1]) && (grid[1][1]===grid[2][2])||(grid[0][2]===grid[1][1]) && (grid[1][1]===grid[2][0]))
     {
         if(grid[1][1] === "o")
         {
             $('#textdisplay').text("Game Over!! Player 1 Wins!");
             gameOver = true;
         }
         else if( grid[1][1] === "x")
         {
             $('#textdisplay').text("Game Over!! Player 2 Wins!");
             gameOver = true;
         }
     }
    
     var draw = false;
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
           $('#textdisplay').text("Draw, You Both Lose.  GAME OVER.");
             gameOver = true;
             draw = true;
        }
     }

     return gameOver;
    
    }

  });


    