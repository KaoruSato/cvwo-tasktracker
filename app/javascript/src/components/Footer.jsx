const React = require('react');

class Footer extends React.Component {
  render() {
    return (
      <footer className="has-text-centered is-size-7">
        by <a href="https://dvrylc.com">@dvrylc</a> &middot; <a href="https://github.com/dvrylc/cvwo-tasktracker">view source</a>
      </footer>
    );
  }
}

module.exports = Footer;
