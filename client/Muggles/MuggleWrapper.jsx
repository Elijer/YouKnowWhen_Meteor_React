import React from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CategoryForm from './CategoryForm.jsx';
import PhraseForm from './PhraseForm.jsx';
import PhraseSingle from './PhraseSingle.jsx';

export default class MuggleWrapper extends TrackerReact(React.Component) {
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
  //while inside this App class, this addPhrase function can not be referred to as
  //this.addPhrase

  render(){
    let userPrompt;
    var currentCat = Session.get("currentCategory");
    var reactiveCat = Session.get("reactiveCategory");
    if (currentCat){
      if(currentCat === reactiveCat)
        userPrompt = (
          <span>
            when...
            <PhraseForm />
          </span>
        )
    }
    else {
      userPrompt = (
        <div></div>
      )
    }

    let phraseResultCount = Phrases.find({currentCategory: reactiveCat}).count();
    //console.log(Phrases.find({currentCategory: Session.get("currentCategory")}).count());
    if (reactiveCat){
      if (phraseResultCount>=1){
        //console.log("one or more");
        results = (
            <div>
              {this.phrases({currentCategory: reactiveCat}).map( (phrase)=>{
                  if(phrase.imageUrl){
                    return <PhraseSingle key={phrase._id} phrase={phrase} />
                  }
                }
              )}
            </div>
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
        <p1>(Please type in a category and press 'enter' to begin.)</p1>
        </span>
      )
    }

    return(
      <div className="category-phrase-dashboard">
        <h1>You know you're a &nbsp; <CategoryForm /> {userPrompt}</h1>
        <div className = "phrases">
        {results}
        </div>
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
