const React = require('react');

const Task = require('./Task');

class TaskList extends React.Component {
  render() {
    const tasks = this.props.tasks.map(task => {
      return (
        <Task
          key={task.id}
          task={task}
          handleChange={(e) => this.props.taskHandlers.handleChange(task.id, e)}
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
