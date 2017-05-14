import React from 'react';
import ReactDOM from 'react-dom';

const Compliment = ({ userName }) => (
  <h1>
    { userName }, you really are
    something special. I can't even.
    I love you!
  </h1>
);

const makeAComplimentForShia = () => {
  const shiaProps = {
    userName: 'Shia LeBouf',
  };
  return Compliment(shiaProps);
}

/*
*
* Try commenting out the makeAComplimentForShia() function call and uncommenting the element.
* We can pass a pure element to ReactDOM.render(), and it will still render!
*
* */
const shiasComplimentElement =
makeAComplimentForShia();
// {
//   type:"h1",
//   props:{
//     children:[
//       "Shia LeBouf",
//       ", you really are something special. I can't even. I love you!"
//     ]
//   },
//   key:null,
//   ref:null,
//   $$typeof:Symbol.for("react.element"),
//   _owner:null,
//   _store:{}
// }

ReactDOM.render(
  shiasComplimentElement,
  document.getElementById('root')
)
