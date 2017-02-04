import React, {Component} from 'react';
import ReactDom from 'react-dom';
import autocompleteInput from '../autoComplete/autocompleteInput.jsx'

export default class CategoryForm extends Component {

    constructor(props) {
      super(props);
      this.state = {value: '', suggestions: '', selectedSuggestion: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }


    handleKeyPress(e){
      if (e.keyCode == '38') {
          //console.log("initial = " + this.state.selectedSuggestion);
          var selected = this.state.selectedSuggestion;
          selected[0]=!selected[0];
          //console.log(this.state.selectedSuggestion[0]);
          //console.log("result = " + this.state.selectedSuggestion);
          //console.log("selected" + this.state.selectedSuggestion[0]);
          //console.log(this.state.selectedSuggestion[0])
          //this.setState({selectedSuggestion: selected});
          //console.log("state result = " + this.state.selectedSuggestion);
      }
      else if (e.keyCode == '40') {
          console.log("keyyyyyyyDAAAAwwwwn");
      }
    }

    handleChange(event) {
      var input = event.target.value.trim();

      var reg = new RegExp('^' + input, 'ig');
        var autoComplete = Categories.find({text: reg}, {limit:5}).fetch();
        var results = [];
        var selectedSuggestion = [];
        autoComplete.map(function(i){
          results.push((i.text.toString()));
          selectedSuggestion.push(false);
        });
        if (!input){
          this.setState({suggestions: "", selectedSuggestion: ""});
        } else {
        this.setState({suggestions: results});
        this.setState({selectedSuggestion: selectedSuggestion})
        }
      //Session.set("liveCategoryInput");
      //this.setState({value: event.target.value.trim()});
    }

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

  blurTest(event){
    if(document.activeElement !== this) {
        console.log("blurred");
    }
  }

  render(){
    //to avid throwing an error, I have to make sure that state.suggesitons HAS something there
    //otherwise, trying to use it will fuck shit up.
    if(this.state.suggestions){
      var suggestionsArray = this.state.suggestions;
      var suggestionsLeng = suggestionsArray.length;
      console.log(suggestionsArray[0]);
      console.log("There are " + suggestionsLeng + " suggestions for what is typed in the following array: " + suggestionsArray);
      suggestions = (
        <div className="suggestionsContainer">
          {
            suggestionsArray.map(function(suggestion){
              return <p3 key={suggestion} className="individualSuggestion">
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
    {/*
    var selectionStatusArray = this.state.selectedSuggestion;
    var array = this.state.suggestions;
    var leng = array.length;

      if(leng<=0){
        suggestions=(<div></div>)
      }
      else if (leng===1){
        moose = selectionStatusArray[0];
        console.log(moose);
        moosy = "selected" + moose;
          suggestions = (
            <div className="suggestionsContainer">
              <p3 className={moosy}>{array[0]}</p3>
            </div>
          )
        }
        else if (leng===2){
          suggestions = (
            <div className="suggestionsContainer">
              <p3 className="individualSuggestion">{array[0]}</p3>
              <p3 className="individualSuggestion">{array[1]}</p3>
            </div>
          )
        }
        else if (leng===3){
          suggestions = (
            <div className="suggestionsContainer">
              <p3 className="individualSuggestion">{array[0]}</p3>
              <p3 className="individualSuggestion">{array[1]}</p3>
              <p3 className="individualSuggestion">{array[2]}</p3>
            </div>
          )
        }
        else if (leng===4){
          suggestions = (
            <div className="suggestionsContainer">
              <p3 className="individualSuggestion">{array[0]}</p3>
              <p3 className="individualSuggestion">{array[1]}</p3>
              <p3 className="individualSuggestion">{array[2]}</p3>
              <p3 className="individualSuggestion">{array[3]}</p3>
            </div>
          )
        }
        else if (leng===5){
          suggestions = (
            <div className="suggestionsContainer">
              <p3 className="individualSuggestion">{array[0]}</p3>
              <p3 className="individualSuggestion">{array[1]}</p3>
              <p3 className="individualSuggestion">{array[2]}</p3>
              <p3 className="individualSuggestion">{array[3]}</p3>
              <p3 className="individualSuggestion">{array[4]}</p3>
            </div>
          )
        }
        */}


        //key events for autosuggest
        {/*
        $(document).on('keydown', function (e) {
          CategoryForm.handleKeyPress(e);
        });
        */}


    return (
            <form className="select-category"
              onSubmit={this.selectCategory.bind(this)}
              onBlur={this.selectCategory.bind(this)}
              onKeyDown={this.handleKeyPress}>
              <label>
              <input type="text"
                ref="currentCategory"
                placeholder="Web designer"
                onChange={this.handleChange}/>
              {suggestions}
              </label>
          </form>
        )
    }
}

                {/*value={this.state.value}*/}
