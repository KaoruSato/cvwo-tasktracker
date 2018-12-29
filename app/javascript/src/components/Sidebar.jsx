const React = require('react');

const Overview = require('./Overview');
const TagList = require('./TagList');

class Sidebar extends React.Component {
  render() {
    return (
      <header className="column is-one-quarter sidebar">
        <Overview
          tasks={this.props.tasks}
        />

        <hr />

        <TagList
          tags={this.props.tags}
        />
      </header>
    );
  }
}

module.exports = Sidebar;
