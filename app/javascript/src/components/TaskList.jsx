const React = require('react');

const Task = require('./Task');
const TaskListBar = require('./TaskListBar');

class TaskList extends React.Component {
  render() {
    const tasks = this.props.tasks.map(task => {
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
          handleNewButton={this.props.taskHandlers.handleNewButton}
        />

        {tasks}
      </main>
    );
  }
}

module.exports = TaskList;
