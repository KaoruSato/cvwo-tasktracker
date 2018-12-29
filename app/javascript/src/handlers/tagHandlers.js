const api = require('../utilities/api');

const tagHandlers = (env) => {
  return {
    handleTagDelete: (id) => {
      api.deleteTag(id)
        .then(
          _ => {
            env.fetchData();
          },
          err => {
            console.error(err);

            env.setState({
              error: err
            });
          }
        );
    }
  }
}

module.exports = tagHandlers;
