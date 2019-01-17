const React = require('react');

const Overview = require('./Overview');
const Filter = require('./Filter');
const TagList = require('./TagList');

class Sidebar extends React.Component {
  render() {
    return (
      <aside className="column is-one-quarter sidebar">
        <Overview
          tasks={this.props.tasks}
        />

        <hr />

        <Filter
          filterTerm={this.props.filterTerm}
          handleFilterChange={this.props.taskHandlers.handleFilterChange}
        />

        <hr />

        <TagList
          tags={this.props.tags}
          filterTag={this.props.filterTag}
          tagHandlers={this.props.tagHandlers}
        />

        <hr />
      </aside>
    );
  }
}

module.exports = Sidebar;
