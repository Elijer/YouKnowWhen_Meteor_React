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
      var autoComplete = Categories.find({text: reg}).fetch();
      var results = [];
      autoComplete.map(function(i){
        results.push((i.text.trim()))
      });
      console.log(results);
      this.setState({suggestions: results});
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
    console.log("blurred");
  }

  render(){
    let liveCategoryInput = Session.get("liveCategoryInput");
    var reg = new RegExp('^' + liveCategoryInput, 'ig');
    suggestions = (
      <div>{this.state.suggestions.toString()}</div>
    )

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

{/*}
<Autosuggest
  suggestions={results}
  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
  getSuggestionValue={getSuggestionValue}
  renderSuggestion={renderSuggestion}
  inputProps={inputProps}
/>
*/}

{/*}
<Autosuggest
  suggestions={suggestions}
  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
  getSuggestionValue={getSuggestionValue}
  renderSuggestion={renderSuggestion}
  inputProps={inputProps}
/>
*/}
                {/*value={this.state.value}*/}
