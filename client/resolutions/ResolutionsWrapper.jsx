import React from 'react';
import ReactDom from 'react-dom';
//imports everything from the node_modules/react folder and the node_modules/react-dom folder
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CategoryForm from './CategoryForm.jsx';
import PhraseForm from './PhraseForm.jsx';
import PhraseSingle from './PhraseSingle.jsx';

//import ResolutionsForm from './ResolutionsForms.jsx';

Resolutions = new Mongo.Collection("resolutions");

export default class ResolutionsWrapper extends TrackerReact(React.Component) {
  constructor(){
    super();

    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("allResolutions")
      }
    }
  }

  componentWillUnMount(){
    this.state.subscription.resolutions.stop();
  }

  resolutions(){
    return Resolutions.find().fetch();
  }
  //while inside this App class, this addResolution function can no be referred to as
  //this.addResolution

  render(){
    let userPrompt;
    if (Session.get("currentCategory")){
      userPrompt = (
        <h1> You know you're a &nbsp;
          <CategoryForm />
          when...
          <PhraseForm />
        </h1>
      )
    }
    else {
      userPrompt = (
        <div>
        <h1> You know you're a &nbsp; <CategoryForm /> </h1>
        <p3> (Please type in a category to begin.) </p3>
        </div>
      )
    }


    return(
      <div>
        {userPrompt}
        <ul className="resolutions">
          {this.resolutions().map( (resolution)=>{
            return <PhraseSingle key={resolution._id} resolution={resolution} />
          })}

        </ul>
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
