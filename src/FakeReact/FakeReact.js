import CompositeComponent from './CompositeComponent';

export default class FakeReact {
  constructor(injectedHostComponent) {
    //in this example, FakeReactDOMComponent is injected as HostComponent
    this.HostComponent = injectedHostComponent;
  }

  instantiateComponent(element) {
    var type = element.type;
    if (typeof type === 'function') {
      // User-defined components
      return new CompositeComponent(element, this);
    } else if (typeof type === 'string') {
      // Platform-specific components
      return new this.HostComponent(element, this)
    }
  }
}
