'use client';

import { signup } from '../../actions/AuthActions/signupAction';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function SignupForm() {
  const signupAction = async (state: { message: string } | null, formData: FormData) => {
    return await signup(formData);
  };

  const [state, formAction, pending] = useActionState(signupAction, null);

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
        />
      </div>
      <button className="w-full rounded-lg bg-gray-600 px-4 py-2 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
        {pending ? 'Signing up...' : 'Sign up'}
      </button>

      <div className="text-end text-blue-500">
        <Link href={'/login'}>Login</Link>
      </div>
    </form>
  );
}
