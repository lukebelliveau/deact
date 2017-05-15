import React from 'react';

import Deact from './Deact';

const Header = (props) => (
  <h1>
    { props.text }
  </h1>
)

const Paragraph = (props) => (
  <p>
    { props.text }
  </p>
)

const HeaderAndParagraph = (props) => (
  <div>
    {[
      Header({ text: props.headerText }),
      Paragraph({ text: props.paragraphText })
    ]}
  </div>
)

const headerAndParagraphProps = {
  headerText: 'I am a header!',
  paragraphText: 'and I am a paragraph!!'
}

Deact.render(
  HeaderAndParagraph(headerAndParagraphProps),
  document.getElementById('root')
);
