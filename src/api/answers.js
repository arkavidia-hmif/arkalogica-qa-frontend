import axios from "axios";
import {
  SUBMISSIONS_PARAM,
  SUBMIT_ANSWERS_PARAM,
  BACKEND_BASE_URL,
} from "../constant";

export const submitAnswers = (questionId, tag) => {
  const instance = axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance
    .post(SUBMIT_ANSWERS_PARAM, {
      questionId,
      tag,
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {});
};

export const getAllAnswers = (e) => {
  e.preventDefault();
  const instance = axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance
    .get(SUBMISSIONS_PARAM)
    .then((res) => {
      return res.data;
    })
    .catch(() => {});
};
