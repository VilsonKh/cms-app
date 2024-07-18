import React from 'react';
import TaskChart from '../../components/TaskCharts/TaskCharts';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t('tasks.overview')}
      </Typography>
      <TaskChart />
    </Container>
  );
};

export default Tasks;
