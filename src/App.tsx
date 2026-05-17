import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { Routes, Route } from 'react-router-dom'
import Profile from './Profile'
import PublicProfile from './PublicProfile.tsx'
import Homepage from './Homepage'
import type { User } from '@supabase/supabase-js'

function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((event, session) => {
        console.log("auth event:", event)
        console.log("session:", session)

        setUser(session?.user ?? null)
      })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Routes>
      {/* public homepage */}
      <Route path="/" element={<Homepage />} />

      <Route
  path="/app"
  element={user ? <Profile user={user} /> : <Homepage />}
/>

      {/* public shareable profile */}
      <Route path="/u/:username" element={<PublicProfile />} />
    </Routes>
  )
}

export default App