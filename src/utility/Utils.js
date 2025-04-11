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