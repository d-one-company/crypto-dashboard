'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const UserProfile = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center p-24">
      <button className="bg-green-500 px-2 py-2" onClick={() => router.push('/signup')}>
        SignUp
      </button>
      <button className="bg-blue-500 px-2 py-2" onClick={() => router.push('/signin')}>
        SignIn
      </button>
      <button className="bg-red-500 px-2 py-2" onClick={() => signOut()}>
        SignOut
      </button>
    </div>
  );
};
export default UserProfile;
