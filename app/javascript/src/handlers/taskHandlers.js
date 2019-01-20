const api = require('../utilities/api');
const sorter = require('../utilities/sorter');

module.exports = (env) => {
  const taskHandlers = {
    handleCreate: (task) => {
      // Fix empty tag
      if (task.tag_id === '') {
        task.tag_id = null;
      }

      // Persist to backend
      api.createTask(task)
        .then(
          _ => {
            env.fetchAll();
          },
          err => {
            console.error(err);
          }
        );
    },

    handleDeleteButton: (task) => {
      if (confirm('Are you sure you want to delete this task?')) {
        // Optimistic state update
        env.setState(oldState => {
          const newState = {
            tasks: oldState.tasks.filter(t => t.id !== task.id)
          }

          return newState;
        });

        // Persist to backend
        api.deleteTask(task)
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

    handleDoneToggle: (task, e) => {
      const value = e.target.checked;

      task.done = value;

      taskHandlers.handleUpdate(task);
    },

    handleFilterChange: (e) => {
      const value = e.target.value;

      env.setState({
        filterTerm: value
      });
    },

    handleUpdate: (task) => {
      // Fix empty tag
      if (task.tag_id === '') {
        task.tag_id = null;
      }

      // Optimistically set state
      env.setState(oldState => {
        const newState = {
          tasks: oldState.tasks.map(t => {
            if (t.id === task.id) {
              return task;
            } else {
              return t;
            }
          })
        }

        return sorter(newState);
      });

      // Persist to backend
      api.updateTask(task)
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

  return taskHandlers;
}
