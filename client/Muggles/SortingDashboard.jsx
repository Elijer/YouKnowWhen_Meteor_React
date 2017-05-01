import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SortDash extends Component {

  picsFirst(){
      Session.set("picsFirst", true);
      console.log(Session.get('picsFirst'));
  }

  picsLast(){
    Session.set("picsFirst", false);
    console.log(Session.get('picsFirst'));
  }

  render(){
    return(
      <div className="btn-group" role="group" aria-label="ButtonsYo">
        <button type="button" className="btn btn-default" id = "picButton" onClick = {this.picsFirst}>Pics First</button>
        <button type="button" className="btn btn-default" id = "picButton" onClick = {this.picsLast}>No Pics First</button>
      </div>
    )
  }
}
