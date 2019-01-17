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

    handleDeleteButton: (tag) => {
      if (confirm('Are you sure you want to delete this tag?\nThis tag will be removed from all tasks but tasks will remain unaffected.')) {
        // Optimistic state update
        env.setState(oldState => {
          let newState = {
            tags: oldState.tags.filter(t => t.id !== tag.id)
          }

          // If deleted tag was an active filter, reset the filter
          if (oldState.filterTag === tag.id) {
            newState.filterTag = null;
          }

          return newState;
        });

        // Persist to backend
        api.deleteTag(tag)
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

    handleFilterButton: (tag) => {
      env.setState(oldState => {
        if (oldState.filterTag === tag.id) {
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
