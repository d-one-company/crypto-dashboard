'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { comparePassword } from '../utils/crypto';

export async function login({ email, password }: { email: string; password: string }) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) return null;
    if (user.password && !(await comparePassword(password, user.password))) return null;

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      image: user.image,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
