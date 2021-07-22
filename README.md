# Patient Appointment System Test
This repository hosts the source code of a patient appointment system.

The system is built using ReactJS for the frontend, Express/nodeJS for the backend, and MongoDB Altas for the database.

The system supports the following features:

1. Login component for patients and doctors using their id and name.
2. View scheduled appointments (doctor and patient)
3. Fix doctor appointments by patient, doctor, date and time (patient)
4. Cancel appointment by patient, doctor and date and time (doctor and patient)


The structure of the data objects are as follows:

Patient Collection: 
- patient_id:string
- patient_name:string
- patient_age:string
- patient_gender:string
- patient_blood_type:string

Doctor Collection: 
- doctor_id:string
- doctor_name:string
- doctor_rank:string
- doctor_specialization:string

Appointment Collection: 
- appointmentID:string
- appointment_datetime:date
- doctor_id:string
- patient_id:string

Web application is deployed on : https://patient-appointment-system.netlify.app/

The backend is deployed on: https://kangjinga-appointment-system.herokuapp.com/

## Getting started

### Frontend
1. `cd client`
2. `npm install`
3. Add/Configure the url endpoint of the server into your `.env` file
4. `npm start`

### Backend
1. `cd server`
2. Add/Configure the uri endpoint of the database into your `.env` file
3. run `node index.js` to start the server