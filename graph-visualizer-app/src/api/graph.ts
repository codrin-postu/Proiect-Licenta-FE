import axios from "axios";
import { convertValuesToInt } from "../common/functions";

const BASE_URL = "http://localhost:8000/api";

const getProblems = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/problem/list`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getAlgorithms = async (problemId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/problem/${problemId}/algorithm/list`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getFields = async (problemId) => {
  try {
    const res = await axios.get(`${BASE_URL}/problem/${problemId}/field/list`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const postJobRequest = async (problemId, algorithmId, values) => {
  try {
    const res = await axios.post(`${BASE_URL}/job/request`, {
      problem: problemId,
      algorithm: algorithmId,
      values: convertValuesToInt(values),
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getJobStatus = async (jobId) => {
  try {
    const res = await axios.get(`${BASE_URL}/job/${jobId}/status`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getJobSolution = async (jobId) => {
  try {
    const res = await axios.get(`${BASE_URL}/job/${jobId}/solution`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  getProblems,
  getAlgorithms,
  getFields,
  postJobRequest,
  getJobStatus,
  getJobSolution,
};
