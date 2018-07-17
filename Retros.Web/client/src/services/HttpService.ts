const handleResponse = (response, resolve, reject) => {
    if (response.ok) {
      response.json().then(payload => {
        resolve(payload);
      });
    } else {
      reject("Network response was not ok.");
    }
};

const get = (dataURL: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    fetch(dataURL)
      .then((response) => handleResponse(response, resolve, reject))
      .catch(err => {
        reject(err);
      });
  });
};

const post = (url: string, data: any): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => handleResponse(response, resolve, reject))
      .catch(err => {
        reject(err);
      });
  });
};

export {
  get,
  post,
};
