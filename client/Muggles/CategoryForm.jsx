import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Autosuggest from 'react-autosuggest';

export default class CategoryForm extends Component {

    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      var input = event.target.value.trim();
      var reg = new RegExp('^' + input, 'ig');
      var autoComplete = Categories.find({text: reg}).fetch();
      var results = [];
      autoComplete.map(function(i){
        results.push((i.text))
      });
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
    return (
            <form className="select-category"
              onSubmit={this.selectCategory.bind(this)}
              onBlur={this.selectCategory.bind(this)}>
              <label>
              <input type="text"
                ref="currentCategory"
                placeholder="Web designer"
                onChange={this.handleChange}/>
                <ul>
                  <li>yo</li>
                  <li>yo</li>
                  <li>yo</li>
                </ul>
              </label>
            {/*
            <input type="text"
              ref="currentCategory"
              placeholder="Web designer" />
              */}
          </form>
        )
    }
}

                {/*value={this.state.value}*/}
