import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { userCreateSchema } from '@/lib/validators/users';
import { hashPassword } from '@/lib/utils/crypto';

export async function POST(request: Request) {
  const body = await request.json();
  const zodResult = userCreateSchema.safeParse(body);

  if (!zodResult.success) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400, statusText: 'Bad Request' });
  }

  const { email, username, password, name } = zodResult.data;

  try {
    const hashedPassword = await hashPassword(password);

    const user = await db.insert(users).values({
      name,
      email,
      username,
      password: hashedPassword,
    });

    if (!user) {
      return NextResponse.json({ message: 'Failed to create user!' }, { status: 500, statusText: 'Something went wrong' });
    }

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
