const React = require("react");

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>{this.props.first}곱하기 {this.props.second}는?</p>
    )
  }
}

module.exports = Title;