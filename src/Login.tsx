import { useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate } from "react-router-dom"

function Login({ onToggle }: { onToggle: () => void }) {
  // stores what the user types in each field
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // stores an error message if login fails
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    // sends email and password to supabase to check if the account exists
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (data.session) {
      navigate("/app")
    }

    if (error) setError(error.message) // wrong email/password etc, show the error
    // if it worked, no need to do anything here — App.tsx will automatically
    // detect the new user and switch to the profile page
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h1>einloggen</h1>

        <input
          type="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)} // update email as they type
        />

        <input
          type="password"
          placeholder="passwort"
          onChange={e => setPassword(e.target.value)} // update password as they type
        />

        <button onClick={handleLogin}>einloggen</button>

        {error && <p>{error}</p>} {/* only shows if there's an error */}
      </div>
      <p className="auth-toggle">Noch kein Konto? <button className="auth-toggle-btn" onClick={onToggle}>Hier anmelden</button></p>
    </div>
  )
}

export default Login