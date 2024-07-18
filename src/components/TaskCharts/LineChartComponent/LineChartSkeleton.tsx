import React from 'react';
import { Box, Skeleton } from '@mui/material';

const LineChartSkeleton: React.FC = () => {
  return (
    <Box width={600} height={300} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Skeleton variant="rectangular" width="100%" height={30} />
      <Skeleton variant="rectangular" width="100%" height={200} style={{ marginTop: 16 }} />
      <Box display="flex" width="100%" justifyContent="space-between" mt={2}>
        <Skeleton variant="rectangular" width="15%" height={20} />
        <Skeleton variant="rectangular" width="15%" height={20} />
        <Skeleton variant="rectangular" width="15%" height={20} />
      </Box>
    </Box>
  );
};

export default LineChartSkeleton;
