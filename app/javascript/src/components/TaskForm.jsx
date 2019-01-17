const React = require('react');

class TaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: {
        id: null,
        title: '',
        done: false,
        tag_id: ''
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;

    let value;
    if (e.target.type === 'text') {
      value = e.target.value;
    } else {
      value = e.target.value === '' ? '' : parseInt(e.target.value);
    }

    this.setState(oldState => {
      const newState = {
        task: oldState.task
      }
      newState.task[name] = value;

      return newState;
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.taskHandlers.handleCreate(this.state.task);

    // Reset form
    this.setState({
      task: {
        id: null,
        title: '',
        done: false,
        tag_id: ''
      }
    });
  }

  render() {
    const tagElements = this.props.tags.map(t => {
      return <option key={t.id} value={t.id}>{t.title}</option>;
    });

    return (
      <form
        className="columns taskform"
        onSubmit={this.handleSubmit}
      >
        <div className="column is-7">
          <input
            name="title"
            type="text"
            value={this.state.task.title}
            placeholder="Add new task"
            className="input is-small"
            onChange={this.handleChange}
          />
        </div>

        <div className="column is-3">
          <div className="select is-small is-fullwidth">
            <select
              name="tag_id"
              value={this.state.task.tag_id}
              onChange={this.handleChange}
            >
              <option value=''>Untagged</option>
              {tagElements}
            </select>
          </div>
        </div>

        <div className="column is-2">
          <input
            type="submit"
            className="button is-small is-outlined is-link is-fullwidth"
            value="Save"
          />
        </div>
      </form>
    );
  }
}

module.exports = TaskForm;
