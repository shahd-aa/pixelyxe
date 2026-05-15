import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Homepage from './Homepage'
import Profile from './Profile'
import type { User } from '@supabase/supabase-js'

function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
  // onAuthStateChange listens for ANY auth event (login, logout, signup)
  // and automatically updates the user whenever something changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null) // if there's a session set the user, otherwise set null
  })

  // cleanup: stop listening when the component unmounts
  return () => subscription.unsubscribe()
}, [])

  if (user) return <Profile user={user} /> // logged in → show profile
  return <Homepage />                      // not logged in → show homepage
}

export default App