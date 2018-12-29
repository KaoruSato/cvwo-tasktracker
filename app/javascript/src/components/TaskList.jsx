const React = require('react');

const Task = require('./Task');

class TaskList extends React.Component {
  render() {
    const tasks = this.props.tasks.map(task => {
      return (
        <Task
          key={task.id}
          task={task}
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
