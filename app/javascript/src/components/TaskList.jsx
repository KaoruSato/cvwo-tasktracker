const React = require('react');

const Task = require('./Task');

class TaskList extends React.Component {
  render() {
    const tasks = this.props.tasks.map(task => {
      return (
        <Task
          key={task.id}
          task={task}
          handleToggle={(e) => this.props.taskHandlers.handleToggle(task.id, e)}
          handleEdit={() => this.props.taskHandlers.handleEdit(task.id)}
        />
      );
    });

    return (
      <main className="column tasklist">
        {tasks}
      </main>
    );
  }
}

module.exports = TaskList;
