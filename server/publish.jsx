Resolutions = new Mongo.Collection("resolutions");

Meteor.publish("allResolutions", function(){
  return Resolutions.find();
  //return Resolutions.find({complete:false});
  //return Resolutions.find({complete:true});
  //^Publish the data you want
});
