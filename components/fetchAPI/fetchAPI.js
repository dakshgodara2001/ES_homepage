const fetchAPI = async (page, limit) => {
  try {
    const response = await fetch(`https://647e10d7af984710854ae35c.mockapi.io/articles?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`There was a problem with the fetch operation: ${err.message}`);
    return [];
  }
};
export { fetchAPI }
