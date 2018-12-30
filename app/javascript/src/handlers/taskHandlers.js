const api = require('../utilities/api');

module.exports = (env) => {
  const taskHandlers = {
    handleSubmit: (task) => {
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

    handleToggle: (id, e) => {
      const value = e.target.checked;

      const task = env.state.tasks.filter(t => t.id === id)[0];
      task.done = value;

      taskHandlers.handleSubmit(task);
    }
  }

  return taskHandlers;
}
