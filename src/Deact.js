//IGNORE THIS! helper class for string literals. Sorry!!
class Component{constructor(element){if(!element.type)this.mount=()=>{const node = document.createElement('span');node.innerHTML = element;return node;};}};

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

    Object.keys(props).forEach(propName => {
      if(propName !== 'children') node.setAttribute(propName, props[propName])
    });

    return node;
  }
}

/*
  Analogous to ReactDOM.render().
*/
const render = (element, containerNode) => {

};

export default {
  render,
}