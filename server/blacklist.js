//Meteor.startup(function(){
  var blacklist = [
    "retard",
    "nigger",
    "faggot",
    "chink",
    "kike",
    "cunt",
    "spic",
    ];

  blacklistPass = function(string){
    var passTest = true;
    blacklist.map(function(i){
      if (string === i){
        passTest = false;
      }
    })
    return passTest;
  }
//});
