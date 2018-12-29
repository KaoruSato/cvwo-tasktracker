const React = require('react');

const Overview = require('./Overview');

class Sidebar extends React.Component {
  render() {
    return (
      <header className="column is-one-quarter sidebar">
        <Overview
          tasks={this.props.tasks}
        />
      </header>
    );
  }
}

module.exports = Sidebar;
