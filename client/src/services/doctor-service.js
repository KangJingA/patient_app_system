const apiUrl = process.env.REACT_APP_apiEndpoint + "/doctor";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

const DoctorService = {
  async getDoctor(data) {
    const url = apiUrl + "/getDoctor";

    let result = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 403) return res.statusText;
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        return { errorMsg: "Error: getDoctor" };
      });

    return result;
  },

  async getDoctors() {
    const url = apiUrl + "/getDoctors";

    let result = await fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        return { errorMsg: "Error: getDoctors" };
      });

    return result;
  },
};

export default DoctorService;
