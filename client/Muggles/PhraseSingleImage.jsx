import React, {Component} from 'react';

export default class PhraseSingleImage extends Component {

  toggleChecked(){
    Meteor.call('togglePhrase', this.props.phrase._id, this.props.phrase.complete);
  }

  deletePhrase(){
    Meteor.call('deletePhrase', this.props.phrase._id);
  }

  render(){
    var imageUrl = this.props.phrase.imageUrl;
    //console.log(this.props.phrase);
    return (
        <div className = "tile">
          {/*
          <input type="checkbox"
            readOnly={true}
            checked={this.props.phrase.complete}
            onClick={this.toggleChecked.bind(this)} />
            */}
            <a data-fancybox="gallery" href={imageUrl}>
              <img src={imageUrl} alt="Image missing"/>
            </a>
            <div className = "phraseDiv">
              <p1 className = "phraseText">{this.props.phrase.text}</p1>
            </div>
            <button className="btn-cancel"
              onClick={this.deletePhrase.bind(this)}>
              &times;
            </button>
        </div>
    )
  }
}
