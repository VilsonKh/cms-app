import React from 'react';
import { Box, Skeleton } from '@mui/material';

const PieChartSkeleton: React.FC = () => {
  return (
    <Box width={400} height={400} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Skeleton variant="circular" width={200} height={200} />
      <Box display="flex" width="100%" justifyContent="space-between" mt={2}>
        <Skeleton variant="rectangular" width="30%" height={20} />
        <Skeleton variant="rectangular" width="30%" height={20} />
        <Skeleton variant="rectangular" width="30%" height={20} />
      </Box>
    </Box>
  );
};

export default PieChartSkeleton;
