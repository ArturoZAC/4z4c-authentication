import 'dotenv/config'; 
import { z } from 'zod';

const envsSchema = z.object({
  PORT: z.string({message: 'PORT is required'})
  .transform(Number)
  .refine( val => val > 0, {message: 'PORT is cannot be empty'}),
  MONGO_INITDB_ROOT_USERNAME: z.string({message: 'It is required'})
  .nonempty(),
  MONGO_INITDB_ROOT_PASSWORD: z.string({message: 'It is required'})
  .nonempty(),
  URL: z.string().nonempty(),
  DBNAME: z.string().nonempty(),
  JWT_SEED: z
    .string({message: 'JWT_SEED is requried'})
    .nonempty(),
  MAILER_SERVICE: z.string({message: 'MAILER_SERVICE is required'}).nonempty(),
  MAILER_EMAIL: z.string({message: 'MAILER_EMAIL is required'}).nonempty(),
  MAILER_SECRET_KEY: z.string({message: 'MAILER_SECRET_KEY is required'}).nonempty(),
  WEBSERVICE_URL: z.string({message: 'WEBSERVICE_URL is required'}).nonempty(),
})

export const envs = envsSchema.parse(process.env);