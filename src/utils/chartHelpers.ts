import { differenceInCalendarWeeks, startOfYear } from 'date-fns';

export const getWeekNumber = (dateString: string): number => {
  const date = new Date(dateString);
  const start = startOfYear(date);
  return differenceInCalendarWeeks(date, start) + 1;
};

export const processData = (tasks: any[], numOfWeeks: number = 8) => {
  const weeksMap: { [key: number]: { week: number, profit: number, expenses: number, net: number } } = {};

  tasks.forEach(task => {
    const week = getWeekNumber(task.date_finished);
    const profit = task.received_from_client || 0;
    const expenses = (task.send_to_account_manager || 0) + (task.send_to_designer || 0) + (task.send_to_project_manager || 0);
    const net = profit - expenses;

    if (!weeksMap[week]) {
      weeksMap[week] = { week, profit: 0, expenses: 0, net: 0 };
    }

    weeksMap[week].profit += profit;
    weeksMap[week].expenses += expenses;
    weeksMap[week].net += net;
  });

  const weeksArray = Object.values(weeksMap);

  weeksArray.sort((a, b) => b.week - a.week);

  return weeksArray.slice(0, numOfWeeks).reverse();
};

export const getStatusData = (tasks: any[]) => {
  const statusMap: { [key: string]: number } = {};

  tasks.forEach(task => {
    if (!statusMap[task.status]) {
      statusMap[task.status] = 0;
    }
    statusMap[task.status] += 1;
  });

  return Object.entries(statusMap).map(([status, count]) => ({
    name: status,
    value: count
  }));
};
