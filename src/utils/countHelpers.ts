export const getTasksAmount = (tasks: any[], status: string) => {
  const completedTasks = tasks.filter((task) => task.status === status);
  return completedTasks.length
}