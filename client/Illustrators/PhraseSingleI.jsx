import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class PhraseSingleI extends TrackerReact(React.Component) {

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
    //console.log(this.props.phrase.text);
    console.log(this.props.phrase._id);
    filepicker.pick({
        mimetype: 'image/*', container: '', services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
      },
      function(Blob){
        var blobString = JSON.stringify(Blob);
        var blobObject = JSON.parse(blobString);
        //console.log(blobString);
        console.log(blobObject.url);
        Session.set("imageUrl", blobObject.url);
        //this.state.image = blobObject.url;
      },
      function(FPError){
        console.log(FPError.toString());
      });
  }

  render(){
    if (Session.get("imageUrl")){
      console.log("image");
      var image = (<img src={Session.get("imageUrl")} alt="Smiley face" width="100px" height=""/>);
      //var image = (<p1>{Session.get("imageUrl")}</p1>);
    } else {
      var image = (<div></div>);
      console.log("");
    }

    return (
      <div className="tiles">
          <li>
            {this.props.phrase.text}
                        {image}
            <button className="btn-upload"
              onClick={this.uploadImage.bind(this)}>
              {"Upload File"}
            </button>
            {/*
            <input type="checkbox"
              readOnly={true}
              checked={this.props.phrase.complete}
              onClick={this.toggleChecked.bind(this)} />

              <button className="btn-cancel"
                onClick={this.deletePhrase.bind(this)}>
                &times;
              </button>
              */}
          </li>
      </div>
    )
  }
}

{/*
  {this.props.phrase.text}
  <UploadButton phrase = {this.props.phrase}/>
  */}
