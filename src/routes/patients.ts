/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensiblePatientData } from '../../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensiblePatientData[]>) => {
  res.send(patientService.getNonSensibleData());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const addedPatient = patientService.addNew({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  res.json(addedPatient);
});

export default router;