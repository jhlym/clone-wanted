import qs from "qs";
import client from "./client";

const API_VERSION = "/api/v4";

export const _getFilters = () => client.get(`${API_VERSION}/filters`);

export const _getJobs = params => {
  const queryString = qs.stringify(params, { arrayFormat: "repeat" });
  return client.get(`${API_VERSION}/jobs?${queryString}`);
};
