const React = require('react');

class Tag extends React.Component {
  render() {
    let deleteButton;
    if (this.props.hasDeleteButton) {
      deleteButton = <a className="tag is-delete" onClick={this.props.handleDeleteButton}></a>;
    }

    return (
      <div className="control">
        <div className="tags has-addons">
          <a className="tag is-light">{this.props.tag.title}</a>

          {deleteButton}
        </div>
      </div>
    );
  }
}

module.exports = Tag;
