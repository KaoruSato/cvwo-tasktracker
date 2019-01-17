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

  deleteTask: (task) => {
    return fetch(`${root}/tasks/${task.id}`, {
      method: 'DELETE'
    });
  },

  createTag: (tag) => {
    return fetch(`${root}/tags`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        tag: tag
      })
    });
  },

  deleteTag: (tag) => {
    return fetch(`${root}/tags/${tag.id}`, {
      method: 'DELETE'
    });
  }
}

module.exports = api;
