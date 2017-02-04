import React from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class CategoryForm extends TrackerReact(React.Component) {

    constructor(props) {
      super(props);
      this.state = {value: '', suggestions: '', selectedSuggestions: ''};
      //binds handleChange function to any event of the category input bar
      this.handleChange = this.handleChange.bind(this);
      //bings handleKeyPress event to any keyboard event when input is focused on
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }


    handleKeyPress(e) {
      if (e.keyCode == '38') {
          var selected = this.state.selectedSuggestions;
          selected[0]=!selected[0];
          console.log("keyup result = " + this.state.selectedSuggestions);
          //partial functionality without setState line below. Not good.
          this.setState({selectedSuggestions: selected});
      }
      else if (e.keyCode == '40') {
        //triggered if "down" arrow key is pressed
          console.log("key dah woon");
      }
    }

    //handles changes in the upper category form input
    handleChange(e) {
      var input = e.target.value.trim();
      var reg = new RegExp('^' + input, 'ig'); // creates regular expression denoting all truncations of input
      var autoCompleteQuery = Categories.find({text: reg}, {limit:5}).fetch();
      //create empty arrays to push data into
      var results = [];
      var selectedSuggestions = [];
      //fill the results and selectedSuggestions arrays with user-typed data
      autoCompleteQuery.map(
        function(i){
          results.push((i.text.toString()));
          selectedSuggestions.push(false);
        }
      );
      //if input, change states to input. if not, set states to "".
      if (!input){
        this.setState({suggestions: "", selectedSuggestions: ""});
      } else {
        this.setState({suggestions: results, selectedSuggestions: selectedSuggestions});
      }
    }//end of handChange(){}

    categories(searchKey){
      return Categories.find(searchKey).fetch();
    }

  selectCategory(event){
    event.preventDefault();
    var text = this.refs.currentCategory.value.trim();
    Session.set("currentCategory", text);
    var dbText = Categories.findOne({text: text});
    //Modal.show("categoryModal");
    //console.log(dbText===text);
    if (!dbText){
    Modal.show("categoryModal");
    }
  }

  render(){
    //to avid throwing an error, I have to make sure that state.suggesitons HAS something there
    //otherwise, trying to use it will fuck shit up.
    if(this.state.suggestions){
      var selected = this.state.selectedSuggestions;
      var suggestionsArray = this.state.suggestions;
      var suggestionsLeng = suggestionsArray.length;
      //console.log(suggestionsArray[0]);
      console.log("There are " + suggestionsLeng + " suggestions for what is typed in the following array: " + suggestionsArray);
      suggestions = (
        <div className="suggestionsContainer">
          {
            suggestionsArray.map(function(suggestion, index){
              return <p3 key={index} className={"selected" + selected[index]}>
                {suggestion + " " + selected[index]}
              </p3>
            })
          }
        </div>
      );
    } else {
      console.log("nothing has been typed");
      suggestions=(
        <div></div>
      );
    }

    return (
            <form className="select-category"
              onSubmit={this.selectCategory.bind(this)}>
              <label>
              <input type="text"
                ref="currentCategory"
                placeholder="Web designer"
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}/>
              {suggestions}
              </label>
          </form>
        )
    }
}


{/*value={this.state.value}*/}
{/*
// this was found in the body of the app
  blurTest(event){
    if(document.activeElement !== this) {
        console.log("blurred");
    }
  }
  */}
{/* ///the following can be put right below the this.selectCategory.bind(this) attribute of <form>
  onBlur={this.selectCategory.bind(this)*/}
