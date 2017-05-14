import React from 'react';
import { expect } from 'chai';
import Deact, { DOMComponent } from '../src/Deact';

/*
  {
    type: 'p',
    props: {
      id: props.id,
      children: props.text
    }
  }
*/
const ParagraphWithIdAndText = (props = {}) => (
  <p id={props.id} name={props.name}>
    {props.text}
  </p>
)

/*
  {
    type: 'h1',
    props: {
      children: props.text
    }
  }
*/
const Header = (props = {}) => (
  <h1>
    {props.text}
  </h1>
)

/*
  {
    type: 'div',
    props: {
      children: ParagraphWithIdAndText(props)
    }
  }
*/
const DivWithParagraph = (props = {}) => (
  <div>
    ParagraphWithIdAndText(props)
  </div>
)

/*
  {
    type: 'div',
    props: {
      children: [
        Header(props),
        ParagraphWithIdAndText(props)
      ]
    }
  }
*/
const DivWithHeaderAndParagraph = (props = {}) => (
  <div>
  {[
    Header(props),
    ParagraphWithIdAndText(props)
  ]}
  </div>
)

describe('(Class) DOMComponent', () => {

  afterEach(() => {
    root.innerHTML = '';
  })

  describe('mount()', () => {
    describe('creating a DOM node by type', () => {
      it('should return a <div> DOM element', () => {
        //given
        const domComponent = new DOMComponent(DivWithParagraph());

        //when
        const domNode = domComponent.mount();

        //then
        const assertion = () =>
        expect(getNodeMountedToUI(domNode)).to.contain('</div>');

        //hint
        try{assertion()}catch(a){throw"TypeError"===a.name?new Error(e + '\n\t'+'**HINT**:Your DOMNode is having trouble appending to the root. Try returning an HTML element, like this: \n\tdocument.createElement("div").'):a}
      });

      it('should return a <p> DOM element', () => {
        //given
        const domComponent = new DOMComponent(ParagraphWithIdAndText());

        //when
        const domNode = domComponent.mount();

        //then
        const assertion =
        expect(getNodeMountedToUI(domNode)).to.contain('</p>')
      });
    });

    describe('setting attributes on DOM nodes', () => {
      it('should set attributes specified in props', () => {
        //given
        const props = {
          id: 'anId',
          name: 'aName'
        };
        const domComponent = new DOMComponent(ParagraphWithIdAndText(props));

        //when
        const domNode = domComponent.mount();

        //then
        const assertion = () =>
        expect(getNodeMountedToUI(domNode)).to.contain(`<p id="${props.id}" name="${props.name}">`);

        //hint
        try {
          assertion()
        } catch (e) {
          if (e.name === 'AssertionError') throw new Error(
            e + '\n\t'+
            '**HINT**: Host Element props (OTHER THAN CHILDREN) are meant to be attached straight to the DOM node as '+
            'attributes. Try a setAttribute() call on your DOM element.'
          );

          else throw e;
        };
      })
    });

    describe('handling child Elements', () => {
      it('should render one string literal child element', () => {
        //given
        const props = { text: 'I am a div!' }
        const DivWithChildText = (props) => (
          <div>
            { props.text }
          </div>
        )
        const domComponent = new DOMComponent(DivWithChildText(props));

        //when
        const domNode = domComponent.mount();

        //then
        const assertion = () =>
        expect(getNodeMountedToUI(domNode)).to.equal(`<div>${props.text}</div>`)

        //hint
        try {
          assertion()
        } catch(e) {
          throw new Error(
            '\n\t' +
            '**WARNING**: this part of the tutorial is GARBAGE. Let\'s chat if you get stuck.\n\t'+
            'Child elements should be:\n\t'+
              '1. Instantiated with new DOMComponent()\n\t'+
              '2. Mounted with mount(). Recursion!\n\t'+
              '3. Appended to the node with appendChild().\n\n\t'+
              'The case of string literals is a bit special. That\'s why we have '+
              'the hand-wavey Component class at the top - Sorry!! \n\tFor this example, append the '+
              'DOM node\'s innerHTML to the result of the mount call:\n\t\t'+
              'childNode = child.mount()\n\t\t'+
              'node.innerHTML += childNode'
          )
        }
      });

      it('should render and attach its child elements', () => {
        const props = {
          text: 'some text',
          id: 'anId',
        };

        const domComponent = new DOMComponent(DivWithHeaderAndParagraph(props));
        const domNode = domComponent.mount();

        expect(getNodeMountedToUI(domNode)).
        to.equal(
          '<div>'                           +
            `<h1>${props.text}</h1>`  +
            `<p id="${props.id}">`    +
              `${props.text}`         +
            '</p>'                          +
          '</div>'
        )
      })
    })
  })
})

describe('render()', () => {
  it('should attach a DOM node, described by an Element, to the container DOM node', () => {
    const props = {
      text: 'some text',
      id: 'anId',
    };



    Deact.render(DivWithHeaderAndParagraph(props), document.getElementById('root'));

    expect(document.getElementById('root').innerHTML).to.equal(
      '<div>'                           +
        `<h1>${props.text}</h1>`  +
        `<p id="${props.id}">`    +
          `${props.text}`         +
        '</p>'                          +
      '</div>'
    )
  })
});


/*
 helper function enabling us to inspect the elements we mount.
*/
const getNodeMountedToUI = (DOMNode) => {
  root.appendChild(DOMNode);
  return root.innerHTML;
};

const root = document.getElementById('root');
const mountedByDeact = root.innerHTML;
