const get = (dataURL: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    fetch(dataURL)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            resolve(data);
          });
        } else {
          reject("Network response was not ok.");
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export {
  get,
};
