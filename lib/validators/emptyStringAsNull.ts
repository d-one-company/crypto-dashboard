import { z } from 'zod';

export const emptyStringAsNullSchema = z.preprocess(
  val => (typeof val === 'string' ? val : null),
  z
    .string()
    .nullish()
    .transform(val => (val === '' ? null : val))
);
