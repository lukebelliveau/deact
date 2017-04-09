import FakeReactDom from './FakeReactDOM';
/*
 REACT STACK RECONCILER EXAMPLE
 This is a basic demo of some core concepts explained in React's
 Implementation Notes docs:
 https://facebook.github.io/react/contributing/implementation-notes.html

 This is divided into three sections
 -ReactDOM-esque render methods
 -Reconciler methods for mounting functional composite and DOM host elements
 -Two custom components, Hello (host element) and HelloReact (functional composite element)

 Please note that while this demonstrates the basic logic of React's stack reconciler,
 the real implementation is much different. Also, my intention is to demonstrate
 the logic of the reconciler, and not that of ReactDOM.

 As of now, this does not support class elements or updates.


/*
 CUSTOM COMPONENTS
 ***************************************
 ***************************************
 */

//Hello and HelloReact consts resemble the output of a React.createElement() call

/*
 const Hello = ({ name }) => (
 <div>name</div>
 )
 TRANSPILES TO......

 const Hello = (name) =>
 React.createElement(
 'div',
 null,
 'Hello ' + name + '!'
 )
 WHICH RETURNS AN OBJECT LIKE...
 */
const Hello = ({ name }) => ({
  $$typeof: Symbol.for('react.element'),
  type: 'div',
  props: {
    children: 'Hello ' + name + '!'
  },
});

/*
 const HelloReact = () => <Hello name='React' />
 TRANSPILES TO......

 const HelloReact = React.createElement(
 Hello,
 {name: 'React'}
 )
 WHICH RETURNS AN OBJECT LIKE...
 */
const HelloReact = () => ({
  $$typeof: Symbol.for('react.element'),
  type: Hello,
  props: {
    name: 'React',
  },
})

const Header = () => ({
  $$typeof: Symbol.for('react.element'),
  type: 'h1',
  props: {
    children: 'Naive React Reconciler'
  }
})


/*
 RENDER FUNCTIONS
 explanation at bottom
 */
const AppAsElement = () => ({
  $$typeof: Symbol.for('react.element'),
  type: 'div',
  props: {
    children: [
      Header(),
      HelloReact()
    ]
  }
});
const renderElementWithFunctionCall = () => FakeReactDom.render(
  AppAsElement(),
  document.getElementById('root')
)
//OR:
const renderElementWithJSX = () => FakeReactDom.render(
  <AppAsElement />,
  document.getElementById('root')
);

const AppAsJSX = () => (
  <div>
    <Header />
    <HelloReact />
  </div>
)
const renderJSXWithHelloReactComponent = () => FakeReactDom.render(
  <AppAsJSX />,
  document.getElementById('root')
);



const AppAsJSX2 = () => (
  <div>
    <Header />
    <Hello name="React" />
  </div>
)
const renderJSXWithHelloComponentAndProp = () => FakeReactDom.render(
  <AppAsJSX2 />,
  document.getElementById('root')
);

/*
 Each of these calls ultimately render the same thing to the page.
 Comment all but one, or uncomment multiple to see the same thing rendered multiple times.
 I made these different render functions to demonstrate the different ways you can
 instantiate elements, and how in the end, they are just plain old objects.
 */
renderElementWithFunctionCall();
// renderElementWithJSX();
// renderJSXWithHelloReactComponent();
// renderJSXWithHelloComponentAndProp();