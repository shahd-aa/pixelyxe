import React, { useEffect } from 'react'
import './SettingsPage.css'

type Props = {
  setRoute: (r: 'home' | 'page1' | 'page2' | 'settings') => void
}

const SettingsPage: React.FC<Props> = ({ setRoute }) => {

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
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
        <h2>Themes</h2>

        <div className="theme-grid">
          <button onClick={() => setTheme('default')}>Default</button>
          <button onClick={() => setTheme('ocean')}>Ocean</button>
          <button onClick={() => setTheme('sunset')}>Sunset</button>
          <button onClick={() => setTheme('mint')}>Mint</button>
          <button onClick={() => setTheme('mono')}>Mono</button>
        </div>
      </section>

      <button className="back-btn" onClick={() => setRoute('home')}>
        zurück
      </button>
    </div>
  )
}

export default SettingsPage