import Link from 'next/link';

export default function ConfirmEmailPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1>Please verify your email.</h1>
      <p>
        Go to{' '}
        <Link className="text-blue-400" href={'/login'}>
          Login
        </Link>
      </p>
    </div>
  );
}
