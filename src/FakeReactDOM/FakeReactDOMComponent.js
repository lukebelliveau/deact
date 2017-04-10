import { renderDOMNode } from './FakeReactDOM';

export default class DOMComponent {
  constructor(element, react) {
    this.currentElement = element;
    this.renderedChildren = [];
    this.node = null;
    this.react = react;
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

    // // Collect DOM nodes they return on mount
    children.forEach(childElement => {
      if(childElement.type) {
        const childNode = this.react.instantiateComponent(childElement).mount();
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
