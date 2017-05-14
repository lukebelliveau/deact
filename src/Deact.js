/*
* IGNORE THIS!
* Helper class.
*
* Sorry!!
* */
class Component {constructor(element){if(!element.type)this.mount=()=>element;}};


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