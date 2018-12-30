const React = require('react');

const Task = require('./Task');
const TaskListBar = require('./TaskListBar');

class TaskList extends React.Component {
  render() {
    const tasksEl = this.props.tasks.filter(t => t.title.includes(this.props.tasksFilterTerm)).map(task => {
      return (
        <Task
          key={task.id}
          task={task}
          handleDoneToggle={(e) => this.props.taskHandlers.handleDoneToggle(task.id, e)}
          handleEditButton={() => this.props.taskHandlers.handleEditButton(task.id)}
          handleDeleteButton={() => this.props.taskHandlers.handleDeleteButton(task.id)}
        />
      );
    });

    return (
      <main className="column tasklist">
        <TaskListBar
          tasksFilterTerm={this.props.tasksFilterTerm}
          taskHandlers={this.props.taskHandlers}
        />

        {tasksEl}
      </main>
    );
  }
}

module.exports = TaskList;
