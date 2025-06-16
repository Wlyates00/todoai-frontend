import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from './contexts/UserContext'
import { Navigate } from 'react-router-dom'
import { useUser } from './contexts/UserContext'

export default function AuthPage() {
  const user = useUser();

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Sign Up / Log In</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']}
        />
      </div>
    </div>
  )
}