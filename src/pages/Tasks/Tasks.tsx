import React from 'react';
import TaskChart from '../../components/TaskChart/TaskChart';
import { Container, Typography } from '@mui/material';

const Tasks: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tasks Overview
      </Typography>
      <TaskChart />
    </Container>
  );
};

export default Tasks;
