import FakeReactDOMComponent from './FakeReactDOMComponent';
import FakeReact from '../FakeReact/FakeReact';

//converts a React Element (with type, props) into a DOM node
export const renderDOMNode = (type, props) => {
  var node = document.createElement(type);
  Object.keys(props).forEach(propName => {
    if(propName !== 'children') {
      node.setAttribute(propName, props[propName]);
    }
  });

  return node;
}

//INJECT
const fakeReact = new FakeReact(FakeReactDOMComponent);

//exposed API to render a given React element to a given DOM node
export const render = (element, containerNode) => {
  // Create the top-level internal instance
  var rootComponent = fakeReact.instantiateComponent(element);

  // Mount the top-level component into the container
  var node = rootComponent.mount();
  containerNode.appendChild(node);

  // Return the public instance it provides
  var publicInstance = rootComponent.getPublicInstance();
  return publicInstance;
}

export const createElement = (constructor, props, ...children) => ({
  $$typeof: Symbol.for('react.element'),
  type: constructor,
  props: Object.assign({}, props, { children })
});

export default {
  render,
  createElement
}
