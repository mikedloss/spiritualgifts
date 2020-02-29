import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clone, isEmpty } from "lodash";
import { useRouter } from "next/router";

import Layout from "../src/components/Layout";
import Header from "../src/components/Header";
import Container from "../src/components/Container";
import Question from "../src/components/Question";
import ProgressBar from "../src/components/ProgressBar";

import { useSelector } from "../src/store";
import { getAllQuestions } from "../src/store/questions/actions";
import {
  saveAnswer,
  clearSavedProgress,
  submitAnswers
} from "../src/store/survey/actions";
import { surveyKeypress } from "../src/utils/surveyKeypress";
import { useEventListener } from "../src/hooks";

const Survey = () => {
  const [currentId, setCurrentId] = useState(1);
  const [showProgressPopup, setShowProgressPopup] = useState(true);
  const questions = useSelector(state => state.questions);
  const survey = useSelector(state => state.survey);
  const dispatch = useDispatch();
  const router = useRouter();

  useEventListener("keydown", (event: any) =>
    surveyKeypress(event, nextQuestion)
  );

  useEffect(() => {
    if (isEmpty(questions.questions)) {
      dispatch(getAllQuestions());
    }
  }, []);

  useEffect(() => {
    if (currentId === questions.questions.length) {
      dispatch(submitAnswers(survey.answers));
      router.push("/results");
    }
  }, [survey.answers]);

  const nextQuestion = answerValue => {
    const answer = { question: currentId, answer: answerValue };
    dispatch(saveAnswer(answer));

    const nextId = currentId + 1;
    if (nextId <= questions.questions.length) {
      setCurrentId(nextId);
    }
  };

  const resumeProgress = () => {
    const { question: lastFinishedQuestion } = clone(survey.answers).pop();
    const nextId = lastFinishedQuestion + 1;
    if (nextId > questions.questions.length) {
      setCurrentId(lastFinishedQuestion);
    } else {
      setCurrentId(nextId);
    }
  };

  const clearProgress = () => {
    setShowProgressPopup(false);
    dispatch(clearSavedProgress(currentId));
  };

  const haveQuestions = !questions.loading && !isEmpty(questions.questions);

  const currentQuestion =
    haveQuestions && questions.questions.find(q => q.id === currentId);

  const percentValue =
    haveQuestions && Math.floor((currentId / questions.questions.length) * 100);
  const width = percentValue ? `${percentValue}%` : "0%";

  const surveyInProgress =
    showProgressPopup &&
    !isEmpty(survey.answers) &&
    survey.answers.length > currentId;

  return !haveQuestions ? (
    <Layout>
      <p>Loading...</p>
    </Layout>
  ) : (
    <>
      <Container>
        <Header />
        {surveyInProgress && (
          <div
            className="flex align-center justify-between bg-indigo-100 text-black-700 font-bold px-2 md:px-4 py-2 md:py-3 mb-2 md:mb-4 rounded"
            role="alert"
          >
            <button
              className="font-bold md:p-1 text-left text-xs md:text-base"
              onClick={resumeProgress}
            >
              Click me to continue where you left off
            </button>
            <button onClick={clearProgress}>
              <svg
                className="fill-current h-5 w-5 md:h-6 md:h-6 text-black-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </div>
        )}
        <Question
          question={currentQuestion.question}
          nextQuestion={nextQuestion}
          number={currentId}
          max={questions.questions.length}
        />
      </Container>
      <ProgressBar width={width} />
    </>
  );
};

export default Survey;
