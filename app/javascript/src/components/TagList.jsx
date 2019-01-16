const React = require('react');

const Tag = require('./Tag');

class TagList extends React.Component {
  render() {
    const tags = this.props.tags.map(tag => {
      return (
        <Tag
          key={tag.id}
          tag={tag}
          expanded={true}
          handleDeleteButton={() => this.props.tagHandlers.handleDeleteButton(tag.id)}
        />
      );
    });

    return (
      <div className="taglist">
        <div className="buttons">
          <a
            className="button is-small is-outlined is-link is-fullwidth"
            onClick={this.props.tagHandlers.handleNewButton}
          >Add new tag</a>
        </div>

        <div className="field is-grouped is-grouped-multiline">
          {tags}
        </div>
      </div>
    );
  }
}

module.exports = TagList;
