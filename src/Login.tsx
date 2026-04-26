import { useState } from 'react'
import { supabase } from './supabaseClient'

function Login() {
  // stores what the user types in each field
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // stores an error message if login fails
  const [error, setError] = useState('')

  const handleLogin = async () => {
    // sends email and password to supabase to check if the account exists
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) setError(error.message) // wrong email/password etc, show the error
    // if it worked, no need to do anything here — App.tsx will automatically
    // detect the new user and switch to the profile page
  }

  return (
    <div className="auth-form">
      <h1>log in</h1>

      <input
        type="email"
        placeholder="email"
        onChange={e => setEmail(e.target.value)} // update email as they type
      />

      <input
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)} // update password as they type
      />

      <button onClick={handleLogin}>log in</button>

      {error && <p>{error}</p>} {/* only shows if there's an error */}
    </div>
  )
}

export default Login