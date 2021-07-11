const React = require("react");

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input value={this.props.inputValue} onChange={this.props.onChange}/>
        <button type="submit">submit</button>
      </form>
    )
  }
}

module.exports = Form;