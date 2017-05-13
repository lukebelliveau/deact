export class DOMComponent {
  constructor(element) {
    this.currentElement = element;
  }
  mount() {
    const type = this.currentElement.type;
    const props = this.currentElement.props;
    const node = document.createElement(type);

    Object.keys(props).forEach(propName => {
      /*
        For a host component, any non-child prop is to be
        assigned directly to the host element.
      */
      if(propName !== 'children') {
        node.setAttribute(propName, props[propName])
      }
    })

    /*
      It is convenient to be able to work with the children
      as an array, though React.createElement does not automatically
      create an array if there is one child. We address that here.
    */
    var children = props.children || [];
    if (!Array.isArray(children)) {
      children = [children];
    };

    /*
      Instantiate an instance of the child element.

      The 'else' condition here is for string literal children,
      like the text in <div>Hello World!</div>. React handles
      this much differently, and is out of scope for this lesson.
    */
    const renderedChildElements = children.map((childElement) => {
      if(childElement.type) return new DOMComponent(childElement);
      else return { mount: () => (childElement) };
    });

    /*
      Recurse through the element tree.
    */
    const childNodes = renderedChildElements.map(child => child.mount());

    /*
      Append all child nodes to our node.

      Again, the 'else' case is for the purposes of demonstration
      and differs from React.
    */
    childNodes.forEach(childNode => {
      if(typeof childNode !== 'string') node.appendChild(childNode)
      else {
        node.innerHTML += childNode;
      }
    });

    /*
      Note that at the top-level DOMComponent, this will
      return an entire DOM tree to be attached to the document's
      container node, like <div id="root" />
    */
    return node;
  }
}

/*
  Analogous to ReactDOM.render().
*/
const render = (element, containerNode) => {
  const mountedTree = new DOMComponent(element).mount();

  containerNode.appendChild(mountedTree);
};

export default {
  render,
}
