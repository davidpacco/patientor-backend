import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { Entry, NewEntry, NewPatient, NonSensiblePatientData, Patient } from '../../types';
import { NewEntrySchema, NewPatientSchema } from '../utils';
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

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
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

router.get('/:id', (req: Request, res: Response<Patient>) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).end();
  }
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
  const id = req.params.id;
  const addedEntry = patientService.addEntry(id, req.body);

  if (addedEntry) {
    res.json(addedEntry);
  } else {
    res.status(400).end();
  }
});

router.use(errorMiddleware);

export default router;