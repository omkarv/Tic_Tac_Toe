var startGrid = [["_", "_", "_"], ["_","_","_"], ["_", "_", "_"]];
//initial grid values, stored as an array of arrays, each array being a row.  E.g. grid[1][1] corresponds to the middle element of the tic-tac-toe grid


// this function will output a string format of the grid when in the array format above.  It assumes a correct input, so the input will have to check if the entry is legal
var displayGrid = function(grid){
    var output = "";
    for(var row in grid)
    {
        for(var col in grid[row])
        {
        // this code adds the vertical lines for the second column
        if(col==1)
            output += "|" + grid[row][col] + "|";
        else
            output += grid[row][col];
        }
    // if we are looking at the first or second rows, create a new line on which to display the next line 
    if ((row==0)||(row==1))
        output += "\n";
    }
    return output;
}



var gridInput = function(input, grid, currPlayer){
    // this needs to occur to convert the player row column entry to the corresponding stored value in the grid array
    var gridRow = input[0] - 1; 
    var gridCol = input[1] - 1;
    
    // legality checking messages
    var errorMsg0 = "Illegal input, please try again. \n  Enter your next move in the following format: \n row no.,column no. \n e.g. to mark the middle of the grid type: 2,2";
    var errorMsg1 = "Illegal input, grid space is already occupied. \n  Enter your next move in the following format: \n row no.,column no. \n e.g. to mark the middle of the grid type: 2,2";
    
    if(input.length !== 2) // checking length of input is correct
    {
        console.log(errorMsg0);
   //     console.log("here0");
        return false;
    }
    
    if((typeof(input[0]) !== 'number' )||(typeof(input[1]) !== 'number' )) // checking input type is correct need to add for input[1] too
    {
        console.log(errorMsg0);
   //     console.log("here1");
        return false;
    }

    if((gridRow > 2)||(gridRow < 0)||(gridCol > 2)||(gridCol < 0)) //checking if input value range valid
    {
        console.log(errorMsg0);
        //console.log(gridRow + gridCol);
   //     console.log("here2");
        return false;
    }
    // is input a whole no?
    
    // does the grid already have a "x" or "o" in that space.  If so exit and display different errorMsg
    if (grid[gridRow][gridCol] === "_") //if no x in space add noughts check too
    {
        // input is valid
        if (currPlayer === 1)
            grid[gridRow][gridCol] = "o";
        else if (currPlayer === 2)
            grid[gridRow][gridCol] = "x";
    }
    else
    {
        console.log(errorMsg1);
     //   console.log("here4");
        return false;
    }
        
outputGrid = grid;
    
return outputGrid;
    
}

var isGameOver = function(grid)
{
    //checks if any rows are winning rows
    for(var row in grid)
    {
        var rowCount = {};  
        for(var col in grid[row]){
            
            if(!(grid[row][col] in rowCount))
                rowCount[grid[row][col]] = 1;
            else
                rowCount[grid[row][col]] += 1;
            
        }
        
        if("x" in rowCount){
            if(rowCount[grid[row][col]] === 3){
                console.log("Game Over!!! Player 2 Wins!");
            //    console.log(rowCount);
           //     console.log("winning row is:" + row);
                gameOver = true;
            }
        }
        else if ("o" in rowCount){
            if(rowCount[grid[row][col]] === 3){
                console.log("Game Over!!! Player 1 Wins!");
            //    console.log(rowCount);
           //     console.log("winning row is:" + row);
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
        if("x" in colCount){
            if(colCount["x"] === 3){
                console.log("Game Over!!  Player 2 Wins!");
                gameOver = true;
            }
        }
        else if ("o" in colCount){
            if(colCount["o"] === 3){
                console.log("Game Over!!!  Player 1 Wins!");
             //   console.log("here5")
                gameOver = true;     
            }
            
        }
       
    }
   // check if there are winning diagonals
    if((grid[0][0]===grid[1][1]) && (grid[1][1]===grid[2][2])||(grid[0][2]===grid[1][1]) && (grid[1][1]===grid[2][0]))
    {
        if(grid[1][1] === "o")
        {
            console.log("Game Over!! Player 1 Wins!");
           // console.log("on condition diagonal");
            gameOver = true;
        }
        else if( grid[1][1] === "x")
        {
            console.log("Game Over!! Player 2 Wins!");
            gameOver = true;
        }
    }
    
    //check if there is a draw condition
    var draw = false;
    var rowsFullCount = 0;
    for (var k = 0; k < grid.length; k++){
    if(grid[k].indexOf("_") === -1)
    {
        rowsFullCount += 1;     
    }
    if(rowsFullCount===3 && gameOver===false){            
            console.log("Draw, You Both Lose.  GAME OVER.");
            gameOver = true;
            draw = true;
    }


    }

    
}
//displayGrid(startGrid);
var play = function(){
    gameOver = false;
    var player = 1;
    var lastGrid = [];
    do{
    var userTurn = prompt(displayGrid(startGrid) +"\n Enter your turn, Player " + player, "RowNo,ColumnNo");
    if (userTurn !== null || userTurn !== NaN){
        var rowNo = parseInt(userTurn.charAt(0));  // this assumes someone enters in correct format - a check is needed to ensure the entry isn't too long here
        var colNo = parseInt(userTurn.charAt(2));
        var nextInput = gridInput([rowNo, colNo], startGrid, player);
        if (nextInput !== false)
                lastGrid = nextInput;
    }
    else
    {
        nextInput = false;
    }
    
    }
    while(nextInput===false);
    // while the user continues to enter an invalid command a pop-up will come up again
  //  alert(displayGrid(nextInput));
    while(gameOver === false)
    {
       //ask user for input and display grid
       //change player
       if (player === 1)
         player = 2;
        else
            player = 1;
       //check if game over / drawn
       do{
              userTurn = prompt(displayGrid(lastGrid) +"\n Enter your turn, Player " + player, "RowNo,ColumnNo");
              if (userTurn !== null || userTurn !== NaN){
              rowNo = parseInt(userTurn.charAt(0));
              colNo = parseInt(userTurn.charAt(2));
              nextInput = gridInput([rowNo, colNo], startGrid, player); 
              if (nextInput !== false)
                lastGrid = nextInput;
              }
              else
              {
                nextInput = false;
              }
          }
          while(nextInput ===false);
          // while the user continues to enter an invalid command a pop-up will come up again
          isGameOver(nextInput);
          //
      }
    //display result + ask if they want to play again?
    //displayGrid(startGrid);
   // alert("Game Over!! Player " + player + " wins!"); 
    
}

play();