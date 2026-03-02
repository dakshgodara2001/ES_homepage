const fetchAPI = async (options = {}, limitArg) => {
  const pageParam = typeof options === 'number' ? options : (options.pageParam || 1);
  const limit = typeof options === 'number' ? (limitArg || 20) : (options.limit || 20);
  try {
    const response = await fetch(`https://647e10d7af984710854ae35c.mockapi.io/articles?page=${pageParam}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const nextPage = data.length < limit ? undefined : pageParam + 1;
    return { data, nextPage };
  } catch (err) {
    throw new Error(`Fetch failed: ${err.message}`);
  }
};

export {fetchAPI}

