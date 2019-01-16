const React = require('react');

class Filter extends React.Component {
  render() {
    return (
      <input
        name="search"
        type="text"
        className="input is-small"
        placeholder="Filter tasks"
        value={this.props.filterTerm}
        onChange={this.props.handleFilterChange}
      />
    );
  }
}

module.exports = Filter;
