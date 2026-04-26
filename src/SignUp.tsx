import { useState } from 'react'
import { supabase } from './supabaseClient'

function SignUp() {
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
      .single()

    if (existing) {
      setError('username is already taken!')
      return // stop here, don't create the account
    }

    // create the auth account
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    // save the username to their profile row
    await supabase
      .from('profiles')
      .update({ username })
      .eq('id', data.user.id)

    if (error) setError(error)
  }

  return (
    <div className="auth-form">
      <h1>sign up</h1>
      <input
        type="text"
        placeholder="username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>sign up</button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default SignUp