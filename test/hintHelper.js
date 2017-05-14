export default (assertion, hint) => {
  const hintText = hint || '';
  try{
    assertion()
} catch(e) {
    throw new Error(
      e + '\n\t' +
      '**HINT**: ' + hintText
    )
  }
}

export const compositeFunctionalDOMTreeHint =
  'Recall that functional components, like <Header />, render an element when they are invoked. We must do the following:\n\t\t' +
  '1. Render functionCompositeComponent\'s element, Header, by invoking Header(props):\n\t\t\t' +
  'const renderedElement = this.currentElement.type(props)\n\t\t' +
  '2. Instantiate a new class based on this element:\n\t\t\t' +
  'const instance = instantiateComponent(renderedElement)\n\t\t' +
  '3. Mount and return the instance. This recusive call will dig down the element tree and eventually return a DOM tree:\n\t\t\t' +
  'return instance.mount()';

export const classAsFunctionHint =
  'You may be trying to call type(props) directly, like we do for functional components.\n\t\tTry instantiating it with `new type(props)`, then calling its render() method instead.\n\t\tUse Deact\'s isClass() method to determine if you have a function or class component.'