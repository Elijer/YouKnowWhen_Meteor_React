import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AutoSuggest2 extends TrackerReact(React.Component) {

  getPosition(keyCount, length, addOne){
    addOne ? keyCount = keyCount + 1 : keyCount = keyCount;
    return keyCount % length;
  }

  setAutoFill(fill){
    Session.set('currentSelection', fill)
  }

  goFish(input){
    var resultsNum = 5;
    var results = [input];
    var reg = new RegExp('^' + input, 'ig');
    var query = Categories.find({text: reg}, {limit:resultsNum}).fetch();
    query.map(function(i, index){
        results.push(i.text.toString());
      }
    );
    return results;
  }

  buildSelectionArray(queryResults, position){
    var selectionArray = [];
    queryResults.map(function(){
      selectionArray.push(false)
    })
    selectionArray[position] = true;
    return selectionArray;
  }

  buildList(suggestionsArray, selectionArray){
    suggestions = (
        <div className="suggestionsContainer">
          {suggestionsArray.map(function(suggestion, index){
            if (index === 0){
              return null;
            } else {
              return <p3 key={index} className={"selected" + selectionArray[index]}> {suggestion} </p3>
            }
            })}
        </div>
      );
    return suggestions;
  }

  render(){
      var input = this.props.input;
      var componentActive = this.props.active;
      if (input && componentActive){
        var queryResult = this.goFish(input);
        var resultsLength = queryResult.length;
        console.log(queryResult);
        var keyCount = this.props.count;
        var positionAutoFill = this.getPosition(keyCount, resultsLength, true);
        var positionSelectionArray = this.getPosition(keyCount, resultsLength, false);
        this.setAutoFill(queryResult[positionAutoFill]);
        var selectionArray = this.buildSelectionArray(queryResult, positionSelectionArray);
        var list = this.buildList(queryResult, selectionArray);
        return list;
      } else {
        return null;
      }
    }
  }

/*
var keyCount = this.props.count;
var suggestionsArray = this.goFish(input);
var leng = suggestionsArray.length;
var position = this.remainder(keyCount, leng);
var selectionArray = this.buildSelectionArray(suggestionsArray, position, input)
return this.buildList(suggestionsArray, selectionArray);



remainder(keyCount, fieldCount){
  var position = (keyCount % fieldCount);
  return position;
}

goFish(input){
  var resultsNum = 5;
  var results = [input];
  //this is where results to the database query will go
  var reg = new RegExp('^' + input, 'ig');
  var query = Categories.find({text: reg}, {limit:resultsNum}).fetch();
  query.map(function(i, index){
      results.push(i.text.toString());
    }
  );//end of .map
  return results;
}

buildSelectionArray(suggestionsArray, selectedPosition, input){
  selectionArray = [input];
  suggestionsArray.map(function(suggestion, index){
    if (index === selectedPosition){
      selectionArray[index] = true;
      Session.set("currentSelection", suggestionsArray[index]);
    } else {
      selectionArray[index] = false;
    }
  })
  return selectionArray;
}

buildList(suggestionsArray, selectionArray){
  suggestions = (
      <div className="suggestionsContainer">
        {suggestionsArray.map(function(suggestion, index){
            return <p3 key={index} className={"selected" + selectionArray[index]}> {suggestion} </p3>
          })}
      </div>
    );
  return suggestions;
}

*/
