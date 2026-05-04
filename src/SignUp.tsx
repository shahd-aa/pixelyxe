import { useState } from 'react'
import { supabase } from './supabaseClient'

function SignUp({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async () => {
    // check if username is already taken before signing up
    const { data: existing } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle()

    if (existing) {
      setError('username is already taken!')
      return // stop here, don't create the account
    }

    // 1. Create the Auth account
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    // 2. Update the profile row with the username
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ 
          id: data.user.id, 
          username: username 
        })

      if (profileError) {
        console.error('Profile creation error:', profileError.message)
        // Note: If this fails, the Auth account is still created.
      }
    }
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h1>anmelden</h1>
      <input
        type="text"
        placeholder="benutzername"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="passwort"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>anmelden</button>
      {error && <p>{error}</p>}
      </div>
      <p className="auth-toggle">Du hast schon ein Konto? <button className="auth-toggle-btn" onClick={onToggle}>Hier einloggen</button></p>
    </div>
  )
}

export default SignUp