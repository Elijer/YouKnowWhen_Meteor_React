Meteor.methods({
  addResolution(resolution) {
    Resolutions.insert({
      text: resolution,
      complete: false,
      createdAt: new Date()
    });
  }
})
