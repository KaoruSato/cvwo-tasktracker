const root = "/api";

const api = {
  getAll: () => {
    return fetch(`${root}/all`);
  },

  createTask: (task) => {
    return fetch(`${root}/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        task: task
      })
    });
  },

  updateTask: (task) => {
    return fetch(`${root}/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        task: task
      })
    });
  },

  deleteTask: (id) => {
    return fetch(`${root}/tasks/${id}`, {
      method: 'DELETE'
    });
  },

  deleteTag: (id) => {
    return fetch(`${root}/tags/${id}`, {
      method: 'DELETE'
    });
  }
}

module.exports = api;
