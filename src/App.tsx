import { useState } from 'react'
import './App.css'

function App() {
  const [route, setRoute] = useState<'home' | 'page1' | 'page2' | 'page3'>('home')

  return (
    <div className="page debug-outline">
      <aside className="sidebar" aria-label="Sidebar navigation">
        <h2>Pages</h2>
        <nav>
          <ul>
            <li>
              <button onClick={() => setRoute('home')} className={route === 'home' ? 'active' : ''}>Home</button>
            </li>
            <li>
              <button onClick={() => setRoute('page1')} className={route === 'page1' ? 'active' : ''}>Page 1</button>
            </li>
            <li>
              <button onClick={() => setRoute('page2')} className={route === 'page2' ? 'active' : ''}>Page 2</button>
            </li>
            <li>
              <button onClick={() => setRoute('page3')} className={route === 'page3' ? 'active' : ''}>Page 3</button>
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
          <div className="viewport">
            <div className="top-headers">
              <h1>Main Section</h1>
            </div>

            <main className="top-area">
              <section className="main-card">
                <p>This section is centered and on the same plane as the rectangle.</p>
              </section>

              <aside className="side-rect" aria-hidden>
                <div className="rect-content">Placeholder content</div>
              </aside>
            </main>

            <h1>Gallery</h1>

            <section className="gallery" aria-label="Gallery of tiles">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`tile tile-${i + 1}`}>Tile {i + 1}</div>
              ))}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
