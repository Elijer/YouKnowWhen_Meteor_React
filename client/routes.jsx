import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';
import MuggleWrapper from './Muggles/MuggleWrapper.jsx';
import IllustratorWrapper from './Illustrators/IllustratorWrapper.jsx';

FlowRouter.route('/', {
  action(){
    mount(MainLayout, {
        content: (<MuggleWrapper />)
    });
  }
});

FlowRouter.route('/forIllustrators', {
  action(){
    mount(MainLayout, {
        content: (<IllustratorWrapper />)
    });
  }
});
