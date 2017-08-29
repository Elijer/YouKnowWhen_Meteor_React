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
    var imageText = this.props.phrase.text;
    var chars = imageText.length;
    console.log(chars);
    var txtSize = "normal";
    if (chars > 100){
      txtSize = "tiny";
    } else if (chars > 30){
      txtSize = "normal";
    } else if (chars > 10){
      txtSize = "beeg";
    } else {
      txtSize = "yuge";
    }

    return (
        <div className = "tile">
            <a data-fancybox="gallery" href={imageUrl}>
              <img src={imageUrl} alt="Image missing"/>
            </a>
            <div className = "phraseDiv">
              <p1 className = "phraseTextImage" id = {txtSize} >{this.props.phrase.text}</p1>
            </div>
            {/*<button className="btn-cancel"
              onClick={this.deletePhrase.bind(this)}>
              &times;
            </button>*/}
        </div>
    )
  }
}
