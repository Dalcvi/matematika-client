export type CreatingQuestion = {
  questionText: string;
  possibleAnswers: PossibleAnswer[];
  correctAnswer: number;
};

type PossibleAnswer = {
  text: string;
  id: string;
};

export type HowManyAnswersByQuestionIndex = {
  [key: number]: number;
};
