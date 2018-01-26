import React from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AutoSuggest from '../autoComplete/AutoSuggest.jsx';

export default class CategoryForm extends TrackerReact(React.Component) {
//
    constructor(props) {
      super(props);
      this.state = {
        suggestionsOn: false,
        food: '',
        keyCount: 0,
        placeholder: '...'
      };
      //binds handleChange function to any event of the category input bar
      this.handleChange = this.handleChange.bind(this);
      //bings handleKeyPress event to any keyboard event when input is focused on
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    /*context = this;
    //this.displayPlaceholder(this, 'elijah', 2000, 7000, 2000);
    var strang = "Web Designer";
    var strang2 = "Entrepreneur";
    var delay = 12300;
    var duration = 1800;
    var interval = duration/strang.length;
    var interDuration = 3000;
    var finalHold = 3000;
    var interval2 = duration/strang2.length;
    var firsttime = delay + interval*10+interDuration;
    ///put this all instead in the componentDidMount whatever thingy, seems like what I should do.
    setTimeout(function(){context.setState({placeholder: 'W'}) }, delay);
    setTimeout(function(){context.setState({placeholder: 'We'}) }, delay + interval);
    setTimeout(function(){context.setState({placeholder: 'Web'}) }, delay + interval*2);
    setTimeout(function(){context.setState({placeholder: 'Web D'}) }, delay + interval*3);
    setTimeout(function(){context.setState({placeholder: 'Web De'}) }, delay + interval*4);
    setTimeout(function(){context.setState({placeholder: 'Web Des'}) }, delay + interval*5);
    setTimeout(function(){context.setState({placeholder: 'Web Desi'}) }, delay + interval*6);
    setTimeout(function(){context.setState({placeholder: 'Web Desig'}) }, delay + interval*7);
    setTimeout(function(){context.setState({placeholder: 'Web Design'}) }, delay + interval*8);
    setTimeout(function(){context.setState({placeholder: 'Web Designe'}) }, delay + interval*9);
    setTimeout(function(){context.setState({placeholder: 'Web Designer'}) }, delay + interval*10);
    setTimeout(function(){context.setState({placeholder: ''}) }, delay + interval*10+interDuration);
    setTimeout(function(){context.setState({placeholder: 'E'}) }, firsttime + interval2);
    setTimeout(function(){context.setState({placeholder: 'En'}) }, firsttime + interval2*2);
    setTimeout(function(){context.setState({placeholder: 'Ent'}) }, firsttime + interval2*3);
    setTimeout(function(){context.setState({placeholder: 'Entr'}) }, firsttime + interval2*4);
    setTimeout(function(){context.setState({placeholder: 'Entre'}) }, firsttime + interval2*5);
    setTimeout(function(){context.setState({placeholder: 'Entrep'}) }, firsttime + interval2*6);
    setTimeout(function(){context.setState({placeholder: 'Entrepr'}) }, firsttime + interval2*7);
    setTimeout(function(){context.setState({placeholder: 'Entrepre'}) }, firsttime + interval2*8);
    setTimeout(function(){context.setState({placeholder: 'Entrepren'}) }, firsttime + interval2*9);
    setTimeout(function(){context.setState({placeholder: 'Entreprene'}) }, firsttime + interval2*10);
    setTimeout(function(){context.setState({placeholder: 'Entrepreneu'}) }, firsttime + interval2*11);
    setTimeout(function(){context.setState({placeholder: 'Entrepreneur'}) }, firsttime + interval2*12);
    setTimeout(function(){context.setState({placeholder: ''}) }, firsttime + interval2*12+finalHold);*/

    pholdHelper(context, what){
      var delay = 2000;
      setTimeout(function(){context.setState({placeholder: 'Elijah'}) }, delay);
    }

    componentDidMount(){
      var context = this;
      this.pholdHelper(context, "componentDidMount");
    }

    //handleKeyPress() and handleChange() are both for feeding the AutoSuggest component
    //both channel their data through state.
    handleKeyPress(e) {
      if (e.keyCode == '40') {
        var countIncrement = this.state.keyCount+1;
        this.setState({keyCount: countIncrement});
        e.target.value = Session.get("currentSelection");
        Session.set("reactiveCategory", e.target.value);
      }
    }

    handleChange(e){    //handles changes in the upper category form input
      this.setState({suggestionsOn: true, keyCount: 0});
      var input = e.target.value.trim().toLowerCase();
      !input ? this.setState({food: ''}):this.setState({food: input});
      Session.set("reactiveCategory", input);
      console.log('achange');
      //console.log(e);
      //so it looks like my problem is that putting stuff in doesn't trigger a change.
    }

    selectCategory(event){
      event.preventDefault();
      this.setState({suggestionsOn: false});
      var dis = this;
      var text = this.refs.currentCategory.value.trim().toLowerCase();
      if (text === "" || text === null){
        return;
      } else {
      Session.set("currentCategory", text);
      var dbText = Categories.findOne({text: text});
      Meteor.call("isAppropro", text, function(err, data){
        if (err){console.log("error")}
        if (data === false){
          Modal.show("rejectionModal");
          Session.set("currentCategory", "");
          dis.refs.currentCategory.value = '';
        } else {
          if (!dbText) Modal.show("categoryModal");
        }
      });
      }
    }

    //psuedo code for this custom typing function
    //variables
    //intervalOrDuration = selector to use an interval per letter or a total duration from start time to finish string
    //interval = amount of time per selectCategory
    //duration = total amount of time word must be typed in
    //delay = amount of time before start
    //string = the string to be typed
    //characterNum = number of characters int he given string
    //clearTime = how long before word should be cleared (should be more than the duration, or total interval time)
    //conditionals
    //if interval, then duration = interval*numberofcharactersinstring, console.log(duration);
    //if duration, then interval = duration/numberofcharactersinstring, console.log(interval);

  render(){
    var autosuggestFood = this.state.food;
    var keyCount = this.state.keyCount;
    var autosuggestActive = this.state.suggestionsOn;
    var placeholder = this.state.placeholder;

    return (
            <form className="select-category"
              onSubmit={this.selectCategory.bind(this)}>
              <label>
              <input type="text"
                ref="currentCategory"
                placeholder = {placeholder}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}/>
              <AutoSuggest input={autosuggestFood} count={keyCount} active={autosuggestActive}/>
              </label>
          </form>
        )
    }
}


{/*value={this.state.value}*/}
{/*
          <img src={Session.get("image")} alt="Smiley face"/>

// this was found in the body of the app
  blurTest(event){
    if(document.activeElement !== this) {
        console.log("blurred");
    }
  }
  */}
{/* ///the following can be put right below the this.selectCategory.bind(this) attribute of <form>
  onBlur={this.selectCategory.bind(this)*/}

{/*
  if (array[0]=false){
    this.refs.currentCategory.blur();
  }
  */}

{  /*categories(searchKey){
    return Categories.find(searchKey).fetch();
  }*/}
