import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class PhraseForm extends Component {

  addResolution(event){
    event.preventDefault();
    var text = this.refs.newPhrase.value.trim();

    Meteor.call('addResolution', text, ()=>{
      this.refs.newPhrase.value = "";
    });
    //this.refs.resolution.value = "";
  }

  render(){
    return (
        <div>
          <form className="new-phrase" onSubmit={this.addResolution.bind(this)}>
            <input type="text"
              ref="newPhrase"
              placeholder="..." />
          </form>
        </div>
      )
    }
  }
