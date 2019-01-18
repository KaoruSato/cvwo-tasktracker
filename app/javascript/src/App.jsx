const React = require('react');
const _ = require('lodash');

const api = require('./utilities/api');
const tagHandlers = require('./handlers/tagHandlers');
const taskHandlers = require('./handlers/taskHandlers');

const Sidebar = require('./components/Sidebar');
const TaskList = require('./components/TaskList');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,

      tasks: [],
      tags: [],

      filterTerm: '',
      filterTag: null
    }

    this.fetchAll = this.fetchAll.bind(this);
  }

  componentDidMount() {
    this.fetchAll();
  }

  // Fetch all tasks and tags
  fetchAll() {
    api.getAll()
      .then(res => res.json())
      .then(
        res => {
          const newState = {
            tasks: res.tasks.sort((a, b) => b.id < a.id ? -1 : 1),
            tags: res.tags.sort((a, b) => b.id < a.id ? -1 : 1),
            isLoading: false
          }

          // Re-render only if received state is different from current state
          if (
            this.state.isLoading ||
            !_.isEqual(
              newState.tasks.map(t => _.pick(t, ['id', 'title', 'done'])),
              this.state.tasks.map(t => _.pick(t, ['id', 'title', 'done']))
            ) ||
            !_.isEqual(
              newState.tags.map(t => _.pick(t, ['id', 'title'])),
              this.state.tags.map(t => _.pick(t, ['id', 'title']))
            )
          ) {
            this.setState(newState);
          }
        },
        err => {
          console.error(err);
        }
      );
  }

  render() {
    if (this.state.isLoading) {
      return <div className="has-text-centered">Loading...</div>;
    }

    return (
      <div className="columns">
        <Sidebar
          tasks={this.state.tasks}
          tags={this.state.tags}
          filterTerm={this.state.filterTerm}
          filterTag={this.state.filterTag}
          taskHandlers={taskHandlers(this)}
          tagHandlers={tagHandlers(this)}
        />

        <TaskList
          tasks={this.state.tasks}
          tags={this.state.tags}
          filterTerm={this.state.filterTerm}
          filterTag={this.state.filterTag}
          taskHandlers={taskHandlers(this)}
          tagHandlers={tagHandlers(this)}
        />
      </div>
    );
  }
}

module.exports = App;
