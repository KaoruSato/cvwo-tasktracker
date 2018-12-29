const React = require('react');

class Task extends React.Component {
  render() {
    return (
      <div className="media">
        <div className="media-left">
          <input type="checkbox" />
        </div>

        <div className="media-content">
          <span>{this.props.task.title}</span>
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
