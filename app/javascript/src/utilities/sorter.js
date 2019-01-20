const sorter = (state) => {
  // Sort tasks by id in descending order, not done followed by done
  if (state.tasks) {
    const tasksDone = state.tasks.filter(t => t.done).sort((a, b) => b.id < a.id ? -1 : 1);
    const tasksNotDone = state.tasks.filter(t => !t.done).sort((a, b) => b.id < a.id ? -1 : 1);
    const sortedTasks = tasksNotDone.concat(tasksDone);

    state.tasks = sortedTasks;
  }

  // Sort tags alphabetically
  if (state.tags) {
    const sortedTags = state.tags.sort((a, b) => a.title > b.title ? 1 : -1);

    state.tags = sortedTags;
  }

  return state;
}

module.exports = sorter;
