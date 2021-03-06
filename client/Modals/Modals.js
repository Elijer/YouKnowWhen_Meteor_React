/*function acceptCategory(){
  console.log(Session.get("currentCategory"));
  Meteor.call('addCategory', Session.get("currentCategory"));
}*/

Template.categoryModal.helpers({
  'currentCategory': function(){
    return Session.get("currentCategory");
  }
})


Template.categoryModal.events({
  'click #acceptCategory': function(){
    //return console.log("modal success!");
    //console.log(Session.get("currentCategory"));
    return Meteor.call("addCategory", Session.get("currentCategory"));
  },
  'click #cancelCategory': function(){
    Session.set("currentCategory", "");
  }
})
