const React = require('react');

const logo = require('../images/logo.png');

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img src={logo} alt="Logo" />
      </header>
    )
  }
}

module.exports = Header;
