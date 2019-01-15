const React = require('react');

const Tag = require('./Tag');

class Task extends React.Component {
  render() {
    const task = this.props.task;

    let tagEl;
    if (this.props.tag) {
      tagEl = <Tag tag={this.props.tag} />;
    }

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

          {tagEl}
        </div>

        <div className="media-right buttons">
          <a
            className="button is-small is-outlined is-link"
            onClick={this.props.handleEditButton}
          >Edit</a>

          <a
            className="button is-small is-outlined is-danger"
            onClick={this.props.handleDeleteButton}
          >Delete</a>
        </div>
      </div>
    );
  }
}

module.exports = Task;
