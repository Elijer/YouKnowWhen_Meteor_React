import React from 'react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
      <h2>My Resolutions</h2>
      <nav>
        <a href="/">Resolutions</a>
        <a href="/about">Resolutions</a>
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
)
//creating constant variable with a name of MainLayout amd passing in some content.
//note that the MainLayout var is being exported so that routes.jsx can access it
