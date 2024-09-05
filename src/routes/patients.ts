import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensiblePatientData } from '../../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensiblePatientData[]>) => {
  res.send(patientService.getNonSensibleData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addNew(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;