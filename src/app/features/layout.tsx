import Link from 'next/link';
import { signout } from '../../actions/AuthActions/signoutAction';
import { deleteAccount } from '../../actions/AuthActions/deleteAccount';
import { createClient } from '@/utils/supabase/server';

export default async function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const email = (await supabase.auth.getUser()).data.user?.email;
  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className=" px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link className="text-lg font-semibold text-gray-800" href={'/'}>
            Secret App
          </Link>
          <p>{email}</p>
          <div className="flex space-x-4">
            <Link href={'/login'} className="text-white font-medium px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600">
              Login
            </Link>
            <Link
              href={'/signup'}
              className="text-white font-medium px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
            >
              Signup
            </Link>
            <form className="flex space-x-2">
              <button
                formAction={signout}
                className="text-white bg-blue-500 font-medium px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 cursor-pointer"
              >
                Logout
              </button>
              <button
                formAction={deleteAccount}
                className="text-white bg-red-500 font-medium px-4 py-2 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 cursor-pointer"
              >
                Delete Account
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black">{children}</div>
    </div>
  );
}
