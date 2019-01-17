const React = require('react');

class Filter extends React.Component {
  render() {
    return (
      <input
        name="search"
        type="text"
        value={this.props.filterTerm}
        placeholder="Search"
        className="input is-small"
        onChange={this.props.handleFilterChange}
      />
    );
  }
}

module.exports = Filter;
