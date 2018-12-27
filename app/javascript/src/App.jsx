const React = require('react');

const api = require('./utilities/api');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      tags: [],
      error: null
    }
  }

  componentDidMount() {
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
    return <div>App</div>;
  }
}

module.exports = App;
