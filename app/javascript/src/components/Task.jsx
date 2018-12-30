const React = require('react');

class Task extends React.Component {
  render() {
    const task = this.props.task;

    return (
      <div className="media task">
        <div className="media-left">
          <input
            name="done"
            type="checkbox"
            checked={task.done}
            onChange={this.props.handleDoneToggle}
          />
        </div>

        <div className="media-content">
          <span>{task.title}</span>
        </div>

        <div className="media-right buttons">
          <a
            className="button is-small is-outlined is-link"
            onClick={this.props.handleEditButton}
          >Edit</a>

          <a className="button is-small is-outlined is-danger">Delete</a>
        </div>
      </div>
    );
  }
}

module.exports = Task;
