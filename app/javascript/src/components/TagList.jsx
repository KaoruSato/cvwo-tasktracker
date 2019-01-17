const React = require('react');

const Tag = require('./Tag');
const TagForm = require('./TagForm');

class TagList extends React.Component {
  render() {
    let tagElements = this.props.tags.map(tag => {
      return (
        <Tag
          key={tag.id}
          tag={tag}
          expanded={true}
          filtered={this.props.filterTag === tag.id}
          handleDeleteButton={() => this.props.tagHandlers.handleDeleteButton(tag)}
          handleFilterButton={() => this.props.tagHandlers.handleFilterButton(tag)}
        />
      );
    });

    if (tagElements.length === 0) {
      tagElements = <p className="banner">No tags found.</p>
    }

    return (
      <div className="taglist">
        <TagForm
          tagHandlers={this.props.tagHandlers}
        />

        <div className="field is-grouped is-grouped-multiline">
          {tagElements}
        </div>
      </div>
    );
  }
}

module.exports = TagList;
