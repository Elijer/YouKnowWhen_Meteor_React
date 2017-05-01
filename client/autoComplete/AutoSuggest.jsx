import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AutoSuggest extends TrackerReact(React.Component) {

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
        if (i.text != input){
        results.push(i.text.toString());
        } else {
        return;
        }
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

  buildList(suggestionsArray, selectionArray, input){
    suggestions = (
        <div className="suggestionsContainer">
          {suggestionsArray.map(function(suggestion, index){
            if (index === 0){
              return null;
            //} else if (suggestion === input){
              //return null;
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
        var keyCount = this.props.count;
        var positionAutoFill = this.getPosition(keyCount, resultsLength, true);
        var positionSelectionArray = this.getPosition(keyCount, resultsLength, false);
        this.setAutoFill(queryResult[positionAutoFill]);
        var selectionArray = this.buildSelectionArray(queryResult, positionSelectionArray);
        var list = this.buildList(queryResult, selectionArray, input);
        return list;
      } else {
        return null;
      }
    }
  }
