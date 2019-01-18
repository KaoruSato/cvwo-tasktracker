const React = require('react');

const Tag = require('./Tag');
const TaskForm = require('./TaskForm');

class Task extends React.Component {
  constructor() {
    super();

    this.state = {
      isEditing: false
    }

    this.handleCancelButton = this.handleCancelButton.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
  }

  handleCancelButton() {
    this.setState({
      isEditing: false
    });
  }

  handleEditButton() {
    this.setState({
      isEditing: true
    });
  }

  render() {
    const task = this.props.task;

    let tagElement;
    if (this.props.tag) {
      tagElement = (
        <Tag
          tag={this.props.tag}
          filtered={this.props.filterTag === this.props.tag.id}
          handleFilterButton={() => this.props.tagHandlers.handleFilterButton(this.props.tag)}
        />
      );
    }

    if (this.state.isEditing) {
      return (
        <TaskForm
          task={task}
          tags={this.props.tags}
          taskHandlers={this.props.taskHandlers}
          handleCancelButton={this.handleCancelButton}
        />
      );
    }

    return (
      <div className={task.done ? "media task task-done" : "media task"}>
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
            onClick={this.handleEditButton}
          >
            <span className="icon">
              <i className="fas fa-pencil-alt"></i>
            </span>
          </a>

          <a
            className="button is-small is-outlined is-danger"
            onClick={this.props.handleDeleteButton}
          >
            <span className="icon">
              <i className="fas fa-trash"></i>
            </span>
          </a>
        </div>
      </div>
    );
  }
}

module.exports = Task;
