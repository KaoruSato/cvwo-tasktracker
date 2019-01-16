const React = require('react');

const api = require('./utilities/api');
const tagHandlers = require('./handlers/tagHandlers');
const taskHandlers = require('./handlers/taskHandlers');

const Sidebar = require('./components/Sidebar');
const TaskList = require('./components/TaskList');

const TaskModal = require('./components/TaskModal');
const TagModal = require('./components/TagModal');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      tags: [],

      filterTerm: '',
      filterTag: null,

      isLoading: true,

      taskModalID: null,
      taskModalOpen: false,

      tagModalOpen: false
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
            tasks: res.tasks.sort((a, b) => b.id < a.id ? -1 : 1),
            tags: res.tags.sort((a, b) => b.id < a.id ? -1 : 1),
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
      taskModalOpen: false,

      tagModalOpen: false
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

    let tagModal;
    if (this.state.tagModalOpen) {
      tagModal = (
        <TagModal
          tagModalOpen={this.state.tagModalOpen}
          resetModals={this.resetModals}

          tagHandlers={tagHandlers(this)}
        />
      );
    }

    return (
      <div className="columns">
        <Sidebar
          tasks={this.state.tasks}
          tags={this.state.tags}
          tagHandlers={tagHandlers(this)}
          filterTag={this.state.filterTag}
        />

        <TaskList
          tasks={this.state.tasks}
          tags={this.state.tags}
          filterTerm={this.state.filterTerm}
          filterTag={this.state.filterTag}
          taskHandlers={taskHandlers(this)}
        />

        {taskModal}
        {tagModal}
      </div>
    );
  }
}

module.exports = App;
