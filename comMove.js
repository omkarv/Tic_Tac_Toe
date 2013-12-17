var grid = [["x", "_", "_"], ["_","o","o"], ["_", "_", "x"]];

    var comMove = function(grid) // function to determine the COMs next move, outputs next move into grid object and outputs the COM move co-ordinates in a format compatible with  the existing format
    //contd... used to update grid
  {
    //the following lists hold the COMs speculative moves, with prime Target holding moves that would win the game, seconTarget holding moves that would prevent the opponent from winning
    //and tert target, which holds targets that cause the COM to build existing groupings

     var primeTarget = []; // prime target is to get 3 in a row!
     var seconTarget = []; //empty object to hold index values (row, column) of next best move to block opponent if 2 in a row, column or diagonal.. if this is empty try next strategy
     var tertTarget = []; //build on existing groupings is the third strategy, i.e. if one theres one "x" in a row or column, and no opponent pieces, place a piece in that row or column (this hasn't been done for diagonals yet)
     // if the prospective moves doesn't fall into any of the criteria above, e.g. at the start of a game, a random move is made
     

     //next bit of code sums the different types of marks made on each row
     for(var row in grid)
     {
         var rowCount = {};  
         for(var col in grid[row])
         {
             if(!(grid[row][col] in rowCount))
             {
                 rowCount[grid[row][col]] = [parseInt(col), 1]; //e.g. { "x" : [ sum of index values, count]}       
             }
             else
             {
                 rowCount[grid[row][col]][1] += 1;
                 rowCount[grid[row][col]][0] += parseInt(col);
             }
         }
         var parseRow = parseInt(row);

         //this code aims to block opponent threatening moves on a row basis
         if("o" in rowCount)
         {
             //this code will block opponent threatening moves on rows where there are two opponent pieces, and no COM pieces 
             if(rowCount["o"][1] === 2 && !("x" in rowCount))
             {      
                
                 if(rowCount["o"][0] === 1)
                     seconTarget = [parseRow, 2];
                 else if(rowCount["o"][0] === 2)
                     seconTarget = [parseRow, 1];
                 else if(rowCount["o"][0] === 3)
                     seconTarget = [parseRow, 0];
             }
         }
         //this code aims to make winning moves on a row basis (i.e. if there are 2 COM pieces in a row, and a blank space)
         else if ("x" in rowCount)// 
         {
           if(rowCount["x"][1] === 2) 
           {
             if(rowCount["x"][0] === 1)
                     primeTarget = [parseRow, 2];
                 else if(rowCount["x"][0] === 2)
                     primeTarget = [parseRow, 1];
                 else if(rowCount["x"][0] === 3)
                     primeTarget = [parseRow, 0];
           }
           //this code aims to make grouping moves, when there are no winning moves or block-win moves to be made
           else if(rowCount["x"][1] === 1)
           {
                if(rowCount["x"][0] === 0)
                     tertTarget = [parseRow, Math.floor(Math.random()*2+1)]; // randomly assign to el 1 or 2
                 else if(rowCount["x"][0] === 1)
                     tertTarget = [parseRow, 2*Math.floor(Math.random()*2)];   // randomly assign to el 0 or 2
                 else if(rowCount["x"][0] === 2)
                     tertTarget = [parseRow, Math.floor(Math.random()*2)];  // randomly assign to 0 or 1
           }
               
         }
     }
  
    // count columns for moves made
    for (var columns = 0; columns < 3; columns++)
    {
     var colCount = {};
     for (var rows = 0; rows <3; rows++)
     {
        //console.log(grid);
         if(!(grid[rows][columns] in colCount))
         {
             colCount[grid[rows][columns]] = [parseInt(rows), 1];
         }
         else
         {
             colCount[grid[rows][columns]][0] += parseInt(rows);
             colCount[grid[rows][columns]][1] += 1;
         }
     }
     var parseCol = parseInt(columns);
     if("o" in colCount)
     {
          //check if there are columns with 2 o's and no x's, therefore a threat column.  Perform a block-win move.
       if(colCount["o"][1] === 2 && !("x" in colCount))
       {              
             if(colCount["o"][0] === 1)
                 seconTarget = [2, parseCol];
             else if(colCount["o"][0] === 2)
                 seconTarget = [1, parseCol];
             else if(colCount["o"][0] === 3)
                 seconTarget = [0, parseCol];
       }
       
     }
     //check for potential moves
     else if("x" in colCount)
     {
        // check if a winning move can be made, where there are 2 "x's in a column and a blank space
       if(colCount["x"][1] === 2) // if no of tokens in row is x
       {
         if(colCount["x"][0] === 1)
                 primeTarget = [2, parseCol];
             else if(colCount["x"][0] === 2)
                 primeTarget = [1, parseCol];
             else if(colCount["x"][0] === 3)
                 primeTarget = [0, parseCol];
             else
                 console.log("Something's gone wrong with the index summing");
       }
       //check if a grouping move can be made, where there is an x, and no opponent pieves
       else if(colCount["x"][1] === 1)
       {//relegate to tertiTarget
            if(colCount["x"][0] === 0)
                 tertTarget = [Math.floor(Math.random()*2+1), parseCol]; // randomly assign to el 1 or 2
             else if(colCount["x"][0] === 1)
                 tertTarget = [2*Math.floor(Math.random()*2), parseCol];   // randomly assign to el 0 or 2
             else if(colCount["x"][0] === 2)
                 tertTarget = [Math.floor(Math.random()*2),parseCol];  // randomly assign to el 0 or 1
       }
     }
    }
// check diagonals for potential winning moves
    if((grid[0][0]===grid[2][2]) && (grid[0][2]==="x")&&(grid[1][1]==="_"))
     {
         primeTarget = [1,1];
     }
         
     if((grid[0][2]===grid[2][0])&&(grid[0][2]==="x")&&(grid[1][1]==="_"))
     {
         primeTarget = [1,1];
     }
         
     if(grid[1][1]==="x")
     {
         if(grid[0][0] === "x" && grid[2][2] === "_")
             primeTarget = [2,2];
         else if(grid[0][2] === "x" && grid[2][0] === "_")
             primeTarget = [2,0];
         else if(grid[2][0] === "x" && grid[0][2] === "_")
             primeTarget = [0,2];
         else if(grid[2][2] === "x" && grid[0][0] === "_")
             primeTarget = [0,0];
     }   

   // check if there are any threat diagonals 6 combinations, and play a block-win move
     if((grid[0][0]===grid[2][2]) && (grid[0][2]==="o")&&(grid[1][1]==="_"))
     {
         seconTarget = [1,1];
     }
         
     if((grid[0][2]===grid[2][0])&&(grid[0][2]==="o")&&(grid[1][1]==="_"))
     {
         seconTarget = [1,1];
     }
         
     if(grid[1][1]==="o")
     {
         if(grid[0][0] === "o" && grid[2][2] === "_")
             seconTarget = [2,2];
         else if(grid[0][2] === "o" && grid[2][0] === "_")
             seconTarget = [2,0];
         else if(grid[2][0] === "o" && grid[0][2] === "_")
             seconTarget = [0,2];
         else if(grid[2][2] === "o" && grid[0][0] === "_")
             seconTarget = [0,0];
     }   
   
   // this section outputs the result from the function in the following format:  [ updated grid object, move-coordinates, in string format compatible with jQuery function to update the DOM out of the function]
  // primaryTarget has > priority than SeconTarget etc.
      if(primeTarget.length !== 0)
      {
         grid[primeTarget[0]][primeTarget[1]] = "x"; // updating grid Object
         return [grid, '#' + (primeTarget[0]+1).toString() + (primeTarget[1]+1).toString()]; // return grid object, and move co-ordinates to update physical display of grid
      } 
      else if(seconTarget.length!==0)
      {
          grid[seconTarget[0]][seconTarget[1]] = "x";
          return [grid, '#' +  (seconTarget[0]+1).toString() + (seconTarget[1]+1).toString()];
      }
      else if(tertTarget.length!==0)
      {
          grid[tertTarget[0]][tertTarget[1]] = "x";
          return [grid, '#' + (tertTarget[0]+1).toString() + (tertTarget[1]+1).toString()];
      }
      else
      {
           // if no move can be made due to previous 3 strategies, e.g. when the grid is clear, randomise, and check if random input doesn't clash before setting as output // only run if target not already set
      //return grid in form of grid 
            var randOutput =[];
            var clash = true;
            while(clash === true) // clash remains true until the random move entered doesn't clash with a piece already in the grid
            {
            randOutput = [Math.floor(Math.random()*3),  Math.floor(Math.random()*3)];
            if (grid[randOutput[0]][randOutput[1]] === "_")
                clash = false;
            }
            grid[randOutput[0]][randOutput[1]] = "x";
            return [grid, '#' + (randOutput[0]+1).toString() + (randOutput[1]+1).toString()];
      }

  }
 
output = comMove(grid);
console.log(output);