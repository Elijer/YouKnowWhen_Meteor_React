import React, {Component} from 'react';

export default class PhraseSingle extends Component {

  toggleChecked(){
    Meteor.call('toggleResolution', this.props.resolution._id, this.props.resolution.complete);
  }

  deleteResolution(){
    Meteor.call('deleteResolution', this.props.resolution._id);
  }

  render(){
    return (
      <div className="tiles">
          <li>
            {/*
            <input type="checkbox"
              readOnly={true}
              checked={this.props.resolution.complete}
              onClick={this.toggleChecked.bind(this)} />
              */}
              <button className="btn-cancel"
                onClick={this.deleteResolution.bind(this)}>
                &times;
              </button>
            {this.props.resolution.text}
          </li>
      </div>
    )
  }
}
