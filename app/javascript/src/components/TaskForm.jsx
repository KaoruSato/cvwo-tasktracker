const React = require('react');

class TaskForm extends React.Component {
  constructor(props) {
    super(props);

    // If editing task, initial state comes from props
    if (this.props.task) {
      const task = Object.assign({}, this.props.task);

      // Fix empty tag
      if (!task.tag_id) {
        task.tag_id = '';
      }

      this.state = {
        task: task
      }
    } else {
      this.state = {
        task: {
          id: null,
          title: '',
          done: false,
          tag_id: ''
        }
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

    if (this.props.task) {
      this.props.taskHandlers.handleUpdate(this.state.task);

      this.props.handleCancelButton();
    } else {
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
  }

  render() {
    const tagElements = this.props.tags.map(t => {
      return <option key={t.id} value={t.id}>{t.title}</option>;
    });

    let buttons;
    if (this.props.task) {
      buttons = (
        <div className="buttons">
          <button
            type="button"
            className="button is-small is-outlined is-link"
            onClick={this.props.handleCancelButton}
          >
            <span className="icon">
              <i className="fas fa-undo"></i>
            </span>
          </button>

          <button
            type="submit"
            className="button is-small is-outlined is-primary"
          >
            <span className="icon">
              <i className="fas fa-check"></i>
            </span>
          </button>
        </div>
      );
    } else {
      buttons = (
        <div className="buttons">
          <button
            type="submit"
            className="button is-small is-outlined is-primary"
            value="Save"
          >
            <span className="icon">
              <i className="fas fa-check"></i>
            </span>
          </button>
        </div>
      );
    }

    return (
      <form
        className="taskform media"
        onSubmit={this.handleSubmit}
      >
        <div className="media-content">
          <div className="columns is-mobile">
            <div className="column is-8">
              <input
                name="title"
                type="text"
                value={this.state.task.title}
                placeholder="Add new task"
                className="input is-small"
                onChange={this.handleChange}
              />
            </div>

            <div className="column is-4">
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
          </div>
        </div>

        <div className="media-right">
          {buttons}
        </div>
      </form>
    );
  }
}

module.exports = TaskForm;
