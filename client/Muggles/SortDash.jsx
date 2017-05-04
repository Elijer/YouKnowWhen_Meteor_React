import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SortDash extends TrackerReact(React.Component) {

  constructor(props){
    super(props);
    this.state = {
      picsFirst: this.props.picsFirst
    }
  }

  flip(){
    this.props.flipOrder();
  }

  setPicsFirst(){
    this.props.setPicsFirst();
  }

  setPicsLast(){
    this.props.setPicsLast();
  }

  render(){
    var order = this.props.picsFirst;
    picButton = 'selected-' + order;
    noPicButton = 'selected-' + !order;

    return(
      <div className="btn-group" id = "btnPicSort" role="group" aria-label="ButtonsYo">
        <button type="button" className="btn btn-lg" id = {picButton} onClick = {this.setPicsFirst.bind(this)}>Pics First</button>
        <button type="button" className="btn btn-lg" id = {noPicButton} onClick = {this.setPicsLast.bind(this)}>No Pics First</button>
      </div>
    )
  }
}
