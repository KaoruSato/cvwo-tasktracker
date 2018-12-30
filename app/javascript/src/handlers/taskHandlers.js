const api = require('../utilities/api');

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

    handleDeleteButton: (id) => {
      if (confirm('Are you sure you want to delete this task?')) {
        // Optimistic state update
        env.setState(state => {
          return {
            tasks: state.tasks.filter(t => t.id !== id)
          }
        });

        // Persist to backend
        api.deleteTask(id)
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

    handleDoneToggle: (id, e) => {
      const value = e.target.checked;

      const task = env.state.tasks.filter(t => t.id === id)[0];
      task.done = value;

      taskHandlers.handleUpdate(task);
    },

    handleEditButton: (id) => {
      env.setState({
        taskModalID: id,
        taskModalOpen: true
      });
    },

    handleUpdate: (task) => {
      // Fix empty tag
      if (task.tag_id === '') {
        task.tag_id = null;
      }

      // Optimistically set state
      env.setState(state => {
        return {
          tasks: state.tasks.map(t => {
            if (t.id === task.id) {
              return task;
            }

            return t;
          })
        }
      });

      // Persist to backend
      api.editTask(task)
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
