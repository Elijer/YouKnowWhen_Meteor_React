import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class PhraseFormI extends Component {

  addPhrase(event){
    event.preventDefault();
    var text = this.refs.newPhrase.value.trim();
    Meteor.call('addPhrase', text, Session.get("currentCategory"));
    //this.refs.phrase.value = "";
  }

  render(){
    return (
        <span>
          <form className="new-phrase" onSubmit={this.addPhrase.bind(this)}>
            <input type="text"
              ref="newPhrase"
              placeholder="add new phrase"
              maxLength="45"
              />
          </form>
        </span>
      )
    }
  }
