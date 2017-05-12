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
  <input onChange={ props.onChange }></input>
)

const Compliment = (props) => (
  <h1>
    { props.userName }, you really are
    something special. I can't even.
    I love you!
  </h1>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
