import qs from "qs";
import client from "./client";

const API_VERSION = "/api/v4";

export const getFilters = () => client.get(`${API_VERSION}/filters`);
