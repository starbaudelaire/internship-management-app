import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/login');
  
  // This part is unreachable but good practice for clarity and to satisfy React's requirement for a return value.
  return null;
}