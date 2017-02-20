import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AutoSuggest extends TrackerReact(React.Component) {

  constructor() {
    super();
    this.state = {input: ''}
  }

  goFishing(input){
    //searches Categories database for results that start with 'input'
    if(input){
      var results = []; //array for results of db query
      var reg = new RegExp('^' + input, 'ig'); //creates RegExp needed for truncation query
      var numOfResults = 5; //caps # of results returned
      var autoCompleteQuery = Categories.find({text: reg}, {limit:numOfResults}).fetch(); //db query
      autoCompleteQuery.map( //fills array with each result
        function(i, index){
          results.push((i.text.toString()));
          //selectedSuggestions[index+1] = false;
        }
      );
      return results;
    } else {
      }
  }

  render(){
    var value = this.props.input;
    var selectionArray = this.props.selected;
    var componentActive = this.props.active;
    var results = this.goFishing(value);

    if(results && componentActive){
      var suggestionsArray = results;
      suggestions = (
          <div className="suggestionsContainer">
            {suggestionsArray.map(function(suggestion, index){
              return <p3 key={index} className={"selected" + selectionArray[index+1]}>
                {suggestion}
                    </p3>
              })}
          </div>
        );
    } else {
      suggestions=(<div></div>);
    }

    return (
        <p1>{suggestions}</p1>
    )
  }
}
