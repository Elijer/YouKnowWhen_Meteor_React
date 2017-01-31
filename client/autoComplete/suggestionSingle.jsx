import React, {Component} from 'react';

export default class PhraseSingle extends Component {
  render(){
    return (
      <div className="tiles">
          <li>
            {this.props.phrase.text}
          </li>
      </div>
    )
  }
}
