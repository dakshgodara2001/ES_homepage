
const fetchAPI = () => {
    return new Promise((resolve, reject) => {
      fetch(`https://647e10d7af984710854ae35c.mockapi.io/articles`)
        .then((response) => {
          resolve(response.json());
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  export { fetchAPI }