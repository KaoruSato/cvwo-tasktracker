const React = require("react");

class TagForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: {
        title: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      tag: {
        title: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.tagHandlers.handleCreate(this.state.tag);

    // Reset form
    this.setState({
      tag: {
        title: ""
      }
    });
  }

  render() {
    return (
      <form
        className="columns is-mobile tagform"
        onSubmit={this.handleSubmit}
      >

        <div className="column is-9">
          <input
            name="title"
            type="text"
            placeholder="Add new tag"
            className="input is-small"
            value={this.state.tag.title}
            onChange={this.handleChange}
          />
        </div>

        <div className="column is-3">
          <button
            type="submit"
            className="button is-small is-outlined is-primary is-fullwidth"
            value="Save"
          >
            <span className="icon">
              <i className="fas fa-check"></i>
            </span>
          </button>
        </div>
      </form>
    );
  }
}

module.exports = TagForm;
