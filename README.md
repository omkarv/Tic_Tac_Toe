Readme - Updated 12/1/2014
----------------------------

This folder contains various tic-tac-toe related projects.  

Description of files
---------------------

A) source_COM.js, tic_tac_toe_COM.html & tic_tac_toe_COM.css form a player vs a computer AI  in a tic tac toe game, using javascript.
They use the jQuery v2.0.3 min.js Javascript library. 
comMove.js is a seperate file containing the comMove function, which is present in the source_COM.js code 

B) source.js, tic_tac_toe.html & tic_tac_toe.css form (a very early dev stage of)  a tic tac toe game, using javascript.
They use the jQuery v2.0.3 min.js Javascript library 

C) tic_tac_toe.js & tic_tac_toe2.js (the improved version!) are standalone JS alert pop-up based 2-player turn based games, that can be placed within a html script to be played, otherwise use JSfiddle

D) meteor:  this folder contains the files for the project deployed on tic-tac-toe.meteor.com

Methods used by COM AI
----------------------------------
3 strategies move strategies are used.  rule 1 has greater priority over rule 2, which in turn has greater priority over rule 3

1)  If a winning move is possible it will be made

2)  If an winning move is possible for the opponent, it will be blocked.  There is no prioritsation of blocking-win moves at this stage.

3)  If there is a row, column or diagonal with one other COM piece "X", AND no player pieces "O", a move will be made at random into either of the other two spaces

If none of the above strategies can be applied, the default COM move shall be random.  This will be the case, for example, when the grid is empty.

Description of functions
----------------------------------
to follow
