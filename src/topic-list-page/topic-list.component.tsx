import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Container,
} from '@mui/material';
import { FC } from 'react';
import { TopicProps } from '../topic-view-page/topic.types';
import { TopicListItem } from './topic-list-item';

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
  return (
    <Container>
      <Grid
        container
        // direction="row"
        // justifyContent="space-around"
        // alignItems="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 2, md: 12, lg: 12 }}
        sx={{ width: '20%' }}
      >
        {topics.map(value => (
          <TopicListItem key={value.id} topic={value} />
        ))}
      </Grid>
    </Container>
  );
};
