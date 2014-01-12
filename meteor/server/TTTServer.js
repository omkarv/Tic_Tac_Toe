//server code
  Meteor.startup(function () {

   if (GlobalGrid.find().count() === 0){
      GlobalGrid.insert({type: "grid", value : [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']], 
        currentPlayer : 1, winsCount : [0,0]});
    }

    // code to run on server at startup
  });
  // these are sever variables
 // var startPlayer = 1;           //  Player taking first turn  
  //var currPlayer = startPlayer;  //  start with Player 1, first time around
  //var winCount = [0,0]; // Player 1 and 2 win counts
  //var gameFinished = false;
  //var initGrid = [['x', '_', '_'], // row 1
    //             ['_', '_', '_'], // row 2
      //           ['_', '_', 'x']];


  //Meteor.setInterval(function(){Test.update({_id:Test.findOne({type:"grid"})._id}, {$set: {value: initGrid}});}, 10000);