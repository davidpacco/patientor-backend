import patients from '../../data/patients';
import { NonSensiblePatientData, Patient } from '../../types';

const getAll = (): Patient[] => {
  return patients;
};

const getNonSensibleData = (): NonSensiblePatientData[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getAll,
  getNonSensibleData
};