import LoginForm from './LoginForm';
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6 ">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
