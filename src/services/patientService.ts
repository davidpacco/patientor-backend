import patients from '../../data/patients';
import { NewPatient, NonSensiblePatientData, Patient } from '../../types';
import { v1 as uuid } from 'uuid';

const getAll = (): Patient[] => {
  return patients;
};

const getNonSensibleData = (): NonSensiblePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addNew = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getAll,
  getNonSensibleData,
  getPatient,
  addNew
};