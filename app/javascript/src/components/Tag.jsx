const React = require('react');

class Tag extends React.Component {
  render() {
    const tagColor = this.props.filtered ? 'is-success' : 'is-light';

    if (this.props.expanded) {
      return (
        <div className="control">
          <div className="tags has-addons">
            <a className={"tag " + tagColor} onClick={this.props.handleFilter}>{this.props.tag.title}</a>
            <a className="tag is-delete" onClick={this.props.handleDeleteButton}></a>
          </div>
        </div>
      );
    } else {
      return (
        <span className={"tag " + tagColor}>{this.props.tag.title}</span>
      );
    }
  }
}

module.exports = Tag;
