import FakeReactDOM from './FakeReactDOM/FakeReactDOM';

/*
 REACT STACK RECONCILER EXAMPLE
 This is a basic demo of some core concepts explained in React's
 Implementation Notes docs:
 https://facebook.github.io/react/contributing/implementation-notes.html

 3 main files
 -FakeReact.js: Stack Reconciler-esque classes for mounting functional composite and DOM host elements
 -FakeReactDOM.js: has methods to render DOM host nodes and top-level React nodes
 -renderDOM.jsx: custom components and renders of these components

 Please note that while this demonstrates the basic logic of React's stack reconciler,
 the real implementation is much different. Also, my intention is to demonstrate
 the logic of the reconciler, and not that of ReactDOM.
*/

/*
 const Hello = ({ name }) => (
  <div>name</div>
 )
 TRANSPILES TO......

 const Hello = ({ name }) =>
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
const AppAsElement = () => (
  <div>
    <Header />
    <HelloReact />
  </div>
);
TRANSPILES TO......

const AppAsElement = React.createElement(
  'div',
  null,
  [
    Header(),
    HelloReact()
  ]
);
WHICH RETURNS AN OBJECT LIKE THE ONE CREATED HERE...
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

FakeReactDOM.render(
  AppAsElement(),
  document.getElementById('root')
)
