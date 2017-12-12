import React from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CategoryForm from './CategoryForm.jsx';
import PhraseForm from './PhraseForm.jsx';
import Animation from './Animation.jsx';
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

  activateVideo(context){
    //console.log();
    ////// Okay, I think you're gonna need to think harder on this to make it work.
    ///Try this one.
    //////https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76
    //console.log(element.props.children[2].getContext()); //< video
    //console.log(context.refs.canvas_output);
    //console.log(canvas);
    //console.log(element.props.children[1]); < canvas1
    //console.log(element.props.children[2]);
    //console.log(this.refs.output);
    /*var outputCanvas = element.props.children[2];
    output = outputCanvas.getContext('2d');
    bufferCanvas = element.props.children[1];
    buffer = bufferCanvas.getContext('2d');
    video = element.props.children[0];
    width = outputCanvas.width;
    height = outputCanvas.height,interval;

    function processFrame() {
      buffer.drawImage(video, 0, 0);

          // this can be done without alphaData, except in Firefox which doesn't like it when image is bigger than the canvas
      var image = buffer.getImageData(0, 0, width, height),
      imageData = image.data,
      alphaData = buffer.getImageData(0, height, width, height).data;

      for (var i = 3, len = imageData.length; i < len; i = i + 4) {
      imageData[i] = alphaData[i-1];
      }

      output.putImageData(image, 0, 0, 0, 0, width, height);
    }*/
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
        <Animation/>
      )
      //this.activateVideo(userPrompt);
      //console.log(userPrompt);
    }

    //          <img src= 'ykw_Placeholder.png' alt="Profile_Example"/>

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
