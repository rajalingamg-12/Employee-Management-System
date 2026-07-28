import api from "./api";

export const submitTask = async (formData) => {
  const params = new URLSearchParams();

  params.append("action", "submitTask");

  Object.keys(formData).forEach((key) => {
    params.append(key, formData[key] ?? "");
  });

  const response = await api.post("", params);

  return response.data;
};

export const getMyTasks = async (employeeId) => {
  const params = new URLSearchParams();

  params.append("action", "getMyTasks");
  params.append("employeeId", employeeId);

  const response = await api.post("", params);

  return response.data;
};

export const getAllTasks = async () => {
  const params = new URLSearchParams();

  params.append("action", "getAllTasks");

  const response = await api.post("", params);

  return response.data;
};