import { NextResponse } from 'next/server';
import { users } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { comparePassword } from '@/lib/utils/crypto';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.password && !(await comparePassword(password, user.password))) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      image: user.image,
    };

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
