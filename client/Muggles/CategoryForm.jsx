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
      //console.log('up.');
      tempArray = [];
      var array = this.state.selectedSuggestions;
      /////////
      if (e.keyCode == '38') {
        var array = this.state.selectedSuggestions;

        for (var i = array.length-1; i>=0; i--){
          if(i<=array.length-2){
            tempArray[i] = array[i+1];
          } else {
            tempArray[i] = array[0];
          }
        }

        this.setState({selectedSuggestions: tempArray});
      }
      else if (e.keyCode == '40') {
        for (var i = array.length-1; i >= 0; i--){
          if(i>0){
            tempArray[i] = array[i-1];
          } else {
            tempArray[i] = array[array.length-1]
          }
        }
        this.setState({selectedSuggestions: tempArray});
      }

      if (tempArray[0] === true){
        e.target.value = "";
      } else {
        for (var i = 0; i <= tempArray.length; i++){
          if(tempArray[i] === true){
              e.target.value = this.state.suggestions[i-1];
              e.target.setSelectionRange(11,11);
            }
          }
      }
    }

    //handles changes in the upper category form input
    handleChange(e) {
      var input = e.target.value.trim();
      var reg = new RegExp('^' + input, 'ig'); // creates regular expression denoting all truncations of input
      var numOfResults = 5;
      var autoCompleteQuery = Categories.find({text: reg}, {limit:numOfResults}).fetch();
      //create empty arrays to push data into
      var results = [];
      var selectedSuggestions = [];
      selectedSuggestions[0] = true;
      //fill the results and selectedSuggestions arrays with user-typed data
      autoCompleteQuery.map(
        function(i, index){
          results.push((i.text.toString()));
          selectedSuggestions[index+1] = false;
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

    resetForm(){
      event.preventDefault();
      var selected = this.state.selectedSuggestions;
      console.log("asdfasf");
    }

    selectCategory(event){
      event.preventDefault();
      var text = this.refs.currentCategory.value.trim();
      Session.set("currentCategory", text);
      var dbText = Categories.findOne({text: text});
      //Modal.show("categoryModal");
      //console.log(dbText===text);
      if (!dbText){
      //Modal.show("categoryModal");
      filepicker.pick({
          mimetype: 'image/*',
          container: '',
          services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
        },
        function(Blob){
          var blobString = JSON.stringify(Blob);
          var blobObject = JSON.parse(blobString);
          //console.log(blobString);
          console.log(blobObject);
          Session.set("image", blobObject.url);
        },
        function(FPError){
          console.log(FPError.toString());
        });
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
              return <p3 key={index} className={"selected" + selected[index+1]}>
                {suggestion}
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
              <img src={Session.get("image")} alt="Smiley face"/>
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
