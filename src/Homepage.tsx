import { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'

const slideImages = [
  'https://via.placeholder.com/900x420/5B21B6/ffffff?text=Placeholder+Slide+1',
  'https://via.placeholder.com/900x420/047857/ffffff?text=Placeholder+Slide+2',
  'https://via.placeholder.com/900x420/0F766E/ffffff?text=Placeholder+Slide+3',
]

function SlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handlePrev = () => setCurrentSlide((currentSlide + slideImages.length - 1) % slideImages.length)
  const handleNext = () => setCurrentSlide((currentSlide + 1) % slideImages.length)

  return (
    <div className="slideshow-container">
      <img src={slideImages[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="slide-image" />
      <button type="button" className="slide-nav prev" onClick={handlePrev} aria-label="Previous slide">
        ‹
      </button>
      <button type="button" className="slide-nav next" onClick={handleNext} aria-label="Next slide">
        ›
      </button>
      <div className="slide-dots">
        {slideImages.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function Homepage() {
  const [showSignUp, setShowSignUp] = useState(true)
  const [navTab, setNavTab] = useState<'home' | 'about'>('home')

  return (
    <div>
      <div className="homepage-container horizon">
        <nav className="homepage-nav">
          <div className="nav-left">
            <div className="app-icon"> </div>
            <span>PIXELYXE</span>
          </div>
          <div className="nav-center">
            <button className={navTab === 'home' ? 'active' : ''} onClick={() => setNavTab('home')}>Los geht's</button>
            <button className={navTab === 'about' ? 'active' : ''} onClick={() => setNavTab('about')}>Mehr erfahren</button>
          </div>
        </nav>
        {navTab === 'home' ? (
          <div className="homepage-content">
            <h1>PIXELYXE</h1>
            <h3>
            Wer bist du — in einer Welt voller Algorithmen?  <br />
            Gestalte jetzt deine eigene digitale Identität — <br />
            Zeig, was dich ausmacht. 
            </h3>
            {showSignUp ? <SignUp onToggle={() => setShowSignUp(false)} /> : <Login onToggle={() => setShowSignUp(true)} />}
            <SlideShow />
          </div>
        ) : (
          <div className="about-page">
            <h1>about</h1>
          </div>
        )}
      </div>
      <section className="homepage-extra-section curved-path">
        <div className="seperator-div quote">
            <blockquote>„Deine Identität ist das Sichtbare und Benennbare; dein wahres Selbst liegt jenseits aller Begriffe.”</blockquote>
        </div>
      </section>
      <section className="homepage-extra-section path-end">
        <div className="seperator-div review">
          <div className="review-left">
            <div className="profile-picture"></div>
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="star" />
              ))}
            </div>
          </div>
          <div className="review-text">Ich bin so happy, dass ich endlich ein einzigartiges Profil meiner Personlichkeit erstellen und es meinen Freunden zeigen kann! <span>Quak... Quaaak!</span> </div>
        </div>
      </section>
      <div className="homepage-end-info">
        test test test
      </div>
    </div>
  )
}

export default Homepage