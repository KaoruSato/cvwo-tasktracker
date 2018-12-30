const React = require('react');

class Search extends React.Component {
  render() {
    return (
      <input
        name="search"
        type="text"
        className="input is-small"
        placeholder="Search for a task"
        value={this.props.tasksFilterTerm}
        onChange={this.props.handleSearchChange}
      />
    );
  }
}

module.exports = Search;
