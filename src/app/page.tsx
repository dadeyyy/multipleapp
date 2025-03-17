import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { deleteAccount } from '../actions/AuthActions/deleteAccount';
import { signout } from '../actions/AuthActions/signoutAction';

export default async function Home() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-center items-center py-16">
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/features/todo"
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl"
          >
            <span className="mr-2 text-xl">✓</span>
            <span className="font-medium">Todo</span>
          </Link>

          <Link
            href="/features/gdrive"
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-xl"
          >
            <span className="mr-2 text-xl">☁️</span>
            <span className="font-medium">Google Drive</span>
          </Link>

          <Link
            href="/features/foodreview"
            className="flex items-center px-6 py-3 bg-yellow-500 text-white rounded-xl"
          >
            <span className="mr-2 text-xl">🍔</span>
            <span className="font-medium">Food Review</span>
          </Link>

          <Link
            href="/features/pokemon"
            className="flex items-center px-6 py-3 bg-red-500 text-white rounded-xl"
          >
            <span className="mr-2 text-xl">⚡</span>
            <span className="font-medium">Pokemon</span>
          </Link>

          <Link
            href="/features/markdown"
            className="flex items-center px-6 py-3 bg-purple-500 text-white rounded-xl"
          >
            <span className="mr-2 text-xl">📝</span>
            <span className="font-medium">Markdown</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 mt-6">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-8">
          Hello, <span className="font-semibold text-blue-600">{data.user.email}</span>
        </p>
        <form className="space-y-4">
          <button
            formAction={signout}
            className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-3 rounded-xl shadow-md"
          >
            Sign Out
          </button>
          <button
            formAction={deleteAccount}
            className="w-full text-white cursor-pointer bg-red-500 hover:bg-red-600 py-3 rounded-xl"
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
}