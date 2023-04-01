import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetching from "../hooks/useFetching";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { getRandomInt } from "../utils/getRandomInt";
import { handleScoreChange } from "../redux/actions";
import { decode } from "html-entities";

const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_questions,
    score
  } = useSelector(state => state);
  let apiUrl = `/api.php?amount=${amount_of_questions}`;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }

  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const {response, loading} = useFetching({ url: apiUrl });

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress/>
      </Box>
    )
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];

    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate('/score');
    }
  }
  return (
    <Box>
      <Typography variant="h4">Question #{questionIndex + 1}</Typography>
      <Typography mt={5}>{decode(response.results[questionIndex].question)}</Typography>
      {options.map((data, id) => {
        return (
          <Box mt={2} key={id}>
            <Button onClick={handleClickAnswer} variant="contained">{decode(data)}</Button>
          </Box>
        )
      })}
      <Box mt={5}>
        Score: {score} / {response.results.length}
      </Box>
    </Box>
  );
};

export default Questions;