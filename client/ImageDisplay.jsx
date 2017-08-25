import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ImageDisplay extends TrackerReact(React.Component) {
  constructor(){
    super();

    this.state = {
      subscription: {
        phrases: Meteor.subscribe("allPhrases"),
        phrases: Meteor.subscribe("allCategories")
      }
    }
  }

  phrases(key){
    return Phrases.findOne(key);
  }

  render(){
    var id = this.props.id;
    var results = this.phrases({_id: id});
    if (results){
      console.log(results._id);
    }
    return (
        <div className = "about">
          <img src= 'Profile_Example.jpg' alt="Profile_Example"/>
        </div>
    )
  }
}
