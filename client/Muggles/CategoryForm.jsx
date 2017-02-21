import React from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AutoSuggest from '../autoComplete/AutoSuggest.jsx';
import AutoSuggest2 from '../autoComplete/AutoSuggest2.jsx';

export default class CategoryForm extends TrackerReact(React.Component) {

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

  render(){
    var placeholder;
    var currentCat = Session.get("currentCategory");
    currentCat ? placeholder = currentCat:placeholder = "Web Designer"
    //these three variables are for feeding the AutoSuggest component in the return()
    var autosuggestFood = this.state.food;
    var keyCount = this.state.keyCount;
    var autosuggestActive = this.state.suggestionsOn;

    return (
            <form className="select-category"
              onSubmit={this.selectCategory.bind(this)}>
              <label>
              <input type="text"
                ref="currentCategory"
                placeholder={placeholder}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}/>
              <AutoSuggest2 input={autosuggestFood} count={keyCount} active={autosuggestActive}/>
              </label>
          </form>
        )
    }
}


{/*value={this.state.value}*/}
{/*
          <img src={Session.get("image")} alt="Smiley face"/>

// this was found in the body of the app
  blurTest(event){
    if(document.activeElement !== this) {
        console.log("blurred");
    }
  }
  */}
{/* ///the following can be put right below the this.selectCategory.bind(this) attribute of <form>
  onBlur={this.selectCategory.bind(this)*/}

{/*
  if (array[0]=false){
    this.refs.currentCategory.blur();
  }
  */}

{  /*categories(searchKey){
    return Categories.find(searchKey).fetch();
  }*/}
