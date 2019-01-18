const React = require('react');

const Task = require('./Task');
const TaskForm = require('./TaskForm');

class TaskList extends React.Component {
  render() {
    let filteredTasks = this.props.tasks;

    if (this.props.filterTerm !== '') {
      filteredTasks = filteredTasks.filter(t => t.title.toUpperCase().includes(this.props.filterTerm.toUpperCase()));
    }

    if (this.props.filterTag) {
      filteredTasks = filteredTasks.filter(t => t.tag_id === this.props.filterTag);
    }

    let taskElements = filteredTasks.map(task => {
      const tag = this.props.tags.filter(t => t.id === task.tag_id)[0];

      return (
        <Task
          key={task.id}
          tags={this.props.tags}
          task={task}
          tag={tag}
          filterTag={this.props.filterTag}
          taskHandlers={this.props.taskHandlers}
          tagHandlers={this.props.tagHandlers}
          handleDoneToggle={(e) => this.props.taskHandlers.handleDoneToggle(task, e)}
          handleDeleteButton={() => this.props.taskHandlers.handleDeleteButton(task)}
        />
      );
    });

    if (taskElements.length === 0) {
      taskElements = <p className="banner">No tasks found.</p>;
    }

    return (
      <main className="column tasklist">
        <TaskForm
          tags={this.props.tags}
          taskHandlers={this.props.taskHandlers}
        />

        {taskElements}
      </main>
    );
  }
}

module.exports = TaskList;
