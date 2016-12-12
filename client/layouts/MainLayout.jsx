import React from 'react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    {content}
  </div>
)
//creating constant variable with a name of MainLayout amd passing in some content.
//note that the MainLayout var is being exported so that routes.jsx can access it
