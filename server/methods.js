Meteor.methods({
  addPhrase(phrase, categoryName) {
    Phrases.insert({
      text: phrase.toLowerCase(),
      currentCategory: categoryName,
      complete: false,
      createdAt: new Date(),
      imageUrl: "",
      hasImage:false
    });
  },
  addImage(id, newUrl){
    Phrases.update(id, {
      $set: {imageUrl: newUrl, hasImage: true}
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
  isAppropro(input){
    if(blacklistPass(input) === false){
      return false;
    } else {
      return true;
    }
  },
  addCategory(categoryName){
      Categories.insert({
        text: categoryName.toLowerCase(),
        createdAt: new Date()
      })
  }
});
