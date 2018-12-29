const React = require('react');

const Tag = require('./Tag');

class TagList extends React.Component {
  render() {
    const tags = this.props.tags.map(tag => {
      return (
        <Tag
          key={tag.id}
          tag={tag}
          handleTagDelete={() => this.props.tagHandlers.handleTagDelete(tag.id)}
        />
      );
    });

    return (
      <div className="field is-grouped is-grouped-multiline taglist" >
        {tags}
      </div>
    );
  }
}

module.exports = TagList;
