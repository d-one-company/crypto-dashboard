import { getServerSession } from 'next-auth';
import UserProfile from './UserProfile';
import { authOptions } from '@/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-5">
        <span>Email: {session?.user?.email ?? 'Unauthorized'}</span>
      </div>
      <UserProfile />
    </main>
  );
}
