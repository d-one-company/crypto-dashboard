'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Form = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (res?.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        handleSubmit(event);
      }}
    >
      <input className="border border-white bg-black" type="text" name="email" placeholder="Email" />
      <input className="border border-white bg-black" type="password" name="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Form;
