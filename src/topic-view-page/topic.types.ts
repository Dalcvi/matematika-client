export type TopicProps = {
  id: string;
  title: string;
  text: string;
  questions: Question[];
};

export interface Question {
  id?: string;
  possibleAnswers: string[];
  correctAnswer: string;
  questionText: string;
  hint: string;
}

export interface SelectedAnswers {
  [key: string]: string;
}
