import React from 'react';

import Deact from './Deact';

const Header = (props) => (
  <div>
    <h1>Because we've taught class components how to render and mount, we can use pure JSX.</h1>
    <h1><i>No need to manually invoke the render call, like we did in lessons 2 and 3.</i></h1>
  </div>
);

const Subheader = (props) => (
  <h2>
    { props.text }
  </h2>
);

const Paragraph = (props) => (
  <div>
    <p>
      { props.text }
    </p>
    <i>whoa!</i>
  </div>
);

const SelfRenderingComponent = (props) => (
  <div>
    <Header />
    <Subheader text={props.headerText}/>
    <Paragraph text={props.paragraphText}/>
  </div>
);

const props = {
  headerText: 'I can render myself!!!!',
  paragraphText: 'I can render myself, too!'
};

Deact.render(
  <SelfRenderingComponent {...props}/>,
  document.getElementById('root')
);
