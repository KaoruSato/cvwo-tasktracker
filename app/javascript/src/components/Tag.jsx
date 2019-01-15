const React = require('react');

class Tag extends React.Component {
  render() {
    if (this.props.expanded) {
      return (
        <div className="control">
          <div className="tags has-addons">
            <a className="tag is-light">{this.props.tag.title}</a>
            <a className="tag is-delete" onClick={this.props.handleDeleteButton}></a>
          </div>
        </div>
      );
    } else {
      return (
        <span className="tag is-light">{this.props.tag.title}</span>
      );
    }
  }
}

module.exports = Tag;
