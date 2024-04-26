import { z } from 'zod';
import { emptyStringAsNullSchema } from './emptyStringAsNull';

export const passwordSchema = z
  .string()
  .min(10, {
    message: 'Please, use a password that is at least 10 characters long',
  })
  .max(100)
  .regex(/[a-z]/, {
    message: 'Please, use a password that contains at least one lowercase letter',
  })
  .regex(/[A-Z]/, 'Please, use a password that contains at least one uppercase letter')
  .regex(/[0-9]/, 'Please, use a password that contains at least one number')
  .regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/, 'Please, use a password that contains at least one special character');

export const userCreateSchema = z.object({
  email: z.string({ required_error: 'Please enter your email' }).min(1, { message: 'Please enter your email' }).email({ message: 'Please enter a valid email' }),
  username: z.string().min(1, { message: 'Please enter a desired username' }).max(50, {
    message: 'Please, use a username shorter than 50 characters',
  }),
  password: passwordSchema,
  name: emptyStringAsNullSchema,
});
