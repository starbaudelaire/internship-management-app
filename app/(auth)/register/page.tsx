'use client';

import Link from 'next/link';

import { UserPlus, GraduationCap } from 'lucide-react';

import React, { useEffect } from 'react'; // Import React for useActionState

import { useActionState, useFormStatus } from 'react-dom'; // Changed useFormState to useActionState

import { registerUser } from '@/actions/register-user';

import { toast } from 'sonner';



// A separate component for the submit button to use the useFormStatus hook

function SubmitButton() {

  const { pending } = useFormStatus();



  return (

    <button

      type="submit"

      disabled={pending}

      className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"

    >

      <UserPlus className="h-5 w-5 mr-2" />

      {pending ? 'Mendaftarkan...' : 'Daftar'}

    </button>

  );

}



export default function RegisterPage() {

  // Initial state for our form

  const initialState = { success: false, message: '', errors: [] };

  const [state, formAction] = React.useActionState(registerUser, initialState); // Use React.useActionState



  useEffect(() => {

    if (state?.message && !state.success) {

      toast.error(state.message);

    }

    // We don't show a success toast here because the action redirects on success

  }, [state]);



  // Helper to find error messages for a specific field

  const getError = (field: string) =>

    state.errors?.find((e) => e.path.includes(field))?.message;



  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">

        <div className="text-center mb-6">

          <GraduationCap className="mx-auto h-12 w-12 text-blue-600" />

          <h2 className="mt-4 text-2xl font-bold text-gray-900">

            Buat Akun Mahasiswa

          </h2>

          <p className="mt-2 text-sm text-gray-600">

            Lengkapi data diri untuk mendaftar

          </p>

        </div>

        <form action={formAction} className="space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">

                Nama Depan

              </label>

              <input id="firstName" name="firstName" type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>

              {getError('firstName') && <p className="text-xs text-red-500 mt-1">{getError('firstName')}</p>}

            </div>

            <div>

              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">

                Nama Belakang

              </label>

              <input id="lastName" name="lastName" type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>

              {getError('lastName') && <p className="text-xs text-red-500 mt-1">{getError('lastName')}</p>}

            </div>

          </div>



          <div>

            <label htmlFor="nim" className="block text-sm font-medium text-gray-700">

              NIM (Nomor Induk Mahasiswa)

            </label>

            <input id="nim" name="nim" type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>

            {getError('nim') && <p className="text-xs text-red-500 mt-1">{getError('nim')}</p>}

          </div>



          <div>

            <label htmlFor="email" className="block text-sm font-medium text-gray-700">

              Email

            </label>

            <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>

              {getError('email') && <p className="text-xs text-red-500 mt-1">{getError('email')}</p>}

          </div>



          <div>

            <label htmlFor="password" className="block text-sm font-medium text-gray-700">

              Password

            </label>

            <input id="password" name="password" type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"/>

            {getError('password') && <p className="text-xs text-red-500 mt-1">{getError('password')}</p>}

          </div>



          <SubmitButton />



        </form>

        <div className="mt-6 text-center">

          <p className="text-sm text-gray-600">

            Sudah punya akun?{' '}

            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}
