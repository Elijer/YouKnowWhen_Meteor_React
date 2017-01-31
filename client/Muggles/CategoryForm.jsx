import React, {Component} from 'react';
import ReactDom from 'react-dom';
import autocompleteInput from '../autoComplete/autocompleteInput.jsx'

export default class CategoryForm extends Component {

    constructor(props) {
      super(props);
      this.state = {value: '', suggestions: ''};
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      var input = event.target.value.trim();

      var reg = new RegExp('^' + input, 'ig');
        var autoComplete = Categories.find({text: reg}, {limit:5}).fetch();
        var results = [];
        autoComplete.map(function(i){
          results.push((i.text.toString()))
        });
        if (!input){
          this.setState({suggestions: ""});
        } else {
        this.setState({suggestions: results});
        }
        console.log(this.state.suggestions);

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
    let liveCategoryInput = Session.get("liveCategoryInput");
    var reg = new RegExp('^' + liveCategoryInput, 'ig');
    var array = this.state.suggestions;
    var leng = array.length;
      if(leng<=0){
        suggestions=(<div></div>)
      }
      else if (leng===1){
          suggestions = (
            <div className="suggestionsContainer">
              <p3 className="individualSuggestion" tabIndex="4">{array[0]}</p3>
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


    return (
            <form className="select-category"
              onSubmit={this.selectCategory.bind(this)}
              onBlur={this.selectCategory.bind(this)}>
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
