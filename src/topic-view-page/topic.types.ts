export type TopicProps = {
  id: string;
  title: string;
  text: string;
  index: number;
  questions: Question[];
};

export interface Question {
  id: string;
  topicId: string;
  possibleAnswers: string[];
  correctAnswer: string;
  questionText: string;
}

export interface SelectedAnswers {
  [key: string]: string;
}
