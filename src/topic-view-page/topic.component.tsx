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
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { SelectedAnswers, TopicProps } from './topic.types';
import styles from './topic.module.css';
import axios from 'axios';
import { authenticateUser } from '../user';

export function Topic() {
  const [value, setValue] = React.useState<SelectedAnswers>({});
  const [failed, setFailed] = React.useState<string[]>([]);
  const { topicId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState<TopicProps | null>();
  const [showHelperText, setShowHelperText] = useState<string[]>([]);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

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

  const checkAnswers = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
      return;
    }
    const failedAnswers = topic.questions.filter(question => {
      const answer = value[question.questionText];
      return answer !== question.correctAnswer;
    });
    setFailed(failedAnswers.map(question => question.questionText));
    if (failedAnswers.length > 0) {
      return;
    }

    axios
      .patch('/Users/addSolvedTopic', {
        userId: user?.id,
        topicId: topic.id,
      })
      .then(() => {
        dispatch(authenticateUser());
        navigateTo('/');
      });
  };
  return (
    <Container>
      <Paper elevation={6} className={styles.contentContainer}>
        <Typography variant="h2" color="text.primary" gutterBottom>
          {topic.title}
        </Typography>
        <Typography variant="body1" color="text.primary" gutterBottom>
          {topic.text}
        </Typography>
        <form onSubmit={checkAnswers}>
          <FormControl sx={{ p: 3, width: '100%' }} variant="standard">
            {topic.questions.map((question, index) => (
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
                {failed.includes(question.questionText) && (
                  <FormHelperText className={styles.error}>
                    Atsakymas neteisingas
                  </FormHelperText>
                )}
                {!showHelperText.includes(question.questionText) && (
                  <Button
                    onClick={() =>
                      setShowHelperText([
                        ...showHelperText,
                        question.questionText,
                      ])
                    }
                  >
                    Parodyti užuominą
                  </Button>
                )}
                {showHelperText.includes(question.questionText) && (
                  <FormHelperText>{question.hint}</FormHelperText>
                )}
              </>
            ))}
            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
              Patikrinti atsakymus
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
}
