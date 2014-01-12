//server code

//code to run at startup of server
  Meteor.startup(function () {

   if (GlobalGrid.find().count() === 0){
      GlobalGrid.insert({type: "grid", value : [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']], 
        currentPlayer : 1, winsCount : [0,0]});
    }
  });
