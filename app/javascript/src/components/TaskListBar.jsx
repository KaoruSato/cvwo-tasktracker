const React = require('react');

class TaskListBar extends React.Component {
  render() {
    return (
      <div className="media tasklistbar">
        <div className="media-content">
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
