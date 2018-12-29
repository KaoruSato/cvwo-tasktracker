const root = "/api";

const api = {
  getTasks: () => {
    return fetch(`${root}/tasks`);
  },
  editTask: (task) => {
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
  getTags: () => {
    return fetch(`${root}/tags`);
  },
  deleteTag: id => {
    return fetch(`${root}/tags/${id}`, {
      method: 'DELETE'
    });
  }
}

module.exports = api;
