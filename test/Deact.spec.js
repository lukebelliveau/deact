import React from 'react';
import { expect } from 'chai';
import assertWithHints, { compositeFunctionalDOMTreeHint, classAsFunctionHint } from './hintHelper';

import Deact, { DOMComponent, CompositeComponent } from '../src/Deact';
import MountableString from '../src/MountableString';

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
);

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
);

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
);

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
);

describe('Deact', () => {

  afterEach(() => {
    root.innerHTML = '';
  });
  describe('(Class) DOMComponent', () => {
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
          assertWithHints(assertion);
        });

        it('should return a <p> DOM element', () => {
          //given
          const domComponent = new DOMComponent(ParagraphWithIdAndText());

          //when
          const domNode = domComponent.mount();

          //then
          const assertion = () =>
            expect(getNodeMountedToUI(domNode)).to.contain('</p>')

          //hint
          assertWithHints(
            assertion,
            'Your DOMNode may be having trouble appending to the root. Try returning an HTML element, like this: \n\tdocument.createElement("div").'
          );
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
          assertWithHints(
            assertion,
            'Host Element props (OTHER THAN CHILDREN) are meant to be attached straight to the DOM node as attributes. Try a setAttribute() call on your DOM element.'
          );
        });
      });

      describe('handling child Elements', () => {
        it('should mount string literal children inside <span>', () => {
          //given
          const props = { text: 'I am a div!' }
          const DivWithChildText = (props) => (
            <div>
              { props.text }
            </div>
          );
          const domComponent = new DOMComponent(DivWithChildText(props));

          //when
          const domNode = domComponent.mount();

          //then
          const assertion = () =>
            expect(getNodeMountedToUI(domNode)).to.equal(`<div><span>${props.text}</span></div>`);

          //hint
          assertWithHints(
            assertion,
            'this is a freebie. Instantiate a new DOMComponent for each child. Then call mount() on your child, and append it to our current node with appendChild().\n\tSorry for being hand-wavey with the span, this part of React is not very interesting.\n\tThe important bit here is instantiating new DOMComponents from children, then mounting and appending them.'
          );
        });


        it('should render and attach its child elements', () => {
          //given
          const props = {
            text: 'some text',
            id: 'anId',
            name: 'aName',
          };
          const domComponent = new DOMComponent(DivWithHeaderAndParagraph(props));

          //when
          const domNode = domComponent.mount();

          //then
          const assertion = () =>
            expect(getNodeMountedToUI(domNode)).
            to.equal(
              '<div>'                                         +
              `<h1><span>${props.text}</span></h1>`         +
              `<p id="${props.id}" name="${props.name}">`   +
              `<span>${props.text}</span>`                +
              '</p>'                                        +
              '</div>'
            );

          assertWithHints(assertion,
            '**HINT** This should follow from the last test, but you will likely be left with some cases that will break previous tests. Consider the following:\n\t\t1. An element has a single child, represented as an object.\n\t\t2. An element has an array of children.\n\t\t3. An element has no children.'
          );
        });
      });
    });
  });

  describe('render()', () => {
    it('should attach a DOM node, described by an Element, to the container DOM node', () => {
      //given
      const props = {
        text: 'some text',
        id: 'anId',
        name: 'aName',
      };

      //when
      Deact.render(DivWithHeaderAndParagraph(props), document.getElementById('root'));

      //then
      const assertion = () =>
        expect(document.getElementById('root').innerHTML).to.equal(
          '<div>'                           +
            `<h1><span>${props.text}</span></h1>`  +
            `<p id="${props.id}" name="${props.name}">`    +
              `<span>${props.text}</span>`         +
            '</p>'                          +
          '</div>'
        );

      assertWithHints(
        assertion,
        '**HINT** The hard work is done. render() does the following:\n\t\t1. Instantiates a DOMComponent from the element.\n\t\t2. Mounts the element it is given.  The recursive process will create and return a DOM tree.\n\t\t3. Use appendChild(node) on the containerNode to attach your DOM tree to the document.'
      );
    });
  });

  describe('instantiateComponent()', () => {
    it('should return a DOMComponent instance if the element type is a string', () => {
      //given
      const element = {
        type: 'h1'
      };

      //when
      const instance = Deact.instantiateComponent(element);

      //then
      expect(instance).to.eql(new DOMComponent(element));
    });

    it('should return a MountableString instance if the element has no type', () => {
      //given
      const element = 'String literal, like the child of a div';

      //when
      const instance = Deact.instantiateComponent(element);

      //then
      expect(instance instanceof MountableString).to.be.true;
    })
  });

  describe('(Class) CompositeComponent', () => {
    describe('mounting functional components', () => {
      it.only('should return a DOM tree on mount() call', () => {
        //given
        const props = { text: 'headerText '};
        const FunctionalCompositeComponent = (props) => (
          <Header text={ props.text }/>
        );
        const instantiatedComponent = new CompositeComponent(<FunctionalCompositeComponent {...props} />);

        //when
        const mountedComponent = instantiatedComponent.mount();

        //then
        const assertion = () =>
        expect(getNodeMountedToUI(mountedComponent)).to.equal(
          '<h1>' +
            `<span>${props.text}</span>`+
          '</h1>'
        );

        //hint
        assertWithHints(assertion,compositeFunctionalDOMTreeHint)
      });

      describe('mounting class components', () => {
        it('should return a DOM tree on mount() call', () => {
          //given
          const props = { text: 'headerText' };
          class ClassyCompositeComponent extends React.Component {
            render() {
              return <Header text={ this.props.text }/>
            }
          }
          const instantiatedComponent = new CompositeComponent(<ClassyCompositeComponent {...props} />);

          //when
          //try to ignore the try/catch stuff - it's for printing hints.
          let mountedComponent;
                                                                                                            try{
          mountedComponent = instantiatedComponent.mount();
                                                                                                            }catch(e){if(e.message === "Cannot call a class as a function"){throw new Error(e+'\n\t\t'+classAsFunctionHint);}else throw e}
          //then
          const assertion = () =>
          expect(getNodeMountedToUI(mountedComponent)).to.equal(
            '<h1>' +
              `<span>${props.text}</span>`+
            '</h1>'
          );

          //hint
          assertWithHints(assertion);

        });

        it('should call componentWillMount() before mounting component', () => {
          //given
          const props = { text: 'headerText' };
          const textSetBeforeMount = 'new text';
          class ClassyCompositeComponent extends React.Component {
            constructor() {
              super(props);
            }
            componentWillMount() {
              this.props.newText = textSetBeforeMount
            }
            render() {
              return <Header text={ this.props.newText }/>
            }
          }
          const instantiatedComponent = new CompositeComponent(<ClassyCompositeComponent {...props} />);

          //when
          const mountedComponent = instantiatedComponent.mount();

          //then
          const assertion = () =>
          expect(getNodeMountedToUI(mountedComponent)).to.equal(
            '<h1>' +
            `<span>${textSetBeforeMount}</span>`+
            '</h1>'
          );

          //hint
          assertWithHints(assertion)
        })
      })
    })
  });
});

/*
 helper function enabling us to inspect the elements we mount.
*/
const getNodeMountedToUI = (DOMNode) => {
  root.appendChild(DOMNode);
  return root.innerHTML;
};
const root = document.getElementById('root');
