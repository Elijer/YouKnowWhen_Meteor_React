import React from 'react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
      <h2><img class="logo" src="YouKnow.jpg"/></h2>
      <nav>
        <a href="/">Home</a>
        <a href="/forIllustrators">For Illustrators</a>
        <a href="/about"> About </a>
        <a href="/contact"> Contact </a>
      </nav>
    </header>
    <main>
      {content}
    </main>
    <footer>
      Mark Slauter 2016
    </footer>
  </div>
)
//creating constant variable with a name of MainLayout amd passing in some content.
//note that the MainLayout var is being exported so that routes.jsx can access it
