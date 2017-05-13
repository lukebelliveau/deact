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
    fakeInnerText: textInsideElement
    /*
      We're going to cheat here and pretend
      innerText is a special property of host
      elements, like <p>innerText</p>.
      In reality, they are listed in
      props.children, as commeted out below.
    */
    // children: [
    //   text
    // ]
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
    fakeInnerText: textInsideElement
    /*
      Cheating with the native child elements
      again. Sorry!
    */
    // children: [
    //   text
    // ]
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

      it('should set the DOM element\s innerHTML to the innerText prop', () => {
        //NOTE: don't set innerHTML, it's bad, for demo purposes only
        const domComponent = new DOMComponent(paragraphElement);
        const domNode = domComponent.mount();

        expect(getNodeMountedToUI(domNode)).to.equal(`<p id="${idForParagraph}">${textInsideElement}</p>`)
      });
    })

    describe('handling child Elements', () => {
      const divElementWithTwoChildren = {
        type: 'div',
        props: {
          children: [
            headerElement,
            paragraphElement
          ]
        }
      };
      it('should render and attach its children elements', () => {
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
