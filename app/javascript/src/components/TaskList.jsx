const React = require('react');

const Task = require('./Task');
const TaskListBar = require('./TaskListBar');

class TaskList extends React.Component {
  render() {
    let filteredTasks = this.props.tasks;

    if (this.props.filterTerm !== '') {
      filteredTasks = filteredTasks.filter(t => t.title.toUpperCase().includes(this.props.filterTerm.toUpperCase()));
    }

    if (this.props.filterTag) {
      filteredTasks = filteredTasks.filter(t => t.tag_id === this.props.filterTag);
    }

    const tasksEl = filteredTasks.map(task => {
      const tag = this.props.tags.filter(tag => tag.id === task.tag_id)[0];

      return (
        <Task
          key={task.id}
          task={task}
          tag={tag}
          filterTag={this.props.filterTag}
          handleDoneToggle={(e) => this.props.taskHandlers.handleDoneToggle(task.id, e)}
          handleEditButton={() => this.props.taskHandlers.handleEditButton(task.id)}
          handleDeleteButton={() => this.props.taskHandlers.handleDeleteButton(task.id)}
        />
      );
    });

    return (
      <main className="column tasklist">
        <TaskListBar
          filterTerm={this.props.filterTerm}
          taskHandlers={this.props.taskHandlers}
        />

        {tasksEl}
      </main>
    );
  }
}

module.exports = TaskList;
