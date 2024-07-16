import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { getTasks } from '../../store/slices/tasksSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { TextField, MenuItem, Grid, Typography } from '@mui/material';
import { differenceInCalendarWeeks, startOfYear } from 'date-fns';

const getWeekNumber = (dateString) => {
  const date = new Date(dateString);
  const start = startOfYear(date);
  return differenceInCalendarWeeks(date, start) + 1;
};

const processData = (tasks, numOfWeeks = 8) => {
  const weeksMap = {};

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

  // Sort by week number
  weeksArray.sort((a, b) => b.week - a.week);

  // Return the last numOfWeeks weeks
  return weeksArray.slice(0, numOfWeeks).reverse();
};

const getStatusData = (tasks) => {
  const statusMap = {};

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TaskChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allTasks = useSelector((state: RootState) => state.tasks.tasks);
  const [numOfWeeks, setNumOfWeeks] = useState(8);

  console.log(allTasks)
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const closedTasks = allTasks.filter(task => task.status === "Done");
  const data = processData(closedTasks, numOfWeeks);
  const statusData = getStatusData(allTasks);

  return (
    <div>
      <TextField
        select
        label="Number of Weeks"
        value={numOfWeeks}
        onChange={(e) => setNumOfWeeks(Number(e.target.value))}
        variant="outlined"
        style={{ marginBottom: '16px' }}
      >
        {[4, 8, 12, 16].map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Tasks Over Weeks
          </Typography>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profit" stroke="#8884d8" />
            <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
            <Line type="monotone" dataKey="net" stroke="#ff7300" />
          </LineChart>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Task Status Distribution
          </Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={statusData}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Grid>
      </Grid>
    </div>
  );
};

export default TaskChart;
