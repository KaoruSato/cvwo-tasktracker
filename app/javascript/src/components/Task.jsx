const React = require('react');

const Tag = require('./Tag');

class Task extends React.Component {
  render() {
    const task = this.props.task;

    let tagElement;
    if (this.props.tag) {
      tagElement = (
        <Tag
          tag={this.props.tag}
          filtered={this.props.filterTag === this.props.tag.id}
        />
      );
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

          {tagElement}
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
