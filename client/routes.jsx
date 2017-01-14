import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';
import MuggleWrapper from './phrases/MuggleWrapper.jsx';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
        content: (<MuggleWrapper />)
    });
  }
});
