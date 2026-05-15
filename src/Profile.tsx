import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import CharakterGestaltung from './CharakterGestaltung'
import Character from './Character'
import './App.css'
import InterestsSection from './InterestsSection'

import infoIcon from './assets/info_icon.png'
import editIcon from './assets/edit_icon.png'

interface Props {
  user: any
}

/* ------------------------------
   Character placeholder
------------------------------ */
function CharacterPlaceholder({ gender, topIndex, bottomIndex, hairIndex, shoeIndex }: any) {
  return (
    <div className="character-placeholder">
      <div className="character-placeholder-inner">
        <Character
          gender={gender}
          topIndex={topIndex}
          bottomIndex={bottomIndex}
          hairIndex={hairIndex}
          shoeIndex={shoeIndex}
        />
      </div>
    </div>
  )
}

/* ------------------------------
   Profile details
------------------------------ */
function ProfileDetails({
  user,
  initialData,
  averageScore
}: {
  user: any
  initialData: any
  averageScore: number | null
}) {
  const [shortDesc, setShortDesc] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [username, setUsername] = useState('Laden...')
  const [editingField, setEditingField] = useState<'short-desc' | 'about-me' | null>(null)

  const toggleField = (field: 'short-desc' | 'about-me') => {
    setEditingField(prev => (prev === field ? null : field))
  }

  useEffect(() => {
    if (!initialData) return
    setShortDesc(initialData.short_description || '')
    setAboutMe(initialData.about_me || '')
    setUsername(initialData.username || 'Noch kein Benutzername')
  }, [initialData])

  return (
    <div className="profile-info">
      <div className="username">@{username}</div>

      <div className="short-desc editable-row">
        {editingField === 'short-desc' ? (
          <input
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            placeholder="beschreibe dich in 3 worten..."
            onBlur={() => setEditingField(null)}
          />
        ) : (
          <span>{shortDesc || 'beschreibe dich in 3 worten...'}</span>
        )}

        <button className="edit-button" onClick={() => toggleField('short-desc')}>
          <img src={editIcon} alt="edit" />
        </button>
      </div>

      <div className="about-me editable-row">
        {editingField === 'about-me' ? (
          <textarea className="editable-textarea"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            placeholder="kleines bio über dich..."
            onBlur={() => setEditingField(null)}
          />
        ) : (
          <span>{aboutMe || 'kleines bio über dich...'}</span>
        )}

        <button className="edit-button" onClick={() => toggleField('about-me')}>
          <img src={editIcon} alt="edit" />
        </button>
      </div>

      <div className="profile-depth">
        <span className="depth-label">Profiltiefe</span>

        {averageScore !== null ? (
          <>
            <div className="depth-stars">
              {'★'.repeat(Math.round(averageScore))}
            </div>
            <span className="depth-number">
              {averageScore.toFixed(1)}
            </span>
          </>
        ) : (
          <div className="depth-locked">
            noch nicht freigeschaltet
            <p>
              Wird freigeschaltet, sobald du 5 Antworten für Interessen eingegeben hast.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------
   Side panel (RESTORED 3 SECTIONS)
------------------------------ */
function SideInfo() {
  return (
    <aside className="side-rect" aria-hidden>
      <h1>Lieblingsdinge</h1>

      <div className="fav-section">
        <div className="rect-content">Section 1 Content</div>
      </div>

      <div className="fav-section">
        <div className="rect-content">Section 2 Content</div>
      </div>

      <div className="fav-section">
        <div className="rect-content">Section 3 Content</div>
      </div>
    </aside>
  )
}

/* ------------------------------
   MAIN VIEWPORT
------------------------------ */
function ProfileViewport({ user }: Props) {
  const [profileData, setProfileData] = useState<any>(null)
  const [averageScore, setAverageScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      setLoading(true)

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      setProfileData(profile)

      const { data: answers } = await supabase
        .from('answers')
        .select('score')
        .eq('user_id', user.id)

      if (answers && answers.length >= 5) {
        const total = answers.reduce((sum, a) => sum + (a.score || 0), 0)
        setAverageScore(total / answers.length)
      } else {
        setAverageScore(null)
      }

      setLoading(false)
    }

    fetchData()
  }, [user])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Lädt...</p>
      </div>
    )
  }

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
              shoeIndex={profileData?.shoe_index || 0}
            />

            <ProfileDetails
              user={user}
              initialData={profileData}
              averageScore={averageScore}
            />
          </div>
        </section>

        <SideInfo />
      </div>

      <div className="interests-header">
        <h1>Interessen</h1>

        <div className="info-tooltip">
          <img
            src={infoIcon}
            alt="info"
            className="info-icon"
          />

          <div className="tooltip-box">
            <strong>Authentizitätslevel</strong>
            <br />

            <small>
              Deine Antworten werden mit 1–5 Sternen bewertet.
              Persönlichere und ausführlichere Antworten erhalten mehr Sterne.
            </small>

            <div className="tooltip-row">
              <span>★</span>
              <span>verschlossen</span>
            </div>

            <div className="tooltip-row">
              <span>★★</span>
              <span>vorsichtig offen</span>
            </div>

            <div className="tooltip-row">
              <span>★★★</span>
              <span>authentisch</span>
            </div>

            <div className="tooltip-row">
              <span>★★★★</span>
              <span>ausdrucksstark</span>
            </div>

            <div className="tooltip-row">
              <span>★★★★★</span>
              <span>sehr tiefgründig</span>
            </div>
          </div>
        </div>
      </div>

        <InterestsSection user={user} editIcon={editIcon} />
      </div>
      )
}

      /* ------------------------------
         PAGE WRAPPER
      ------------------------------ */
      export default function Profile({user}: Props) {
  const [route, setRoute] = useState<'home' | 'page1' | 'page2' | 'page3'>('home')
      const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = async () => {
        await supabase.auth.signOut()
      }

      return (
      <div className="page">
        <aside className="sidebar">
          <h2>Seiten</h2>

          <button onClick={() => setRoute('home')}>Home</button>
          <button onClick={() => setRoute('page1')}>Charakter</button>
          <button onClick={() => setRoute('page2')}>Page 2</button>
          <button onClick={() => setRoute('page3')}>Page 3</button>

          <div className="sidebar-footer">
            <button onClick={() => setShowLogoutConfirm(true)}>
              abmelden
            </button>
          </div>
        </aside>

        <div className="content">
          {route === 'home' ? (
            <ProfileViewport user={user} />
          ) : route === 'page1' ? (
            <CharakterGestaltung user={user} />
          ) : (
            <div className="placeholder">
              <h1>{route}</h1>
              <p>Blank page</p>
            </div>
          )}
        </div>

        {showLogoutConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Abmelden?</h3>
              <button onClick={handleLogout}>Ja</button>
              <button onClick={() => setShowLogoutConfirm(false)}>Nein</button>
            </div>
          </div>
        )}
      </div>
      )
}