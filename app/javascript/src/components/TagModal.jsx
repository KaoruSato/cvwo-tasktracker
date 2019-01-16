const React = require('react');
const Modal = require('react-modal');

Modal.setAppElement('#root');

class TagModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: {
        title: ''
      }
    }

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

    this.props.resetModals();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.tagModalOpen}
        className="common-modal tagmodal"
      >

        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                name="title"
                type="text"
                className="input is-small"
                placeholder="Title"
                value={this.state.tag.title}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <a
                className="button is-small is-outlined"
                onClick={this.props.resetModals}
              >Cancel</a>
            </p>

            <p className="control">
              <input
                type="submit"
                className="button is-small is-outlined is-link"
                value="Save"
              />
            </p>
          </div>
        </form>

      </Modal >
    );
  }
}

module.exports = TagModal;
