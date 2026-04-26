import { useState } from 'react'
import './App.css'

interface Props {
  user: any
}

// ------------------------------
// Character placeholder tile
// ------------------------------
function CharacterPlaceholder() {
  return <div className="character-placeholder">character placeholder</div>
}

// ------------------------------
// Profile details with editable fields
// ------------------------------
function ProfileDetails({ user }: Props) {
  const [nickname, setNickname] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [editingField, setEditingField] = useState<'nickname' | 'short-desc' | 'about-me' | null>(null)

  const nicknamePlaceholder = 'give yourself a nickname!'
  const shortDescPlaceholder = 'describe your personality in 3 words'
  const aboutMePlaceholder = 'short bio about you'

  const editIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='%23000' d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.3 1.45L5 19.4 14.06 10.34l.3.3L5.3 18.7zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z'/%3E%3C/svg%3E"

  const toggleField = (field: 'nickname' | 'short-desc' | 'about-me') => {
    setEditingField(editingField === field ? null : field)
  }

  return (
    <div className="profile-info">
      {/* nickname / display name */}
      <div className="nickname editable-row">
        {editingField === 'nickname' ? (
          <input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            placeholder={nicknamePlaceholder}
            className="editable-input"
          />
        ) : (
          <span className="editable-placeholder">{nickname || nicknamePlaceholder}</span>
        )}
        <button type="button" className="edit-button" onClick={() => toggleField('nickname')}>
          <img src={editIcon} alt="edit" className="edit-icon" />
        </button>
      </div>

      {/* username / static value for now */}
      <div className="username">Username</div>

      {/* simple stats row */}
      <div className="stats">
        <div className="level">Level</div>
        <div className="badges">Badges</div>
        <div className="signup-date">Date of signing up</div>
      </div>

      {/* short description field */}
      <div className="short-desc editable-row">
        {editingField === 'short-desc' ? (
          <input
            value={shortDesc}
            onChange={(event) => setShortDesc(event.target.value)}
            placeholder={shortDescPlaceholder}
            className="editable-input"
          />
        ) : (
          <span className="editable-placeholder">{shortDesc || shortDescPlaceholder}</span>
        )}
        <button
          type="button"
          className="edit-button"
          onClick={() => toggleField('short-desc')}
        >
          <img src={editIcon} alt="edit" className="edit-icon" />
        </button>
      </div>

      {/* about me / longer bio field */}
      <div className="about-me editable-row editable-area">
        {editingField === 'about-me' ? (
          <textarea
            value={aboutMe}
            onChange={(event) => setAboutMe(event.target.value)}
            rows={3}
            placeholder={aboutMePlaceholder}
            className="editable-textarea"
          />
        ) : (
          <span className="editable-placeholder">{aboutMe || aboutMePlaceholder}</span>
        )}
        <button
          type="button"
          className="edit-button"
          onClick={() => toggleField('about-me')}
        >
          <img src={editIcon} alt="edit" className="edit-icon" />
        </button>
      </div>
    </div>
  )
}

// ------------------------------
// Side panel placeholder
// ------------------------------
function SideInfo() {
  return (
    <aside className="side-rect" aria-hidden>
      <h1>Abzeichen</h1>
      <div className="rect-content">Placeholder content</div>
    </aside>
  )
}

// ------------------------------
// Main profile viewport
// ------------------------------
function ProfileViewport({ user }: Props) {
  return (
    <div className="viewport">
      <div className="top-area">
        <section className="main-card">
          <h1>Profil</h1>
          <div className="profile-layout">
            <CharacterPlaceholder />
            <ProfileDetails user={user} />
          </div>
        </section>
        <SideInfo />
      </div>

      <h1>Interessen</h1>

      <section className="gallery" aria-label="Gallery of tiles">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`tile tile-${i + 1}`}>Tile {i + 1}</div>
        ))}
      </section>
    </div>
  )
}

// ------------------------------
// Page wrapper with sidebar navigation
// ------------------------------
function Profile({ user }: Props) {
  const [route, setRoute] = useState<'home' | 'page1' | 'page2' | 'page3'>('home')

  return (
    <div className="page debug-outline">
      <aside className="sidebar" aria-label="Sidebar navigation">
        <h2>Pages</h2>
        <nav>
          <ul>
            <li>
              <button onClick={() => setRoute('home')} className={route === 'home' ? 'active' : ''}>
                Home
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('page1')} className={route === 'page1' ? 'active' : ''}>
                Page 1
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('page2')} className={route === 'page2' ? 'active' : ''}>
                Page 2
              </button>
            </li>
            <li>
              <button onClick={() => setRoute('page3')} className={route === 'page3' ? 'active' : ''}>
                Page 3
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="content">
        {route !== 'home' ? (
          <div className="placeholder">
            <h1>{route === 'page1' ? 'Page 1' : route === 'page2' ? 'Page 2' : 'Page 3'}</h1>
            <p>This is a blank placeholder page.</p>
          </div>
        ) : (
          <ProfileViewport user={user} />
        )}
      </div>
    </div>
  )
}

export default Profile