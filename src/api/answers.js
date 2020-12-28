import axios from "axios";
import {
  SUBMISSIONS_PARAM,
  SUBMIT_ANSWERS_PARAM,
  BACKEND_BASE_URL,
} from "../constant";

export const submitAnswers = async (questionId, tag, authTokens) => {
  const instance = axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens}`,
    },
  });

  const data = {
    tag: tag,
    question: questionId,
  };

  return await instance
    .post(SUBMIT_ANSWERS_PARAM, data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(authTokens);
      console.log(data);
      console.log(e);
      throw new Error("Error occured");
    });
};

export const getAllAnswers = async (authTokens) => {
  const instance = axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authTokens}`,
    },
  });

  const res = await instance.get(SUBMISSIONS_PARAM);

  return res.data;
};
