import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { NewPatient, NonSensiblePatientData, Patient } from '../../types';
import { NewPatientSchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensiblePatientData[]>) => {
  res.send(patientService.getNonSensibleData());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addNew(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;