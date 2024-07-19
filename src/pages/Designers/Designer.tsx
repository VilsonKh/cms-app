import React from 'react';
import DesignerTable from '../../components/DesignerTable/DesignerTable';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Designers: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t('designers.designers')}
      </Typography>
      <DesignerTable />
    </Container>
  );
};

export default Designers;
