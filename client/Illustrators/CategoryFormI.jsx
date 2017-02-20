import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class CategoryFormI extends Component {

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
    //these three variables are for feeding the AutoSuggest component in the return()
    /*var autosuggestFood = this.state.food;
    var keyCount = this.state.keyCount;
    var autosuggestActive = this.state.suggestionsOn;*/
    //////
    return (
            <form className="select-category"
              onSubmit={this.selectCategory.bind(this)}
              onBlur={this.selectCategory.bind(this)}>
            <input type="text"
              ref="currentCategory"
              placeholder="Illustrator" />
            //<AutoSuggest input={autosuggestFood} count={keyCount} active={autosuggestActive}/>
            </form>
        )
    }
}
