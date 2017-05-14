//IGNORE THIS! helper class for string literals. Sorry!!
class Component{constructor(element){if(!element.type)this.mount=()=>{const node = document.createElement('span');node.innerHTML = element;return node;};}};

export class DOMComponent extends Component {
  constructor(element) {
    //for demo purposes only.
    super(element);


  }

  mount() {

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