Meteor.methods({
  addResolution(resolution, categoryName) {
    Resolutions.insert({
      text: resolution,
      currentCategory: categoryName,
      complete: false,
      createdAt: new Date()
    });
  },
  toggleResolution(id, status){
    Resolutions.update(id, {
      $set: {complete: !status}
    });
  },
  deleteResolution(id){
    Resolutions.remove(id)
  },
  addCategory(categoryName){
    Categories.insert({
      text: categoryName,
      createdAt: new Date()
    })
  }
});
