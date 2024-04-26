import { redirect } from 'next/navigation';
import { register } from '@/lib/actions/register';

const Form = () => {
  return (
    <form
      action={async formData => {
        'use server';
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();
        const name = formData.get('name')?.toString();
        const username = formData.get('username')?.toString();
        if (!email || !password || !name || !username) return console.error('All fields are required');
        const res = await register({ email, password, name, username });
        if (!res.errorCode) return redirect('/signin');
        return alert(res.message);
      }}
    >
      <input className="border border-white bg-black" type="text" name="name" placeholder="Name" />
      <input className="border border-white bg-black" type="text" name="username" placeholder="Username" />
      <input className="border border-white bg-black" type="text" name="email" placeholder="Email" />
      <input className="border border-white bg-black" type="password" name="password" placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Form;
