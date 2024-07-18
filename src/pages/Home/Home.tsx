import React from 'react';
import CommentsList from '../../components/CommentsList/CommentsList';
import TopDesignersList from '../../components/TopDesignersList/TopDesignersList';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t('Latest Comments')}
      </Typography>
      <CommentsList />
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        {t('Top Designers')}
      </Typography>
      <TopDesignersList />
    </Container>
  );
};

export default Home;
