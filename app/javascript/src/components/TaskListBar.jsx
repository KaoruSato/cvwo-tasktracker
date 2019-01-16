const React = require('react');

const Filter = require('./Filter');

class TaskListBar extends React.Component {
  render() {
    return (
      <div className="media tasklistbar">
        <div className="media-content">
          <Filter
            filterTerm={this.props.filterTerm}
            handleFilterChange={this.props.taskHandlers.handleFilterChange}
          />
        </div>

        <div className="media-right">
          <a
            className="button is-small is-outlined is-link"
            onClick={this.props.taskHandlers.handleNewButton}
          >Add new task</a>
        </div>
      </div>
    );
  }
}

module.exports = TaskListBar;
