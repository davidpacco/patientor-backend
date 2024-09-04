import express, { Response } from 'express';
import diagnoseService from '../services/diagnosisService';
import { Diagnosis } from '../../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnoseService.getAll());
});

export default router;