import { useState } from 'react'
import Login from '../Login.tsx'
import SignUp from '../SignUp.tsx'
import './Homepage.css'

const slideImages = [
  'https://via.placeholder.com/900x420/5B21B6/ffffff?text=Placeholder+Slide+1',
  'https://via.placeholder.com/900x420/047857/ffffff?text=Placeholder+Slide+2',
  'https://via.placeholder.com/900x420/0F766E/ffffff?text=Placeholder+Slide+3',
]

import firstFeature from '../assets/interest_showcase.png'
import secondFeature from '../assets/customization_showcase.png'
import thirdFeature from '../assets/items_showcase.png'

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
              Wer bist du, in einer Welt voller Algorithmen?  <br />
              Gestalte jetzt deine eigene digitale Identität. <br />
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
        <div className="feature-row">
          <div className="first-feature feature">
            <img
              src={firstFeature}
              alt="Feature"
              className="feature-image"
            />

            <div className="feature-text">
              <h2>Digitale Identität</h2>
              <p>
                Erstelle ein einzigartiges Profil, das deine wahre Persönlichkeit widerspiegelt, indem du Fragen beantwortest.
              </p>
            </div>
          </div>

          <div className="second-feature feature">
            <img
              src={secondFeature}
              alt="Feature"
              className="feature-image second-feature-image"
            />

            <div className="feature-text second-feature-text">
              <h2>Digitale Identität</h2>
              <p>
                Erstelle ein einzig-artiges Profil, das deine wahre Persönlich-keit wider-spiegelt, indem du Fragen beantwortest.
              </p>
            </div>
          </div>
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

         <div className="feature-row">
          <div className="third-feature feature">
            <img
              src={thirdFeature}
              alt="Feature"
              className="feature-image"
            />

            <div className="feature-text">
              <h2>Digitale Identität</h2>
              <p>
                Erstelle ein einzigartiges Profil, das deine wahre Persönlichkeit widerspiegelt, indem du Fragen beantwortest.
              </p>
            </div>
          </div>

          <div className="fourth-feature feature">
            <img
              src={secondFeature}
              alt="Feature"
              className="feature-image fourth-feature-image"
            />

            <div className="feature-text fourth-feature-text">
              <h2>Digitale Identität</h2>
              <p>
                Erstelle ein einzig-artiges Profil, das deine wahre Persönlich-keit wider-spiegelt, indem du Fragen beantwortest.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="homepage-end-info">
        <p>programmed with ❤️ by shahd and chatgpt + copilot</p>
      </div>
    </div>
  )
}

export default Homepage