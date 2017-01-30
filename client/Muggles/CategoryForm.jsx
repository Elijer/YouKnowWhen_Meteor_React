import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class CategoryForm extends Component {

    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      //console.log(event.target.value);
      //this.setState({value: event.target.value.toUpperCase()});
      var input = event.target.value.trim();
      //var re = new RegExp("ab+c");
      //var inputRegex = new RegExp("^input");
      //console.log(input);
      //this.setState({value: event.target.value});

      //var regexString = '\\^{' + input + '}';
      //var regex = new RegExp(regexString);
      //var reg = new RegExp('\{'+input+'\}', 'gi');
      var reg = new RegExp('^' + input.toString());

      var autoComplete = Categories.find({text: reg}).fetch();
      //console.log(autoComplete);
      console.log(autoComplete);

      //db.inventory.find( { tags: { $in: [ /^be/, /^st/ ] } } )
      //console.log(Categories.find({text: /^{input}/ }).fetch());
      //console.log(autoComplete);
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
