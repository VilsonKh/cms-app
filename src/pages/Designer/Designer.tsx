import React from 'react';
import DesignerTable from '../../components/DesignerTable/DesignerTable';
import { Container, Typography } from '@mui/material';

const Designer: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Designers
      </Typography>
      <DesignerTable />
    </Container>
  );
};

export default Designer;
