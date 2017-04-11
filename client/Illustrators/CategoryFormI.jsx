import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AutoSuggest from '../autoComplete/AutoSuggest.jsx';

export default class CategoryFormI extends TrackerReact(React.Component) {

  constructor(props) {
    super(props);
    this.state = {suggestionsOn: false, food: '', keyCount: 0};
    //binds handleChange function to any event of the category input bar
    this.handleChange = this.handleChange.bind(this);
    //bings handleKeyPress event to any keyboard event when input is focused on
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  //handleKeyPress() and handleChange() are both for feeding the AutoSuggest component
  //both channel their data through state.
  handleKeyPress(e) {
    if (e.keyCode == '40') {
      var countIncrement = this.state.keyCount+1;
      this.setState({keyCount: countIncrement});
      e.target.value = Session.get("currentSelection");
      Session.set("reactiveCategory", e.target.value);
    }
  }

  handleChange(e){    //handles changes in the upper category form input
    this.setState({suggestionsOn: true, keyCount: 0});
    var input = e.target.value.trim();
    !input ? this.setState({food: ''}):this.setState({food: input});
    Session.set("reactiveCategory", input);
  }

  selectCategory(event){
    event.preventDefault();
    this.setState({suggestionsOn: false});
    var dis = this;
    var text = this.refs.currentCategory.value.trim();
    if (text === ''){
      return;
    } else {
    Session.set("currentCategory", text);
    var dbText = Categories.findOne({text: text});
    Meteor.call("isAppropro", text, function(err, data){
      if (err){console.log("error")}
      if (data === false){
        Modal.show("rejectionModal");
        Session.set("currentCategory", "");
        dis.refs.currentCategory.value = '';
      } else {
        if (!dbText) Modal.show("categoryModal");
      }
    });
    }
  }

  blurTest(event){
    console.log("blurred");
  }

  render(){
    var placeholder;
    var currentCat = Session.get("currentCategory");
    currentCat ? placeholder = currentCat:placeholder = "Illustrator"
    //these three variables are for feeding the AutoSuggest component in the return()
    var autosuggestFood = this.state.food;
    var keyCount = this.state.keyCount;
    var autosuggestActive = this.state.suggestionsOn;
    //////
    return (
            <form className="select-category"
              onSubmit={this.selectCategory.bind(this)}
              onBlur={this.selectCategory.bind(this)}>

              <label>

                <input type="text"
                  ref="currentCategory"
                  placeholder={placeholder}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyPress}/>

                <AutoSuggest input={autosuggestFood}
                  count={keyCount}
                  active={autosuggestActive}/>

              </label>

            </form>
        )
    }
}
