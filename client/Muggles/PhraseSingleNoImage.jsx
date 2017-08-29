import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class PhraseSingleNoImage extends TrackerReact(React.Component) {

  constructor() {
    super();
    this.state = {image: ''};
  }

  toggleChecked(){
    Meteor.call('togglePhrase', this.props.phrase._id, this.props.phrase.complete);
  }

  deletePhrase(){
    Meteor.call('deletePhrase', this.props.phrase._id);
  }

  uploadImage(){
    var id = this.props.phrase._id;
    filepicker.pick({
        mimetype: 'image/*', container: '', services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
      },
      function(Blob){
        var blobString = JSON.stringify(Blob);
        var blobObject = JSON.parse(blobString);
        Meteor.call('addImage', id, blobObject.url);
      },
      function(FPError){
        console.log(FPError.toString());
      });
  }

  render(){
    var imageText = this.props.phrase.text;
    var chars = imageText.length;
    var txtSize = "normal";
    if (chars > 100){
      txtSize = "normal";
    } else if (chars > 8){
      txtSize = "normal";
    } else {
      txtSize = "beeg";
    }
    //i love u bb jah <3 :)
    /*
    return (
      <div className="tiles">
          <li>
            {this.props.phrase.text}
            <button className="btn-upload"
              onClick={this.uploadImage.bind(this)}>
              {"Upload File"}
            </button>
          </li>
      </div>
    )*/

    return (
      <div className = "tile">
        <div className = "phraseDiv">
          <p1 className = "phraseText" id = {txtSize} >{this.props.phrase.text}</p1>
        </div>
        <button className = "btn-upload"
          onClick={this.uploadImage.bind(this)}>
            {"Upload Image"}
        </button>
      </div>
    )
  }
}

/*
    1) //////
    var imageUrl = Phrases.findOne({_id: this.props.phrase._id}).imageUrl;
    if (imageUrl){
      image = (<img src={imageUrl} alt="Smiley face" width="300px" height="300px"/>);
    } else {
      image = (<p1>nope</p1>);
    }

    2) ///////
    <input type="checkbox"
      readOnly={true}
      checked={this.props.phrase.complete}
      onClick={this.toggleChecked.bind(this)} />
      <button className="btn-cancel"
        onClick={this.deletePhrase.bind(this)}>
        &times;
      </button>

    3) /////
    {this.props.phrase.text}
    <UploadButton phrase = {this.props.phrase}/>
  */
