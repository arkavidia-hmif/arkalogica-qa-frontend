import axios from "axios";
import {
  SUBMISSIONS_PARAM,
  SUBMIT_ANSWERS_PARAM,
  BACKEND_BASE_URL,
} from "../constant";

export const submitAnswers = async (questionId, tag) => {
  const instance = axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await instance
    .post(SUBMIT_ANSWERS_PARAM, {
      questionId,
      tag,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error("Error occured");
    });
};

export const getAllAnswers = async () => {
  const instance = axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  await instance
    .get(SUBMISSIONS_PARAM)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error("Error occured");
    });
};
