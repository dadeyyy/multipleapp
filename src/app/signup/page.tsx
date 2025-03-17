import Link from 'next/link';
import SignupForm from './SignupForm';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Signup</h2>
        <SignupForm />
      </div>
    </div>
  );
}
