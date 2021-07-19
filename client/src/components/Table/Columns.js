export const Columns = [
  {
    Header: "Doctor ID",
    accessor: "doctor_id", 
    disableSortBy: true, 
  },
  {
    Header: "Doctor Name",
    accessor: "doctor_name",
  },
  {
    Header: "Patient ID",
    accessor: "patient_name",
  },
  {
    Header: "Patient Age",
    accessor: "patient_age",
  },
  {
    Header: "Patient Gender",
    accessor: "patient_gender",
  },
  {
    Header: "Appointment ID",
    accessor: "appointment_id",
  },
  {
    Header: "Appointment Time",
    accessor: "appointment_date_time",
    Cell: ({ cell: { value } }) => {
        return new Date(value).toLocaleString();}
  },
];
