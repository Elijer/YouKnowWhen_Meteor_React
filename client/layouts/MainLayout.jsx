import React from 'react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
      <a href="/">
        <h2>
          <img src="YouKnow_Spiffy_Medium.png"/>
        </h2>
      </a>
      <nav>
        <a href="/about"> About </a>
        <a href="/contact"> Contact </a>
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
)
//creating constant variable with a name of MainLayout amd passing in some content.
//note that the MainLayout var is being exported so that routes.jsx can access it
