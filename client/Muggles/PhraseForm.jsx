import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class PhraseForm extends Component {

  addPhrase(event){
    event.preventDefault();
    var dis = this;
    var text = this.refs.newPhrase.value.trim();
    if (text === ''){
      return;
    } else {
    var currentCat = Session.get("currentCategory");
    var dbText = Phrases.findOne({currentCategory: currentCat, text: text});
    Meteor.call("isAppropro", text, function(err, data){
      if (err){console.log("error")}
      if (data === false){
        Modal.show("rejectionModal");
        dis.refs.phrase.value = "";
      } else {
        if (!dbText){
          Modal.show("phraseSubmissionHome");
          Meteor.call('addPhrase', text, currentCat);
          Session.set('picsFirst', false);
        } else {
        Modal.show("repeatPhrase");
        }
      }
    });
    }
  }

  render(){
    return (
        <span>
          <form className="new-phrase" onSubmit={this.addPhrase.bind(this)}>
            <input type="text"
              ref="newPhrase"
              placeholder="add new phrase"
              maxLength="45"
              list="yo"
              />
          </form>
        </span>
      )
    }
  }
