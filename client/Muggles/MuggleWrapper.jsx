import React from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CategoryForm from './CategoryForm.jsx';
import PhraseForm from './PhraseForm.jsx';
import Animation from './Animation.jsx';
import PhraseSingleImage from './PhraseSingleImage.jsx';
import PhraseSingleNoImage from './PhraseSingleNoImage.jsx';
import SortDash from './SortingDashboard.jsx';

export default class MuggleWrapper extends TrackerReact(React.Component) {

  constructor(){
    super();

    this.state = {
      subscription: {
        phrases: Meteor.subscribe("allPhrases"),
        phrases: Meteor.subscribe("allCategories"),
      },
      sortingDashboard: false,
      picsFirst: false,
      placeHolder: '...',
      videoReady: false
    }
  }

  componentDidMount(){

    this.setState({videoReady: true});
    this.refs.animationRef.refs.videoRef.play();
    this.refs.animationRef.refs.animationTwoRef.refs.animationTwoVideoRef.play();
    //$('#testvid').play();
  }

/*
  initiateOrientation(){
    var context = this;
    setTimeout(context.setState({placeHolder: 'Gardener'}), 400);
    setTimeout(context.setState({placeHolder: 'Web Designer'}), 800);
  }
  */


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

  render(){
    let userPrompt;
    var videoReady = this.state.videoReady;
    var placeHolder = 'Web Designer';
    window.localStorage.setItem('test', 'testyyah');
    console.log(window.localStorage.getItem('test'));
    //THIS PART is about displaying the Phraseform
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
          <Animation ref = "animationRef"/>
        )
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
        <h1>You know you're a &nbsp; <CategoryForm placeHolder = {this.state.placeHolder}/>
        {userPrompt}
        </h1>
        <div className = "phrases">
        {sortDash}
        {results}
        </div>
      </div>
    )
  }
}
