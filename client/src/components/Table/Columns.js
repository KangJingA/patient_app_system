export const Columns = [
  {
    Header: "Doctor ID",
    accessor: "doctor_id", // access row  data based on the key
    disableSortBy: true, // disable sorting
  },
  {
    Header: "Doctor Name",
    accessor: "doctor_name",
    // Cell: ( props ) => {
    //     return (
    //         <button onClick={(e)=>console.log(props)}>{props.value}</button>
    //     )
    // }
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
  // include delete button here?
];
