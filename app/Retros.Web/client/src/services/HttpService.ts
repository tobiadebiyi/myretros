const handleResponse = (response, resolve, reject) => {
  if (response.ok) {
    response.json().then(payload => {
      if (payload.succeded !== undefined && payload.errors !== undefined) {
        if (payload.succeded) {
          if (payload.value) {
            resolve(payload.value);
            return;
          }
          resolve();
        } else {
          reject(payload.errors);
        }
      }
      resolve(payload);
    });
  } else {
    reject("Network response was not ok.");
  }
};

const get = (dataURL: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    fetch(dataURL, {
      credentials: "include"
    })
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
      credentials: "include",
      body: JSON.stringify(data)
    })
      .then((response) => handleResponse(response, resolve, reject))
      .catch(err => {
        reject(err);
      });
  });
};

const remove = (url: string): Promise<void> => {
  return new Promise<any>((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      credentials: "include"
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
  remove,
};
