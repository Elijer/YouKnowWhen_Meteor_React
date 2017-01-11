import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class CategoryForm extends Component {

  selectCategory(event){
    event.preventDefault();
    var text = this.refs.currentCategory.value.trim();
    Session.set("currentCategory", text);

    console.log(Session.get("currentCategory"));
    console.log(this);
    Modal.show("categoryModal");
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
