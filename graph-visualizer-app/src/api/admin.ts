import axios from "axios";
import { BASE_URL } from "../common/constants";
import { retryRefreshToken } from "../common/functions";

const getPanelProblems = async () => {
  try {
    const authToken = localStorage.getItem("access_token");
    const res = await axios.get(`${BASE_URL}/problem/list`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await retryRefreshToken();
      return getPanelProblems();
    } else {
      throw error;
    }
  }
};

const getPanelJobs = async () => {
  try {
    const authToken = localStorage.getItem("access_token");
    const res = await axios.get(`${BASE_URL}/job/list`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await retryRefreshToken();
      return getPanelAlgorithms();
    } else {
      throw error;
    }
  }
};

const getPanelSolution = async (jobId) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const res = await axios.get(`${BASE_URL}/job/${jobId}/solution`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await retryRefreshToken();
      return getPanelSolution(jobId);
    } else {
      throw error;
    }
  }
};

const getPanelAlgorithms = async () => {
  try {
    const authToken = localStorage.getItem("access_token");
    const res = await axios.get(`${BASE_URL}/algorithm/list`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await retryRefreshToken();
      return getPanelAlgorithms();
    } else {
      throw error;
    }
  }
};

const getPanelProblemAlgorithms = async (problemId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/problem/${problemId}/algorithm/list`
    );
    return res.data.map((algorithm) => ({
      id: algorithm.id,
      algorithm_id: algorithm.algorithm.id,
      is_active: algorithm.is_active,
      name: algorithm.algorithm.name,
    }));
  } catch (error) {}
};

const getPanelProblemFields = async (problemId) => {
  try {
    const res = await axios.get(`${BASE_URL}/problem/${problemId}/field/list`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const postPanelProblemAlgorithms = async (problemId, data, type) => {
  try {
    let res;
    const authToken = localStorage.getItem("access_token");

    if (type === "add") {
      res = await axios.post(
        `${BASE_URL}/problem/${problemId}/algorithm/${data.algorithm_id}/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } else if (type === "edit") {
      res = await axios.patch(
        `${BASE_URL}/problem/${problemId}/algorithm/${data.algorithm_id}/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } else if (type === "delete") {
      res = await axios.delete(
        `${BASE_URL}/problem/${problemId}/algorithm/${data.algorithm_id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } else {
      throw new Error("Invalid type. Type must be 'add', 'edit', or 'delete'.");
    }

    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await retryRefreshToken();
      return postPanelProblemFields(problemId, data, type);
    } else {
      throw error;
    }
  }
};

const postPanelProblemFields = async (problemId, data, type) => {
  try {
    let res;
    const authToken = localStorage.getItem("access_token");

    if (type === "add") {
      res = await axios.post(
        `${BASE_URL}/problem/${problemId}/field/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } else if (type === "edit") {
      res = await axios.patch(
        `${BASE_URL}/problem/${problemId}/field/${data.id}/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } else if (type === "delete") {
      res = await axios.delete(
        `${BASE_URL}/problem/${problemId}/field/${data.id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } else {
      throw new Error("Invalid type. Type must be 'add', 'edit', or 'delete'.");
    }

    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await retryRefreshToken();
      return postPanelProblemFields(problemId, data, type);
    } else {
      throw error;
    }
  }
};

const postPanelProblem = async (data, type) => {
  try {
    let res;
    const authToken = localStorage.getItem("access_token");

    if (type === "add") {
      res = await axios.post(`${BASE_URL}/problem/create`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else if (type === "edit") {
      res = await axios.patch(`${BASE_URL}/problem/${data.id}/update`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else if (type === "delete") {
      res = await axios.delete(`${BASE_URL}/problem/${data.id}/delete`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else {
      throw new Error("Invalid type. Type must be 'add', 'edit', or 'delete'.");
    }

    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await retryRefreshToken();
      return postPanelProblem(data, type);
    } else {
      throw error;
    }
  }
};

const postPanelAlgorithm = async (data, type) => {
  try {
    let res;
    const authToken = localStorage.getItem("access_token");

    if (type === "add") {
      res = await axios.post(`${BASE_URL}/algorithm/create`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else if (type === "edit") {
      res = await axios.patch(`${BASE_URL}/algorithm/${data.id}/update`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else if (type === "delete") {
      res = await axios.delete(`${BASE_URL}/algorithm/${data.id}/delete`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else {
      throw new Error("Invalid type. Type must be 'add', 'edit', or 'delete'.");
    }

    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      await retryRefreshToken();
      return postPanelAlgorithm(data, type);
    } else {
      throw error;
    }
  }
};

export {
  getPanelProblems,
  getPanelAlgorithms,
  postPanelProblem,
  getPanelProblemAlgorithms,
  getPanelProblemFields,
  postPanelProblemFields,
  postPanelProblemAlgorithms,
  postPanelAlgorithm,
  getPanelJobs,
  getPanelSolution,
};
