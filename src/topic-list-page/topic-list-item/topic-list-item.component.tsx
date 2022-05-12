import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopicProps } from '../../topic-view-page/topic.types';

type TopicProp = { topic: TopicProps };

export const TopicListItem: FC<TopicProp> = ({ topic }) => {
  const navigateTo = useNavigate();

  return (
    <Grid item xs={2} sm={2} md={6} lg={4}>
      <Card sx={{ minWidth: 275 }}>
        <CardActionArea onClick={() => navigateTo(`/topic/${topic.id}`)}>
          <CardContent>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {topic.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
