Phrases = new Mongo.Collection("phrases");
Categories = new Mongo.Collection("categories");

Meteor.publish("allPhrases", function(){
  return Phrases.find();
  //return Phrases.find({complete:false});
  //return Phrases.find({complete:true});
  //^Publish the data you want
});

Meteor.publish("allCategories", function(){
  return Categories.find();
});
