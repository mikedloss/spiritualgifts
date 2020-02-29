import React from "react";

import { Button } from "./Button";

interface QuestionProps {
  max: number;
  nextQuestion: (answer: number) => void;
  number: number;
  question: string;
}

const Question: React.FC<QuestionProps> = ({
  max,
  nextQuestion,
  number,
  question
}) => {
  return (
    <>
      <div className="min-h-32 lg:min-h-64">
        <small className="text-indigo-600">
          {number} of {max}
        </small>
        <h4 className="font-bold text-xl lg:text-2xl leading-6">{question}</h4>
      </div>
      <div className="mt-4 md:mt-8">
        <Button text="Definitely true (5)" value={5} onClick={nextQuestion} />
        <Button text="Mostly true (4)" value={4} onClick={nextQuestion} />
        <Button text="Frequently true (3)" value={3} onClick={nextQuestion} />
        <Button text="Occasionally true (2)" value={2} onClick={nextQuestion} />
        <Button
          text="Not at all true about me (1)"
          value={1}
          onClick={nextQuestion}
        />
      </div>
    </>
  );
};

export default Question;
