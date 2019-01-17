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

    const taskElements = filteredTasks.map(task => {
      const tag = this.props.tags.filter(t => t.id === task.tag_id)[0];

      return (
        <Task
          key={task.id}
          task={task}
          tag={tag}
          filterTag={this.props.filterTag}
          handleDoneToggle={(e) => this.props.taskHandlers.handleDoneToggle(task, e)}
          handleEditButton={() => this.props.taskHandlers.handleEditButton(task)}
          handleDeleteButton={() => this.props.taskHandlers.handleDeleteButton(task)}
        />
      );
    });

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
