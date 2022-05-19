import { Close } from '@mui/icons-material';
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Radio,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import { CreatingQuestion, HowManyAnswersByQuestionIndex } from '.';
import styles from './add-topic-page.module.css';

export const AddTopicPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [questions, setQuestions] = useState<CreatingQuestion[]>([]);
  const [howManyQuestions, setHowManyQuestions] = useState(0);
  const [howManyQuestionAnswers, setHowManyQuestionAnswers] =
    useState<HowManyAnswersByQuestionIndex>({});
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Paper elevation={6} className={styles.container}>
        <Typography variant="h2">Sukurkite temą</Typography>
        <Typography variant="h5">
          Įveskite temos pavadinimą ir aprašymą.
        </Typography>
        <Divider className={styles.divider} />
        <form onSubmit={onSubmit}>
          <TextField
            className={styles.textField}
            type="text"
            variant="standard"
            fullWidth
            required
            label="Pavadinimas"
            placeholder="Pavadinimas..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            className={styles.textField}
            fullWidth
            multiline
            required
            label="Aprašymas"
            placeholder="Aprašymas"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Divider className={styles.divider} />
          <Typography variant="h5" className={styles.questionsTitle}>
            Įveskite klausimus.
          </Typography>
          <ul>
            {Array.from(Array(howManyQuestions).keys()).map(i => (
              <li className={styles.questionContainer}>
                <Divider className={styles.divider} />
                <TextField
                  type="text"
                  variant="standard"
                  fullWidth
                  label={`Klausimas ${i + 1}`}
                  placeholder="Klausimo tekstas..."
                  required
                  value={questions[i]?.questionText ?? ''}
                  onChange={e =>
                    setQuestions([
                      ...questions.slice(0, i),
                      { ...questions[i], questionText: e.target.value },
                      ...questions.slice(i + 1),
                    ])
                  }
                />
                <ul className={styles.answerContainer}>
                  {Array.from(Array(howManyQuestionAnswers[i] ?? 0).keys()).map(
                    j => {
                      return (
                        <li className={styles.answer}>
                          <TextField
                            className={styles.textField}
                            id={questions[i].possibleAnswers[j].id}
                            type="text"
                            variant="standard"
                            fullWidth
                            label={`Atsakymas ${j + 1}`}
                            placeholder="Atsakymo tekstas"
                            required
                            value={questions[i].possibleAnswers[j].text}
                            onChange={e =>
                              setQuestions([
                                ...questions.slice(0, i),
                                {
                                  ...questions[i],
                                  possibleAnswers: questions[i].possibleAnswers
                                    ? [
                                        ...questions[i].possibleAnswers.slice(
                                          0,
                                          j,
                                        ),
                                        {
                                          ...questions[i].possibleAnswers[j],
                                          text: e.target.value,
                                        },
                                        ...questions[i].possibleAnswers.slice(
                                          j + 1,
                                        ),
                                      ]
                                    : [
                                        {
                                          text: e.target.value,
                                          id: `${j}-${Math.floor(
                                            Math.random() * 100000 + 1,
                                          )}`,
                                        },
                                      ],
                                },
                                ...questions.slice(i + 1),
                              ])
                            }
                          />
                          <Radio
                            checked={questions[i].correctAnswer === Number(j)}
                            onChange={() => {
                              setQuestions([
                                ...questions.slice(0, i),
                                {
                                  ...questions[i],
                                  correctAnswer: j,
                                },
                                ...questions.slice(i + 1),
                              ]);
                            }}
                            value={j}
                            name={`${i}-radio-buttons`}
                            required
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              setHowManyQuestionAnswers({
                                ...howManyQuestionAnswers,
                                [i]: howManyQuestionAnswers[i] - 1,
                              });
                              setQuestions([
                                ...questions.slice(0, i),
                                {
                                  ...questions[i],
                                  possibleAnswers: [
                                    ...questions[i].possibleAnswers.slice(0, j),
                                    ...questions[i].possibleAnswers.slice(
                                      j + 1,
                                    ),
                                  ],
                                  correctAnswer:
                                    questions[i].correctAnswer === j
                                      ? -1
                                      : questions[i].correctAnswer,
                                },
                                ...questions.slice(i + 1),
                              ]);
                            }}
                          >
                            <Close />
                          </Button>
                        </li>
                      );
                    },
                  )}
                  <Button
                    type="button"
                    onClick={() => {
                      setHowManyQuestionAnswers({
                        ...howManyQuestionAnswers,
                        [i]: (howManyQuestionAnswers[i] ?? 0) + 1,
                      });
                      setQuestions([
                        ...questions.slice(0, i),
                        {
                          ...questions[i],
                          possibleAnswers: [
                            ...questions[i].possibleAnswers,
                            {
                              text: '',
                              id: `${
                                questions[i].possibleAnswers.length
                              }-${Math.floor(Math.random() * 1000000 + 1)}`,
                            },
                          ],
                        },
                        ...questions.slice(i + 1),
                      ]);
                    }}
                  >
                    Pridėti atsakymą
                  </Button>
                  <TextField
                    className={styles.hint}
                    id={i + 'Hint'}
                    type="text"
                    variant="standard"
                    fullWidth
                    label={`Užuomina ${i + 1}`}
                    placeholder="Užuomina"
                    required
                  />
                </ul>
              </li>
            ))}
            <Button
              type="button"
              className={styles.divider}
              onClick={() => {
                setHowManyQuestions(howManyQuestions + 1);
                setQuestions([
                  ...questions,
                  {
                    questionText: '',
                    possibleAnswers: [],
                    correctAnswer: -1,
                    hint: '',
                  },
                ]);
              }}
            >
              Pridėti klausimą
            </Button>
          </ul>
          <div className={styles.submitContainer}>
            <Button type="submit" variant="contained" color="primary">
              Sukurti
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};
