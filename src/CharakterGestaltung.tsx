import React, { useState } from 'react';
import './App.css';

// Import examples (if your images are in src/assets/clothes)
import femaleBase from './assets/char_customization/base/female_base.png';
import maleBase from './assets/char_customization/base/male_base.png';


import blueShirt from './assets/char_customization/tops/blue_shirt.png';
import yellowShirt from './assets/char_customization/tops/yellow_shirt.png';
import pinkShirt from './assets/char_customization/tops/pink_shirt.png';
import grayShirt from './assets/char_customization/tops/gray_shirt.png';
import purpleShirt from './assets/char_customization/tops/purple_shirt.png';

import brownPants from './assets/char_customization/bottoms/brown_pants.png';
import grayPants from './assets/char_customization/bottoms/gray_pants.png';
import turqoisePants from './assets/char_customization/bottoms/turqoise_pants.png';

interface CharakterProps {
  user: any;
}

type Gender = 'male' | 'female';
type Category = 'tops' | 'bottoms';

interface ClothingOption {
  name: string;
  src: string; // The path to your PNG
  color?: string; // Optional: keep for UI accents
  cssClass?: string;
}

interface Options {
  tops: ClothingOption[];
  bottoms: ClothingOption[];
}

const CharakterGestaltung: React.FC<CharakterProps> = ({ user }) => {
  const [gender, setGender] = useState<Gender>('female');
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>('tops');

  // Replace these paths with your actual organized file paths
  const options: Options = {
    tops: [
      { name: 'blaues T-Shirt', src: blueShirt, color: '#ff4757' },
      { name: 'gelbes T-Shirt', src: yellowShirt, color: '#ffa502' },
      { name: 'rosa T-Shirt', src: pinkShirt, color: '#ff6b6b' },
      { name: 'graues T-Shirt', src: grayShirt, color: '#2f3542' },
      { name: 'lila T-Shirt', src: purpleShirt, color: '#5352ed' }
    ],
    bottoms: [
      { name: 'graue Hose', src: grayPants, color: '#2f3542' },
      { name: 'braune Hose', src: brownPants, color: '#8b4513' },
      { name: 'türkise Hose', src: turqoisePants, color: '#1e90ff' }
    ]
  };

  const handleCycle = (direction: number) => {
    const list = options[activeCategory];
    if (activeCategory === 'tops') {
      setTopIndex((prev) => (prev + direction + list.length) % list.length);
    } else {
      setBottomIndex((prev) => (prev + direction + list.length) % list.length);
    }
  };


  const currentTop = options.tops[topIndex];
  const currentBottom = options.bottoms[bottomIndex];

  return (
    <div className="charakter-gestaltung">
      {/* Left Panel: Character Preview */}
      <div className="character-display-panel">
        <h3>Character Preview</h3>
        <div className="character-preview-window">
          {/* Layer 1: Body Base - Swaps based on gender selection */}
          <img 
            src={gender === 'male' ? maleBase : femaleBase } 
            className="char-layer base" 
            alt="Character Base" 
          />
          
          {/* Layer 2: Bottoms */}
          <img 
            src={currentBottom.src} 
            className="char-layer" 
            alt={currentBottom.name} 
          />

          {/* Layer 3: Tops */}
          <img 
            src={currentTop.src} 
            className="char-layer" 
            alt={currentTop.name} 
          />
        </div>

        {/* Small Arrows Navigation at the bottom */}
        <div className="cycle-controls">
          <button className="arrow-btn" onClick={() => handleCycle(-1)}>&lt;</button>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5 }}>Editing {activeCategory}</span>
            <div style={{ fontWeight: 600 }}>{activeCategory === 'tops' ? currentTop.name : currentBottom.name}</div>
          </div>
          <button className="arrow-btn" onClick={() => handleCycle(1)}>&gt;</button>
        </div>
      </div>

      {/* Right Panel: Settings */}
      <div className="customization-settings">
        <h2>Settings</h2>

        <div className="selection-group">
          <label>Choose Gender</label>
          <div className="toggle-row">
            <button 
              className={`toggle-btn ${gender === 'male' ? 'active' : ''}`}
              onClick={() => setGender('male')}
            >
              Male
            </button>
            <button 
              className={`toggle-btn ${gender === 'female' ? 'active' : ''}`}
              onClick={() => setGender('female')}
            >
              Female
            </button>
          </div>
        </div>

        <div className="selection-group">
          <label>Cycle Category</label>
          <div className="toggle-row">
            <button 
              className={`toggle-btn ${activeCategory === 'tops' ? 'active' : ''}`}
              onClick={() => setActiveCategory('tops')}
            >
              Tops
            </button>
            <button 
              className={`toggle-btn ${activeCategory === 'bottoms' ? 'active' : ''}`}
              onClick={() => setActiveCategory('bottoms')}
            >
              Bottoms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharakterGestaltung;