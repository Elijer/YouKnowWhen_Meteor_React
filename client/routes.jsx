import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';
import PhrasesWrapper from './phrases/PhrasesWrapper.jsx';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
        content: (<PhrasesWrapper />)
    });
  }
});
