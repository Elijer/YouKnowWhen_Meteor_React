import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class CategoryForm extends Component {

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

  render(){
    return (
        <div>
            <form className="select-category" onSubmit={this.selectCategory.bind(this)}>
            <input type="text"
              ref="currentCategory"
              placeholder="Web designer" />
            </form>
        </div>
        )
    }
}
