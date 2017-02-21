import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AutoSuggest extends TrackerReact(React.Component) {

  constructor() {
    super();
    this.state = {numOfResults: 5}
  }

  remainder(count){
    var divisor = this.state.numOfResults+1;
    var position = count % divisor;
    return position;
  }

  goFishing(input, selectedPosition){
    //searches Categories database for results that start with 'input'
    if(input){
      var results = []; //array for results of db query
      var selectionArray = [];
      selectionArray[0] = false;
      var reg = new RegExp('^' + input, 'ig'); //creates RegExp needed for truncation query
      var numOfResults = this.state.numOfResults; //caps # of results returned
      var autoCompleteQuery = Categories.find({text: reg}, {limit:numOfResults}).fetch(); //db query
      autoCompleteQuery.map( //fills array with each result
        function(i, index){
          results.push((i.text.toString()));
          selectionArray.push(false);
        }
      );
      selectionArray[selectedPosition] = true;
      Session.set("currentSelection", results[selectedPosition]);
      var suggestions = {
        results: results,
        selectionArray: selectionArray
      }
      return suggestions;
    } else {
      }
  }

  render(){
    var value = this.props.input;
    var componentActive = this.props.active;
    var position = this.remainder(this.props.count);
    ////////////////////////////////////////////////////////////////////console.log(position);
    var suggestions = this.goFishing(value, position);
    if (suggestions){
      if (suggestions.results){
        var results = suggestions.results;
        var selectionArray = suggestions.selectionArray;
      }
    }
    if(results && componentActive){
      var suggestionsArray = results;
      suggestions = (
          <div className="suggestionsContainer">
            {suggestionsArray.map(function(suggestion, index){
              //return <p3 key={index} className={"selected" + selectionArray[index+1]}>
              return <p3 key={index} className={"selected" + selectionArray[index]}>
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
