
class FakeReact {
  constructor(renderDOMNode) {
    this.renderDOMNode = renderDOMNode;
  }

  mountFunctionalComposite(element) {
    //this will mount functional composite components (like HelloReact, AppAs*)
    //examples in these comments trace the results of calling mountFunctionalComposite(HelloReact())
    var type = element.type;
    /*
     = Hello
     = ({ name }) => { type: 'div' ... }
     */
    var props = element.props;
    /*
     = {
     name: 'React'
     }
     */

    var renderedElement;

    if (typeof type === 'function') {
      renderedElement = type(props);
      //              = Hi({ name: 'React' })
    }

    //this, in turn, calls mountHost(renderedElement)
    return this.mount(renderedElement);
  }

  mountHost (element)  {
    //mounts Host elements, like Hello, which is of type <div>
    //examples in these comments trace the results of calling mountHost(Hello(props))
    var type = element.type;
    var props = element.props;
    var children = props.children || [];
    if (!Array.isArray(children)) {
      children = [children];
    }
    children = children.filter(Boolean);

    var node = this.renderDOMNode(type, props);

    children.forEach(childElement => {


      let childNode;
      if(childElement.type) {
        //recursively call mount if child elements
        childNode = this.mount(childElement)
        node.appendChild(childNode);
      } else {
        //the Hello component has one child, a string to be placed inside of the <div>
        childNode = document.createTextNode(childElement);
        node.appendChild(childNode)
      }
    });

    return node;
  }

  mount(element) {
    var type = element.type;
    if(typeof type === 'function') {
      return this.mountFunctionalComposite(element);
    } else if (typeof type === 'string') {
      return this.mountHost(element);
    }
  }
}

export default FakeReact;