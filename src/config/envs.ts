import 'dotenv/config'; 
import { z } from 'zod';

const envsSchema = z.object({
  PORT: z.string({message: 'PORT is required'})
  .transform(Number)
  .refine( val => val > 0, {message: 'PORT is cannot be empty'}),
})

export const envs = envsSchema.parse(process.env);