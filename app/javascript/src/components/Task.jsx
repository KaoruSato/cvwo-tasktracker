const React = require('react');

class Task extends React.Component {
  render() {
    const task = this.props.task;

    return (
      <div className="media">
        <div className="media-left">
          <input
            name="done"
            type="checkbox"
            checked={task.done}
            onChange={this.props.handleToggle}
          />
        </div>

        <div className="media-content">
          <span>{task.title}</span>
        </div>

        <div className="media-right buttons">
          <a className="button is-small is-link is-outlined">Edit</a>
          <a className="button is-small is-danger is-outlined">Delete</a>
        </div>
      </div>
    );
  }
}

module.exports = Task;
