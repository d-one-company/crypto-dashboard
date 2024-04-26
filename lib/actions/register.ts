'use server';

import { z } from 'zod';
import { userCreateSchema } from '../validators/users';
import { hashPassword } from '../utils/crypto';
import { users } from '@/db/schema';
import { db } from '@/db';

type UserData = z.infer<typeof userCreateSchema>;

export async function register({ email, password, name, username }: UserData) {
  const zodResult = userCreateSchema.safeParse({ email, password, name, username });
  if (!zodResult.success) {
    return { errorCode: 400, message: 'Bad request' };
  }

  try {
    const hashedPassword = await hashPassword(password);
    const user = await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
      username,
    });

    if (!user) return { errorCode: 500, message: 'Failed to create user!' };

    return { email, username, name };
  } catch (error) {
    console.log(error);
    return { errorCode: 500, message: 'Internal server error' };
  }
}
