/*
* IGNORE THIS!
* Helper class.
*
* Sorry!!
* */
class Component {constructor(element){
  if(!element.type)
    this.mount = () => {
      const node = document.createElement('span');
      node.innerHTML = element;
      return node;
    };
}};


export class DOMComponent extends Component {
  constructor(element) {
    //for demo purposes only.
    super(element);

    this.currentElement = element;
  }

  mount() {
    const element = this.currentElement;
    const props = element.props;
    const node = document.createElement(element.type);

    Object.keys(element.props).forEach(propName => {
      if(propName !== 'children') node.setAttribute(propName, props[propName])
    });

    let children = props.children || [];
    if(!Array.isArray(children)) children = [children];

    children.forEach(childElement => {
      const child = new DOMComponent(childElement);
      const mountedChild = child.mount();
      node.appendChild(mountedChild);
    });

    return node;
  }
}

/*
  Analogous to ReactDOM.render().
*/
const render = (element, containerNode) => {
  const domComponentInstance = new DOMComponent(element);
  const node = domComponentInstance.mount();

  containerNode.appendChild(node);
};

export default {
  render,
}