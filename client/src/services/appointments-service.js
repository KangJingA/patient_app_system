const apiUrl = process.env.REACT_APP_apiEndpoint + "/appointment";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

const AppointmentsService = {
  async getPatientAppointments(data) {
    const url = apiUrl + "/patientAppointments";

    let result = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        return { errorMsg: "Error: getPatientAppointments" };
      });

    return result;
  },

  async getDoctorAppointments(data) {
    const url = apiUrl + "/doctorAppointments";

    let result = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        return { errorMsg: "Error: getDoctorAppointments" };
      });

    return result;
  },

  async getDoctorAppointmentsByDate(data) {
    const url = apiUrl + "/doctorAppointmentsByDate";

    let result = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        return { errorMsg: "Error: doctorAppointmentsByDate" };
      });

    return result;
  },

  async fixAppointment(data) {
    const url = apiUrl + "/appointment";

    let result = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 400) return res.text();
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        return { errorMsg: "Error: fixAppointment" };
      });

    return result;
  },

  async deleteAppointment(data) {
    const url = apiUrl + "/appointment";

    let result = await fetch(url, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 400) return res.text();
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        return { errorMsg: "Error: deleteAppointment" };
      });

    return result;
  },
};

export default AppointmentsService;
