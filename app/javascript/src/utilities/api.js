const root = "/api";

const api = {
  getTasks: () => {
    return fetch(`${root}/tasks`);
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
