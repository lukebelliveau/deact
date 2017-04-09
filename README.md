# React Reconciler Demo

inside `src/` is a very simple implementation of React's stack reconciler, and a stand-in for
ReactDOM's render() method.

This is much different than the actual implementation, and was meant to demonstrate the concepts described in the [implementation notes](https://facebook.github.io/react/contributing/implementation-notes.html).

This is a WIP, and does not support Component classes or updates yet. This means that as of now, all it does is renders the initial view, given that the view is composed entirely of functional components and host elements.

`FakeReact.js` contains methods to mount Host and Composite elements, ultimately returning a tree of DOM nodes.

`FakeReactDOM.js`, most importantly, contains the render() method that attaches your React tree to the DOM.

`renderDOM.jsx` contains some custom React elements and renders them in different ways.

<h3>scripts</h3>
prefix with `yarn` or `npm run`


bundle it up with `yarn webpack`

run: `yarn start`
