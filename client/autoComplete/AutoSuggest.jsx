import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AutoSuggest extends TrackerReact(React.Component) {

  constructor() {
    super();
    this.state = {input: ''}
  }

  addA(input){
    console.log(input + "A");
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
    var selection = this.props.selections;
    console.log(selection);
    //console.log(this.goFishing(value));
    var results = this.goFishing(value);

    if(results){
      var suggestionsArray = results;
      suggestions = (
          <div className="suggestionsContainer">
            {suggestionsArray.map(function(suggestion, index){
              return <p3 key={index} className={"selectedTest"}>
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
