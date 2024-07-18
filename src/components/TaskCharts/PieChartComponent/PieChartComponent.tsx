import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent: React.FC<{ data: any[] }> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Box  width="300">
      <Typography variant="h6" gutterBottom textAlign={'center'}>
        {t("Tasks Status Distribution")}
      </Typography>

        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={true}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
    </Box>
  );
};

export default PieChartComponent;
