import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import CharakterGestaltung from './CharakterGestaltung'
import Character from './Character';
import './App.css'

interface Props {
  user: any
}

// ------------------------------
// Character placeholder tile
// ------------------------------
function CharacterPlaceholder({ gender, topIndex, bottomIndex, hairIndex }: any) {
  return (
    <div className="character-placeholder" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* We scale the character logicially so the internal offsets (-93px) stay perfectly aligned */}
      <div style={{ transform: 'scale(0.72)', transformOrigin: 'center center', flex: 'none' }}>
        <Character 
          gender={gender}
          topIndex={topIndex}
          bottomIndex={bottomIndex}
          hairIndex={hairIndex}
        />
      </div>
    </div>
  );
}

// ------------------------------
// Profile details with editable fields
// ------------------------------
function ProfileDetails({ user, initialData }: { user: any; initialData: any }) {
  const [shortDesc, setShortDesc] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [username, setUsername] = useState(initialData?.username || 'Loading...')
  const [editingField, setEditingField] = useState<'short-desc' | 'about-me' | null>(null)

  const shortDescPlaceholder = 'describe your personality in 3 words'
  const aboutMePlaceholder = 'short bio about you'

  useEffect(() => {
    if (initialData) {
      setShortDesc(initialData.short_description || '')
      setAboutMe(initialData.about_me || '')
      setUsername(initialData.username || 'No username set')
    }
  }, [initialData])

  const saveField = async (dbField: 'short_description' | 'about_me', value: string) => {
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, [dbField]: value })

    if (error) {
      console.error('Error updating profile:', error)
    } else {
      setEditingField(null)
    }
  }

  const editIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='%23000' d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.3 1.45L5 19.4 14.06 10.34l.3.3L5.3 18.7zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z'/%3E%3C/svg%3E"

  const toggleField = (field: 'short-desc' | 'about-me') => {
    if (editingField === field) {
      const dbField = field === 'short-desc' ? 'short_description' : 'about_me'
      const value = field === 'short-desc' ? shortDesc : aboutMe
      saveField(dbField, value)
    } else {
      setEditingField(field)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, field: 'short-desc' | 'about-me') => {
    if (e.key === 'Enter') {
      // For the longer bio, allow Shift+Enter for new lines
      if (field === 'about-me' && e.shiftKey) return 
      
      e.preventDefault()
      const dbField = field === 'short-desc' ? 'short_description' : 'about_me'
      const value = field === 'short-desc' ? shortDesc : aboutMe
      saveField(dbField, value)
    }
  }

  return (
    <div className="profile-info">
      {/* username display */}
      <div className="username">@{username}</div>

      {/* short description field */}
      <div className="short-desc editable-row">
        {editingField === 'short-desc' ? (
          <input
            value={shortDesc}
            onChange={(event) => setShortDesc(event.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'short-desc')}
            placeholder={shortDescPlaceholder}
            className="editable-input"
          />
        ) : (
          <span className={shortDesc ? "" : "editable-placeholder"}>
            {shortDesc || shortDescPlaceholder}
          </span>
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
            onKeyDown={(e) => handleKeyDown(e, 'about-me')}
            rows={3}
            placeholder={aboutMePlaceholder}
            className="editable-textarea"
          />
        ) : (
          <span className={aboutMe ? "" : "editable-placeholder"}>
            {aboutMe || aboutMePlaceholder}
          </span>
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
  const [profileData, setProfileData] = useState<any>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('username, short_description, about_me, gender, hair_index, top_index, bottom_index')
        .eq('id', user.id)
        .maybeSingle()

      if (!error && data) {
        setProfileData(data)
      }
    }

    fetchProfile()
  }, [user])

  return (
    <div className="viewport">
      <div className="top-area">
        <section className="main-card">
          <h1>Profil</h1>
          <div className="profile-layout">
            <CharacterPlaceholder 
              gender={profileData?.gender || 'female'} 
              topIndex={profileData?.top_index || 0} 
              bottomIndex={profileData?.bottom_index || 0} 
              hairIndex={profileData?.hair_index || 0}
            />
            <ProfileDetails 
              user={user} 
              initialData={profileData}
            />
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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

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
                Charakter-Gestaltung
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

        <div className="sidebar-footer">
          {showLogoutConfirm ? (
            <div className="logout-confirmation">
              <p>are you sure?</p>
              <div className="logout-buttons">
                <button onClick={handleLogout} className="logout-confirm">yes</button>
                <button onClick={() => setShowLogoutConfirm(false)} className="logout-cancel">no</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowLogoutConfirm(true)} className="logout-button">log out</button>
          )}
        </div>
      </aside>

      <div className="content">
        {route === 'home' ? (
          <ProfileViewport user={user} />
        ) : route === 'page1' ? (
          <CharakterGestaltung user={user} />
        ) : (
          <div className="placeholder">
            <h1>{route === 'page2' ? 'Page 2' : 'Page 3'}</h1>
            <p>This is a blank placeholder page.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile