const api = require('../utilities/api');

const tagHandlers = (env) => {
  return {
    handleTagDelete: (id) => {
      env.setState(state => {
        return {
          tags: state.tags.filter(tag => tag.id !== id)
        }
      });

      api.deleteTag(id)
        .then(
          _ => {
            env.fetchAll();
          },
          err => {
            console.error(err);
          }
        );
    }
  }
}

module.exports = tagHandlers;
