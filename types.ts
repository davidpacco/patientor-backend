import { z } from 'zod';
import { NewPatientSchema } from './src/utils';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

export type NonSensiblePatientData = Omit<Patient, 'ssn'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;