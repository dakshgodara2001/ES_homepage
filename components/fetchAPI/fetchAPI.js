const fetchAPI = async ({ pageParam = 1 }) => {
  try {
    const response = await fetch(`https://647e10d7af984710854ae35c.mockapi.io/articles?page=${pageParam}&limit=20`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data, nextPage: pageParam + 1 };
  } catch (err) {
    console.error(`There was a problem with the fetch operation: ${err.message}`);
    return [];
  }
};

export {fetchAPI}

