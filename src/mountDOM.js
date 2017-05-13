import React from 'react';
import ReactDOM from 'react-dom';

import Deact, { DOMComponent } from './Deact';

const Header = (props) => ({
  type: 'h1',
  props: {
    fakeInnerText: props.text
  }
});

const Paragraph = (props) => ({
  type: 'p',
  props: {
    fakeInnerText: props.text
  }
});

const HeaderAndParagraph = (props) => ({
  type: 'div',
  props: {
    children: [
      Header({ text: props.headerText}),
      Paragraph({text: props.paragraphText})
    ]
  }
});

const headerAndParagraphProps = {
  headerText: 'I am a header!',
  paragraphText: 'and I am a paragraph!!'
}
Deact.render(
  HeaderAndParagraph(headerAndParagraphProps),
  document.getElementById('root')
);
