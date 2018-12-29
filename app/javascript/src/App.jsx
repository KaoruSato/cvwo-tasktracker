const React = require('react');

const api = require('./utilities/api');
const tagHandlers = require('./handlers/tagHandlers');

const Sidebar = require('./components/Sidebar');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      tags: [],
      isLoading: true
    }

    this.fetchAll = this.fetchAll.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    this.fetchTags = this.fetchTags.bind(this);
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    Promise.all([this.fetchTasks(), this.fetchTags()])
      .then(r => {
        this.setState({
          isLoading: false
        });
      });
  }

  fetchTasks() {
    return api.getTasks()
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            tasks: res
          });
        },
        err => {
          console.error(err);
        }
      )
  }

  fetchTags() {
    return api.getTags()
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            tags: res
          });
        },
        err => {
          console.error(err);
        }
      );
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="columns">
        <Sidebar
          tasks={this.state.tasks}
          tags={this.state.tags}
          tagHandlers={tagHandlers(this)}
        />

        <div className="column">Content</div>
      </div>
    );
  }
}

module.exports = App;
