export class DOMComponent {
  constructor(element) {
    this.currentElement = element;
  }
  mount() {
    const type = this.currentElement.type;
    const props = this.currentElement.props;
    const node = document.createElement(type);

    if(props.fakeInnerText) {
      node.innerHTML = props.fakeInnerText
    }

    Object.keys(props).forEach(propName => {
      if(propName !== 'fakeInnerText' && propName !== 'children') {
        node.setAttribute(propName, props[propName])
      }
    })

    if(props.children) {
      const renderedChildElements = props.children.map((childElement) => {
        return new DOMComponent(childElement);
      });

      const childNodes = renderedChildElements.map(child => child.mount());

      childNodes.forEach(childNode => node.appendChild(childNode));
    }
    return node;
  }
}

const render = (element, containerNode) => {
  const mountedTree = new DOMComponent(element).mount();

  console.log(mountedTree);
  containerNode.appendChild(mountedTree);
};

export default {
  render,
}
