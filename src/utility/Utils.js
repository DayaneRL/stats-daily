import { redirect } from "react-router-dom";

export const createSearchParams = (data) => {
    const params = new URLSearchParams();
    for (const key in data) {
      const value = data[key];
      if ((value != null && value != '') || value === false) {
        params.append(key, value);
      }
    }
    return params;
};

export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (token) throw redirect("/");
  return null;
};

export const getStoragedData = (name) => {
  try {
    let data_storage = localStorage.getItem(name);

    return JSON.parse(data_storage);
  } catch (error) {
    return null;
  }
}

export const fixTextUtf8 = (name) => {
  return name.replaceAll('&#39;',"'");
}