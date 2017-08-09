import React from 'react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
      <nav>
          <a id = "logo" href="/">
              <img src="YouKnow_NoLines.png"/>
          </a>
          <a id = "nav-item" href="/about"> About </a>
          <a id = "nav-item" href="/contact"> Contact </a>
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
)
//creating constant variable with a name of MainLayout amd passing in some content.
//note that the MainLayout var is being exported so that routes.jsx can access it
