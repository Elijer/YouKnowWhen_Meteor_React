import React from 'react';
import ReactDom from 'react-dom';
//imports everything from the node_modules/react folder and the node_modules/react-dom folder
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CategoryFormI from './CategoryFormI.jsx';
import PhraseFormI from './PhraseFormI.jsx';
import PhraseSingleI from './PhraseSingleI.jsx';

//These declarations can be found in the MuggleWrapper
//Phrases = new Mongo.Collection("phrases");
//Categories = new Mongo.Collection("categories");

export default class IllustratorWrapper extends TrackerReact(React.Component) {
  constructor(){
    super();

    this.state = {
      subscription: {
        phrases: Meteor.subscribe("allPhrases"),
        phrases: Meteor.subscribe("allCategories")
      }
    }
  }

  componentWillUnMount(){
    this.state.subscription.phrases.stop();
  }

  phrases(searchKey){
    return Phrases.find(searchKey).fetch();
  }

  categories(){
    return Categories.find().fetch();
  }
  //while inside this App class, this addPhrase function can no be referred to as
  //this.addPhrase

  render(){
    var currentCat = Session.get("currentCategory");
    var reactiveCat = Session.get("reactiveCategory");
    let userPrompt;
    if (currentCat){
      if(currentCat === reactiveCat){
        userPrompt = (
          <span>
            when...
            <PhraseFormI />
          </span>
        )
      }
    }
    else {
      userPrompt = (
        <div></div>
      )
    }

    let phraseResultCount = Phrases.find({currentCategory: Session.get("reactiveCategory")}).count();
    //console.log(Phrases.find({currentCategory: Session.get("currentCategory")}).count());
    if (Session.get("reactiveCategory")){
      if (phraseResultCount>=1){
        //console.log("one or more");
        results = (
          <ul className="phrases">
            {this.phrases({currentCategory: Session.get("reactiveCategory")}).map( (phrase)=>{
              //the illustrators page only return categories without images
                if(!phrase.imageUrl){
                  return <PhraseSingleI key={phrase._id} phrase={phrase} />
                }
              }
            )}
          </ul>
        )
      }
      else {
        //console.log("none")
        results = (
          <span className = "label label-default">
            <p1> Oops! Nobody seems to have made any phrases for this category. Type one in to be the first! </p1>
          </span>
          //http://getbootstrap.com/components/
        )
      }
    }
    else {
      results = (
        <span className="label label-info">
        <p1>(Please type in a category to begin.)</p1>
        </span>
      )
    }

    return(
      <div className="category-phrase-dashboard">
        <h1>You know you're a/an &nbsp; <CategoryFormI /> {userPrompt}</h1>
        {results}
      </div>
    )
    //whenever you use brackets like this inside of jsx it's to say "this is javascript"
  }
}
//App is the name of the component
//every react component needs a 'render(){ return()}' function.
//We need the 'return()' inside the render function so that the render function has output.
//Everything inside 'return()' needs a single top-level wrapper element
//So, return (<h1>Hi!</h1><h1>Hi!</h1> ) wouldn't work,
//but return (<div><h1>Hi!</h1><h1>Hi!</h1></div> would
/*
if(Meteor.isClient) {
  Meteor.startup(function(){
    ReactDom.render(<App />, document.getElementById("render-target"));
  });
}




if something is
1) going to be used more than once or
2) is it's own chunk of content, gets big
then make it a component
*/
