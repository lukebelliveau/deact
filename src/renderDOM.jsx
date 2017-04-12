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
 */
const Hello = ({ name }) => (
    FakeReactDOM.createElement('div', {}, 'Hello ' + name + '!')
);

/*
 const HelloReact = () => <Hello name='React' />
 */
const HelloReact = () => (
    FakeReactDOM.createElement(Hello, { name: 'React' })
);

/*
 const Header = () => <h1>Naive React Reconciler<h1 />
 */
const Header = () => (
    FakeReactDOM.createElement('h1', {}, 'Naive React Reconciler')
);

/*
const AppAsElement = () => (
  <div>
    <Header />
    <HelloReact />
  </div>
);
*/
const AppAsElement = () => (
    FakeReactDOM.createElement('div', {}, Header(), HelloReact())
);

FakeReactDOM.render(
  AppAsElement(),
  document.getElementById('root')
)
