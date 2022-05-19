import { NavigateNextTwoTone } from '@mui/icons-material';
import { Grid, Container, Paper, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import { TopicProps } from '../topic-view-page/topic.types';
import { TopicListItem } from './topic-list-item';
import styles from './topic-list.module.css';

type Props = { topics: TopicProps[] };

// const topics: TopicProps[] = [fakeTopic, fakeTopic, fakeTopic, fakeTopic];

export const TopicList = () => {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState<TopicProps[]>([]);
  const user = useAppSelector(state => state.user);
  const isLoggedIn = user?.id !== undefined;
  const showCreateButton = isLoggedIn && user?.isAdmin;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/topics')
      .then(res => {
        setTopics(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={6} className={styles.gridContainer}>
        <header className={styles.header}>
          <Typography variant="h2">Temos</Typography>
          {showCreateButton && (
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
          {topics.map((value, index) => {
            const first = !!user && index === 0;
            const second = !!user?.solvedTopics.includes(value.id);
            return (
              <TopicListItem
                key={value.id}
                topic={value}
                isAdmin={user?.isAdmin ?? false}
                show={
                  (!!user && index === 0) ||
                  !!user?.solvedTopics.includes(topics[index - 1].id)
                }
                completed={!!user?.solvedTopics.includes(value.id)}
                deleteTopic={() => {
                  setIsLoading(true);
                  axios
                    .delete(`/topics/${value.id}`)
                    .then(() => {
                      setIsLoading(false);
                      setTopics(topics.filter(topic => topic.id !== value.id));
                    })
                    .catch(() => {
                      setIsLoading(false);
                    });
                }}
              />
            );
          })}
        </Grid>
      </Paper>
    </Container>
  );
};
