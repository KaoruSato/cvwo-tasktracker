const root = "/api";

const api = {
  getTasks: () => {
    return fetch(`${root}/tasks`);
  },
  getTags: () => {
    return fetch(`${root}/tags`);
  }
}

module.exports = api;
