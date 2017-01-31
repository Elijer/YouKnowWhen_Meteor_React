import React, {Component} from 'react';
import ReactDom from 'react-dom';

export default class autocompleteInput extends Component {

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
      results.push((i.text.trim()))
    });
    console.log(results);
  }

  render(){
    return (
              <input type="text"
                ref="currentCategory"
                placeholder="Web designer"
                onChange={this.handleChange}/>
        )
    }

}
