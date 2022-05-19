import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { TopicProps } from '../../topic-view-page/topic.types';
import { Lock } from '@mui/icons-material';
import styles from './topic-list-item.module.css';

type TopicProp = { topic: TopicProps; isAdmin: boolean };

export const TopicListItem: FC<TopicProp> = ({ topic, isAdmin }) => {
  const navigateTo = useNavigate();
  const user = useAppSelector(state => state.user);
  const isLoggedIn = user?._id !== undefined;

  const isDisabled = !isLoggedIn && !isAdmin;
  return (
    <Grid item xs={2} sm={2} md={6} lg={4}>
      <Paper elevation={8} className={styles.relativeContainer}>
        {isDisabled && (
          <>
            <div className={styles.disabledMode} />
            <div className={styles.lock}>
              <Lock />
            </div>
          </>
        )}
        <Card sx={{ minWidth: 275 }}>
          <CardActionArea onClick={() => navigateTo(`/tema/${topic.id}`)}>
            <CardContent>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                {topic.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          {isAdmin && <Button>Pakeisti</Button>}
        </Card>
      </Paper>
    </Grid>
  );
};
