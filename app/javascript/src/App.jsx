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
      error: null
    }

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    // Fetch tasks
    api.getTasks()
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            tasks: res
          });
        },
        err => {
          this.setState({
            error: err
          });
        }
      );

    // Fetch tags
    api.getTags()
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            tags: res
          });
        },
        err => {
          this.setState({
            error: err
          });
        }
      );
  }

  render() {
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
