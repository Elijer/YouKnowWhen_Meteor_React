Meteor.methods({
  addPhrase(phrase, categoryName) {
    Phrases.insert({
      text: phrase,
      currentCategory: categoryName,
      complete: false,
      createdAt: new Date()
    });
  },
  togglePhrase(id, status){
    Phrases.update(id, {
      $set: {complete: !status}
    });
  },
  deletePhrase(id){
    Phrases.remove(id)
  },
  addCategory(categoryName){
    Categories.insert({
      text: categoryName,
      createdAt: new Date()
    })
  }
});
