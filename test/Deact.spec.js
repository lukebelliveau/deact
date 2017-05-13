import chai, { expect } from 'chai';
import chaiDOM from 'chai-dom';
import Deact, { DOMComponent } from '../src/Deact';


const textInsideElement = 'text inside element';
const idForParagraph = 'paragraph-element';
/*
  const ParagraphWithTextComponent = (props) => (
    <p id={ props.id }>text inside element</p>
  )

  this is represented by the Element below.
*/
const paragraphElement = {
  type: 'p',
  props: {
    id: idForParagraph,
    children: [
      textInsideElement
    ]
  }
}

/*
  const HeaderWithTextComponent = (props) => (
    <h1>text inside element</h1>
  )

  this is represented by the Element below.
*/
const headerElement = {
  type: 'h1',
  props: {
    children: [
      textInsideElement
    ]
  }
}

/*
  const DivWithTextComponent = () => (
    <div>
      <ParagraphWithTextComponent />
    </div>
  )

  this is represented by the Element below.
*/
const divElement = {
  type: 'div',
  props: {
    children: [
      paragraphElement,
    ]
  }
}

describe('(Class) DOMComponent', () => {

  afterEach(() => {
    root.innerHTML = '';
  })

  describe('mount()', () => {
    describe('creating a DOM node by type', () => {
      it('should return a <div> DOM element', () => {
        const domComponent = new DOMComponent(divElement);
        const domNode = domComponent.mount();

        expect(getNodeMountedToUI(domNode)).to.contain('</div>')
      });

      it('should return a <p> DOM element', () => {
        const domComponent = new DOMComponent(paragraphElement);
        const domNode = domComponent.mount();

        expect(getNodeMountedToUI(domNode)).to.contain('</p>')
      });
    })

    describe('setting attributes on DOM nodes', () => {
      it('should set attributes specified in props', () => {
        const domComponent = new DOMComponent(paragraphElement);
        const domNode = domComponent.mount();

        expect(getNodeMountedToUI(domNode)).to.contain(`<p id="${idForParagraph}">`)
      })
    })

    describe('handling child Elements', () => {
      it('should render one string literal child element', () => {
        const divElementWithOneChild = {
          type: 'div',
          props: {
            children: 'I am a div!'
          }
        };

        const domComponent = new DOMComponent(divElementWithOneChild);
        const domNode = domComponent.mount();

        expect(getNodeMountedToUI(domNode)).to.equal('<div>I am a div!</div>')
      })

      it('should render and attach its children elements', () => {
        const divElementWithTwoChildren = {
          type: 'div',
          props: {
            children: [
              headerElement,
              paragraphElement
            ]
          }
        };
        const domComponent = new DOMComponent(divElementWithTwoChildren);
        const domNode = domComponent.mount();

        expect(getNodeMountedToUI(domNode)).
        to.equal(
          '<div>'                           +
            '<h1>text inside element</h1>'  +
            '<p id="paragraph-element">'    +
              'text inside element'         +
            '</p>'                          +
          '</div>'
        )
      })
    })
  })
})

describe('render()', () => {
  it('should attach a DOM node, described by an Element, to the container DOM node', () => {
    const divElementWithTwoChildren = {
      type: 'div',
      props: {
        children: [
          headerElement,
          divElement
        ]
      }
    };

    Deact.render(divElementWithTwoChildren, document.getElementById('root'));

    expect(document.getElementById('root').innerHTML).to.equal(
      '<div>'                           +
        '<h1>text inside element</h1>'  +
        '<div>'    +
          '<p id="paragraph-element">'    +
            'text inside element'         +
          '</p>'                          +
        '</div>'    +
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
}

const root = document.getElementById('root');
const mountedByDeact = root.innerHTML;
