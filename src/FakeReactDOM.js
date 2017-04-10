import FakeReact, { instantiateComponent } from './FakeReact';

class DOMComponent {
  constructor(element) {
    this.currentElement = element;
    this.renderedChildren = [];
    this.node = null;
  }

  getPublicInstance() {
    // For DOM components, only expose the DOM node.
    return this.node;
  }

  mount() {
    var element = this.currentElement;
    var type = element.type;
    var props = element.props;
    var children = props.children || [];
    if (!Array.isArray(children)) {
      children = [children];
    }

    // Create and save the node
    var node = renderDOMNode(type, props);
    this.node = node;

    // Create and save the contained children.
    // Each of them can be a DOMComponent or a CompositeComponent,
    // depending on whether the element type is a string or a function.
    // var renderedChildren = children.map(instantiateComponent);
    // this.renderedChildren = renderedChildren;

    // // Collect DOM nodes they return on mount
    children.forEach(childElement => {
      if(childElement.type) {
        const childNode = instantiateComponent(childElement, DOMComponent).mount();
        node.appendChild(childNode);
      } else {
        const childNode = document.createTextNode(childElement);
        node.appendChild(childNode);
      }
    });

    // Return the DOM node as mount result
    return node;
  }
}

const renderDOMNode = (type, props) => {
  var node = document.createElement(type);
  Object.keys(props).forEach(propName => {
    if(propName !== 'children') {
      node.setAttribute(propName, props[propName]);
    }
  });

  return node;
}

export const render = (element, containerNode) => {
  const fakeReact = new FakeReact(DOMComponent);

  // Create the top-level internal instance
  var rootComponent = instantiateComponent(element, DOMComponent);

  // Mount the top-level component into the container
  var node = rootComponent.mount();
  containerNode.appendChild(node);

  // Return the public instance it provides
  var publicInstance = rootComponent.getPublicInstance();
  return publicInstance;
}

export default {
  render,
}
