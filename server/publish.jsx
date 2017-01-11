Resolutions = new Mongo.Collection("resolutions");
Categories = new Mongo.Collection("categories");

Meteor.publish("allResolutions", function(){
  return Resolutions.find();
  //return Resolutions.find({complete:false});
  //return Resolutions.find({complete:true});
  //^Publish the data you want
});

Meteor.publish("allCategories", function(){
  return Categories.find();
});
