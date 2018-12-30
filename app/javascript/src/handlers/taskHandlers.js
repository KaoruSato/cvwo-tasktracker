const api = require('../utilities/api');

module.exports = (env) => {
  const taskHandlers = {
    handleSubmit: (task) => {
      // Fix null tag_id
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
    },

    handleCreate: (task) => {
      // Fix null tag_id
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

    handleDoneToggle: (id, e) => {
      const value = e.target.checked;

      const task = env.state.tasks.filter(t => t.id === id)[0];
      task.done = value;

      taskHandlers.handleSubmit(task);
    },

    handleEditButton: (id) => {
      env.setState({
        taskModalID: id,
        taskModalOpen: true
      });
    }
  }

  return taskHandlers;
}
