import FakeReact from './FakeReact';

const renderDOMNode = (type, props) => {
  var node = document.createElement(type);
  Object.keys(props).forEach(propName => {
    if(propName !== 'children') {
      node.setAttribute(propName, props[propName]);
    }
  });

  return node;
}

const render = (parentReactElement, documentRoot) => {
  documentRoot.appendChild(new FakeReact(renderDOMNode).mount(parentReactElement));
}

export default {
  render,
}
