import React from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CategoryForm from './CategoryForm.jsx';
import PhraseForm from './PhraseForm.jsx';
//import PhraseSingle from './PhraseSingle.jsx';
//import PhraseSingleImage from './PhraseSingleImage.jsx';
import PhraseSingleImage from './PhraseSingleImage.jsx';
import PhraseSingleNoImage from './PhraseSingleNoImage.jsx';
import SortDash from './SortingDashboard.jsx';

export default class MuggleWrapper extends TrackerReact(React.Component) {

  constructor(){
    super();

    this.state = {
      subscription: {
        phrases: Meteor.subscribe("allPhrases"),
        phrases: Meteor.subscribe("allCategories")
      },
      sortingDashboard: false,
      picsFirst: false
    }
  }

  setPicsFirst(){
    this.setState({picsFirst: true});
  }

  setPicsLast(){
    this.setState({picsFirst: false});
  }

  componentWillUnMount(){
    this.state.subscription.phrases.stop();
    console.log('unmount');
  }

  phrases(searchKey){
    var picsFirst = this.state.picsFirst;
    if (picsFirst === true){
      var picsNum = -1;
    } else {
      picsNum = 1;
    }
    return Phrases.find(searchKey, {sort: {hasImage: picsNum, createdAt: -1}}).fetch();
  }

  categories(){
    return Categories.find().fetch();
  }
  //while inside this App class, this addPhrase function can not be referred to as this.addPhrase


  render(){
    //THIS PART is about displaying the Phraseform
    let userPrompt;
    Session.set("sortingDashboard", false);
    var currentCat = Session.get("currentCategory");
    var reactiveCat = Session.get("reactiveCategory");
    //Toggle user prompt display conditonal
    if (currentCat && reactiveCat === currentCat){
      userPrompt =
        (<span>
          when...
          <PhraseForm setPicsLast = {this.setPicsLast.bind(this)}/>
        </span>)
    } else {
      userPrompt = (
        <div></div>
      )
    }

    //THIS PART is about displaying the tiles
    if (currentCat && reactiveCat == currentCat){
      let withpicture = Phrases.find({currentCategory: reactiveCat, hasImage: true}).count();
      let withoutpicture = Phrases.find({currentCategory: reactiveCat, hasImage: false}).count();
      let phraseResultCount = Phrases.find({currentCategory: reactiveCat}).count();
      if (withoutpicture >=1 && withpicture >=1){
        Session.set("sortingDashboard", true);
      } else {
        Session.set("sortingDashboard", false);
      }
      if (phraseResultCount>=1){
        results = (
            <div>
              {this.phrases({currentCategory: reactiveCat}).map( (phrase)=>{
                  if(phrase.imageUrl){
                    return <PhraseSingleImage key={phrase._id} phrase={phrase} />
                  }
                  else {
                    return <PhraseSingleNoImage key={phrase._id} phrase={phrase} />
                  }
                }
              )}
            </div>
        )
      }
      else {
        Session.set("sortingDashboard", false);
        //console.log("none")
        results = (
          <h1>
              <div>Nobody seems to have made any phrases for this category.</div>
              <p1>Type one in to be the first!</p1>
          </h1>
          ///http://getbootstrap.com/components/
        )
      }
    }
    else {
      Session.set("sortingDashboard", false);
      results = (
        <h1>
          <span className="label label-info">
            Try typing something.
          </span>
        </h1>
      )
    }

    //sortDash 'Display or Not' logic
    if(Session.get("sortingDashboard") === true){
      var sortDash = (
          <SortDash
            picsFirst = {this.state.picsFirst}
            setPicsFirst = {this.setPicsFirst.bind(this)}
            setPicsLast = {this.setPicsLast.bind(this)}
          />
      );
    } else {
      var sortDash = (
        <div></div>
      );
    }

    return(
      <div className="category-phrase-dashboard">
        <h1>You know you're a &nbsp; <CategoryForm/>
        {userPrompt}
        </h1>
        <div className = "phrases">
        {sortDash}
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
