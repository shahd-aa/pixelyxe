import React, { useEffect } from 'react'
import './SettingsPage.css'
import { supabase } from '../supabaseClient'

type Props = {
  setRoute: (r: 'home' | 'page1' | 'page2' | 'settings') => void
  user: any
}

const SettingsPage: React.FC<Props> = ({ setRoute, user }) => {

  const setTheme = async (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)

    const { error } = await supabase
      .from('profiles')
      .update({ theme })
      .eq('id', user.id)

    console.log(error)
  }

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])

  return (
    <div className="settings-page">
      <h1>Einstellungen</h1>

      <section className="settings-section">
        <h2>Farbpaletten</h2>

        <div className="theme-grid">
          <button onClick={() => setTheme('default')}>Standard</button>
          <button onClick={() => setTheme('ocean')}>Ozean</button>
          <button onClick={() => setTheme('sunset')}>Sonnenuntergang</button>
          <button onClick={() => setTheme('mint')}>Minze</button>
          <button onClick={() => setTheme('mono')}>Monochrom</button>
        </div>
      </section>

      <button className="back-btn" onClick={() => setRoute('home')}>
        zurück
      </button>
    </div>
  )
}

export default SettingsPage