import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SortDash extends TrackerReact(React.Component) {

  constructor(props){
    super(props);
    this.state = {
      picsFirst: props.picsFirst
    }
  }

  picsFirst(){
    this.setState({picsFirst: true});
    Session.set('picsFirst', true);
  }

  picsLast(){
    this.setState({picsFirst: false});
    Session.set('picsFirst', false);
  }

  render(){
    var picButton;
    var noPicButton;
    var picSesh = Session.get('picsFirst');
    var picsState = this.state.picsFirst;
    if (picSesh != picsState){
      picState = picSesh;
    }
    if (picsState){
      picButton = "selectedPicButton";
      noPicButton = "unSelectedPicButton";
    } else {
      picButton = "unSelectedPicButton";
      noPicButton = "selectedPicButton";
    }

    return(
      <div className="btn-group" id = "btnPicSort" role="group" aria-label="ButtonsYo">
        <button type="button" className="btn btn-lg" id = {picButton} onClick = {this.picsFirst.bind(this)}>Pics First</button>
        <button type="button" className="btn btn-lg" id = {noPicButton} onClick = {this.picsLast.bind(this)}>No Pics First</button>
      </div>
    )
  }
}
