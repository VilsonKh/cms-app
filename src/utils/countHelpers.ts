export const getTasksAmount = (tasks, status) => {
  const completedTasks = tasks.filter((task) => task.status === status);
  return completedTasks.length
}