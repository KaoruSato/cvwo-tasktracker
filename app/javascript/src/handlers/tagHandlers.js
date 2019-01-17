const api = require('../utilities/api');

module.exports = (env) => {
  const tagHandlers = {
    handleCreate: (tag) => {
      // Persist to backend
      api.createTag(tag)
        .then(
          _ => {
            env.fetchAll();
          },
          err => {
            console.error(err);
          }
        );
    },

    handleDeleteButton: (id) => {
      if (confirm('Are you sure you want to delete this tag?\nThis tag will be removed from all tasks but tasks will remain unaffected.')) {
        // Optimistic state update
        env.setState(state => {
          let newState = {
            tags: state.tags.filter(tag => tag.id !== id)
          }

          // If deleted tag was an active filter, reset the filter
          if (state.filterTag === id) {
            newState.filterTag = null;
          }

          return newState;
        });

        // Persist to backend
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
    },

    handleFilter: (tag) => {
      env.setState(state => {
        if (state.filterTag === tag.id) {
          return {
            filterTag: null
          };
        } else {
          return {
            filterTag: tag.id
          };
        }
      });
    },

    handleNewButton: () => {
      env.setState({
        tagModalOpen: true
      });
    }
  }

  return tagHandlers;
}
