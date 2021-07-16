const apiUrl = process.env.REACT_APP_apiEndpoint + "/patient";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

const PatientService = {
  async getPatient(data) {
    const url = apiUrl + "/getPatient";

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
        return { errorMsg: "Error: getPatient" };
      });

    return result;
  },
};

export default PatientService;
