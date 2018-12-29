const React = require('react');

class Overview extends React.Component {
  render() {
    const outstanding = this.props.tasks.filter(t => !t.done).length;

    return (
      <div className="has-text-centered overview">
        <h1>
          <span className="is-size-1">{outstanding}</span>
          outstanding tasks
        </h1>
      </div>
    );
  }
}

module.exports = Overview;
