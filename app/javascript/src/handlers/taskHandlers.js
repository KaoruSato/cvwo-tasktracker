const api = require('../utilities/api');

const taskHandlers = (env) => {
  return {
    handleChange: (id, e) => {
      // Extract changed data
      const target = e.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      // Edit task
      const task = env.state.tasks.filter(t => t.id === id)[0];
      task[name] = value;

      // Optimistically set new state
      const newTasks = env.state.tasks.map(t => {
        if (t.id === id) {
          t = task;
        }

        return t;
      });

      // Optimistically set new state
      env.setState({
        tasks: newTasks
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
}

module.exports = taskHandlers;
