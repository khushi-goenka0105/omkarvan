import axios from "axios";

const BASE_URL =
  "${API_BASE_URL}/api";

export const getAllTrees = () => {
  return axios.get(
    `${BASE_URL}/trees`
  );
};

export const createTree = (tree) => {
  return axios.post(
    `${BASE_URL}/trees`,
    tree
  );
};

export const createDonor = (donor) => {
  return axios.post(
    `${BASE_URL}/donors`,
    donor
  );
};

export const getTreeByCode = (
  treeCode
) => {
  return axios.get(
    `${BASE_URL}/trees/${treeCode}`
  );
};