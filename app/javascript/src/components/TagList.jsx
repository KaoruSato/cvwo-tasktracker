const React = require('react');

const Tag = require('./Tag');

class TagList extends React.Component {
  render() {
    const tags = this.props.tags.map(tag => {
      return (
        <Tag
          key={tag.id}
          tag={tag}
          hasDeleteButton={true}
          handleDeleteButton={() => this.props.tagHandlers.handleDeleteButton(tag.id)}
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
