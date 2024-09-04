import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensiblePatientData } from '../../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensiblePatientData[]>) => {
  res.send(patientService.getNonSensibleData());
});


export default router;