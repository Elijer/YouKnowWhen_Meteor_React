import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';
import MuggleWrapper from './Muggles/MuggleWrapper.jsx';
//import IllustratorWrapper from './Illustrators/IllustratorWrapper.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Profile from './Profile.jsx';
import ImageDisplay from './ImageDisplay.jsx';

FlowRouter.route('/', {
  action(){
    mount(MainLayout, {
        content: (<MuggleWrapper />)
    });
  }
});


FlowRouter.route('/About', {
  action(){
    mount(MainLayout, {
        content: (<About />)
    });
  }
});

FlowRouter.route('/Contact', {
  action(){
    mount(MainLayout, {
        content: (<Contact />)
    });
  }
});

FlowRouter.route('/Profile', {
  action(){
    mount(MainLayout, {
        content: (<Profile />)
    });
  }
});


FlowRouter.route('/ImagePost/:_id',  {
    action(params){
      mount(MainLayout, {
        content: (<ImageDisplay  id = {params._id} />)
      })
  }
})
