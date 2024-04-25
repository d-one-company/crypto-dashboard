'use client';
import { redirect } from 'next/navigation';

const Form = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      redirect('/signin');
    }

    const { message } = await res.json();
    console.log(message);
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        handleSubmit(event);
      }}
    >
      <input className="border border-white bg-black" type="text" name="username" placeholder="Name" />
      <input className="border border-white bg-black" type="text" name="username" placeholder="Username" />
      <input className="border border-white bg-black" type="text" name="email" placeholder="Email" />
      <input className="border border-white bg-black" type="password" name="password" placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Form;
