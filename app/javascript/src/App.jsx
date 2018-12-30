const React = require('react');

const api = require('./utilities/api');
const tagHandlers = require('./handlers/tagHandlers');
const taskHandlers = require('./handlers/taskHandlers');

const Sidebar = require('./components/Sidebar');
const TaskList = require('./components/TaskList');
const TaskModal = require('./components/TaskModal');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      tags: [],
      isLoading: true,

      taskModalID: null,
      taskModalOpen: false
    }

    this.fetchAll = this.fetchAll.bind(this);
    this.resetModals = this.resetModals.bind(this);
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    api.getAll()
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            tasks: res.tasks,
            tags: res.tags,
            isLoading: false
          });
        },
        err => {
          console.error(err);
        }
      );
  }

  resetModals() {
    this.setState({
      taskModalID: null,
      taskModalOpen: false
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    let taskModal;
    if (this.state.taskModalOpen) {
      taskModal = (
        <TaskModal
          isOpen={this.state.taskModalOpen}
          taskID={this.state.taskModalID}
          resetModals={this.resetModals}

          tasks={this.state.tasks}
          tags={this.state.tags}
          taskHandlers={taskHandlers(this)}
        />
      );
    }

    return (
      <div className="columns">
        <Sidebar
          tasks={this.state.tasks}
          tags={this.state.tags}
          tagHandlers={tagHandlers(this)}
        />

        <TaskList
          tasks={this.state.tasks}
          taskHandlers={taskHandlers(this)}
        />

        {taskModal}
      </div>
    );
  }
}

module.exports = App;
