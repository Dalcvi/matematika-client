import { NavigateNextTwoTone } from '@mui/icons-material';
import { Grid, Container, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import { TopicProps } from '../topic-view-page/topic.types';
import { TopicListItem } from './topic-list-item';
import styles from './topic-list.module.css';

type Props = { topics: TopicProps[] };

const fakeTopic: TopicProps = {
  id: 'id',
  title: 'title',
  text: 'text',
  index: 0,
  questions: [
    {
      id: 'id',
      topicId: 'topicId',
      possibleAnswers: [],
      correctAnswer: 'correctAnswer',
      questionText: 'questionText',
    },
  ],
};

const topics: TopicProps[] = [fakeTopic, fakeTopic, fakeTopic, fakeTopic];

export const TopicList = () => {
  const navigateTo = useNavigate();
  const user = useAppSelector(state => state.user);
  const isLoggedIn = user?._id !== undefined;

  return (
    <Container>
      <Paper elevation={6} className={styles.gridContainer}>
        <header className={styles.header}>
          <Typography variant="h2">Temos</Typography>
          {isLoggedIn && (
            <Button
              variant="contained"
              onClick={() => navigateTo('/sukurti-tema')}
            >
              Sukurti temą
            </Button>
          )}
        </header>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 2, md: 12, lg: 12 }}
          sx={{ width: '20%' }}
          className={styles.grid}
        >
          {topics.map(value => (
            <TopicListItem key={value.id} topic={value} />
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};
