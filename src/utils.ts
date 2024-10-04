import { Gender, HealthCheckRating } from "../types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional()
});

const DiagnosisCodeSchema = DiagnosisSchema.shape.code;

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisCodeSchema).optional()
}).strict();

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
}).strict();

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  })
}).strict();

const OccupationalHealthcareSchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date()
  }).optional()
}).strict();

export const NewEntrySchema = z.union([HealthCheckEntrySchema, HospitalEntrySchema, OccupationalHealthcareSchema]);
