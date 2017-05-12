import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <Greeting />
)

class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }
  updateName(event) {
    this.setState({
      name: event.target.value
    })
  }
  componentWillMount() {
    this.setState({
      name: 'Hey you'
    })
  }
  render() {
    return (
      <div>
        <NameBox onChange={(event) => this.updateName(event)}/>
        <Compliment userName={this.state.name}/>
      </div>
    )
  }
}

const NameBox = (props) => (
  <input onChange={ props.onChange }/>
)

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

const shiasComplimentElement = makeAComplimentForShia();
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

console.log(shiasComplimentElement)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
