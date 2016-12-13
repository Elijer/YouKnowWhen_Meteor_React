import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class ResolutionsForm extends Component {

  addResolution(event){
    event.preventDefault();
    var text = this.refs.resolution.value.trim();

    Meteor.call('addResolution', text, ()=>{
      this.refs.resolution.value = "";
    });
    //this.refs.resolution.value = "";
  }

  render(){
    return (
      <form className="new-resolution" onSubmit={this.addResolution.bind(this)}>
        <h3> You know you're a &nbsp;
        <input type="text"
          ref="resolution"
          placeholder="Redneck" />
        &nbsp; when...</h3>
      </form>
    )
  }
}
