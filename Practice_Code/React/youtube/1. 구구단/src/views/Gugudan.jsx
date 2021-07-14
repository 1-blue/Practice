const React = require("react");

const Title = require("../components/Title.jsx");
const Form = require("../components/Form.jsx");
const Result = require("../components/Result.jsx");

class Gugudan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first: Math.floor(Math.random() * 9),
      second: Math.floor(Math.random() * 9),
      inputValue: "",
      result: "",
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
  
    if (this.state.first * this.state.second === +this.state.inputValue) {
      this.setState((prevState) => ({
        first: Math.floor(Math.random() * 9),
        second: Math.floor(Math.random() * 9),
        inputValue: "",
        result: `정답!! (${prevState.first} X ${prevState.second} = ${prevState.first * prevState.second})`,
      }))
      return;
    }
    this.setState({
      inputValue: "",
      result: "오답",
    })
  }

  onChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  render() {
    return (
      <>
        <Title first={this.state.first} second={this.state.second} />
        <Form inputValue={this.state.inputValue} onSubmit={this.onSubmit} onChange={this.onChange} />
        <Result result={this.state.result} />
      </>
    )
  }
}

module.exports = Gugudan;