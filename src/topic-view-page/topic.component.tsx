import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { getTopic } from './topic.middleware';
import { TOPIC_LOADING_STATE_ID } from './topic.constants';
import { SelectedAnswers, TopicProps } from './topic.types';
import styles from './topic.module.css';
import axios from 'axios';

export function Topic() {
  const [value, setValue] = React.useState<SelectedAnswers>({});
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const { topicId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState<TopicProps | null>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<TopicProps>('/topics/' + topicId)
      .then(res => {
        setTopic(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    setValue({ ...value, [id]: (event.target as HTMLInputElement).value });
    setHelperText(' ');
    setError(false);
  };

  if (isLoading || !topic) {
    return (
      <Container>
        <Paper elevation={6} className={styles.loaderContainer}>
          <CircularProgress />
        </Paper>
      </Container>
    );
  }
  return (
    <Container>
      <Paper elevation={6} className={styles.contentContainer}>
        <Typography variant="h2" color="text.primary" gutterBottom>
          {topic.title}
        </Typography>
        <Typography variant="body1" color="text.primary" gutterBottom>
          {topic.text}
        </Typography>
        <form>
          <FormControl
            sx={{ p: 3, width: '100%' }}
            error={error}
            variant="standard"
          >
            {topic.questions.map(question => (
              <>
                <Divider sx={{ mb: 3 }} />
                <FormLabel id="demo-error-radios">
                  {question.questionText}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-error-radios"
                  name="quiz"
                  value={value[question.questionText] || ''}
                  onChange={event =>
                    handleRadioChange(event, question.questionText)
                  }
                >
                  {question.possibleAnswers.map(answer => (
                    <FormControlLabel
                      value={answer}
                      control={<Radio />}
                      label={answer}
                      key={answer}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
              </>
            ))}
            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
              Patikrinti atsakymą
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
}
