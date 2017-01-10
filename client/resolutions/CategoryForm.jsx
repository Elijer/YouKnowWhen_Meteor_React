import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class CategoryForm extends Component {

  addResolution(event){
    event.preventDefault();
    var text = this.refs.resolution.value.trim();

    Meteor.call('addResolution', text, ()=>{
      this.refs.resolution.value = "";
    });
    //this.refs.resolution.value = "";
  }

  selectCategory(event){
    event.preventDefault();
    var text = this.refs.currentCategory.value.trim();
    Session.set("currentCategory", text);

    console.log(Session.get("currentCategory"));
    console.log(this);
  }

  render(){

    return (
        <div>
          <h3> You know you're a &nbsp;
            <form className="select-category" onSubmit={this.selectCategory.bind(this)}>
            <input type="text"
              ref="currentCategory"
              placeholder="Web designer" />
            </form>
              <form className="new-resolution" onSubmit={this.addResolution.bind(this)}>
                <input type="text"
                  ref="resolution"
                  placeholder="..." />
              </form>
            </h3>
          </div>
        )
    }
}
