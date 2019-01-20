const React = require('react');

class Error extends React.Component {
  render() {
    setTimeout(() => {
      this.props.resetError();
    }, 3000);

    return (
      <div className="notification is-danger error is-size-7">
        <p>An error occurred. Please refresh and try again.</p>
        <code>{this.props.error}</code>
      </div>
    );
  }
}

module.exports = Error;
