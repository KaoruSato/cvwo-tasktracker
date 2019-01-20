const React = require('react');
const _ = require('lodash');

const api = require('./utilities/api');
const sorter = require('./utilities/sorter');
const tagHandlers = require('./handlers/tagHandlers');
const taskHandlers = require('./handlers/taskHandlers');

const Error = require('./components/Error');
const Header = require('./components/Header');
const Sidebar = require('./components/Sidebar');
const TaskList = require('./components/TaskList');

// Styles
require('bulma');
require('../src/App.scss');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      error: null,

      tasks: [],
      tags: [],

      filterTerm: '',
      filterTag: null
    }

    this.fetchAll = this.fetchAll.bind(this);
    this.resetError = this.resetError.bind(this);
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
          const newState = sorter({
            tasks: res.tasks,
            tags: res.tags,
            isLoading: false
          });

          // Check if new state is different from current state before re-rendering
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
          throw err;
        }
      ).catch(err => {
        this.setState({
          error: err.toString(),
          isLoading: false
        });

        console.error(err);
      });
  }

  resetError() {
    this.setState({
      error: null
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div className="banner">Loading...</div>;
    }

    let error;
    if (this.state.error) {
      error = (
        <Error
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return (
      <div id="app">
        {error}

        <Header />

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
      </div>
    );
  }
}

module.exports = App;
