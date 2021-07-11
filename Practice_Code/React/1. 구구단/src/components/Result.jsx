const React = require("react");

class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>{this.props.result}</p>
    )
  }
}

module.exports = Result;