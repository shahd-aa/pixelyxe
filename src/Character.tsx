import React from 'react';

// assets
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
import blackHair from './assets/char_customization/hair/black_hair_f.png';
import blondeHair from './assets/char_customization/hair/blonde_hair_f.png';

// types
type Gender = 'male' | 'female';

interface CharacterProps {
  gender: Gender;
  topIndex: number;
  bottomIndex: number;
  hairIndex: number;
}

// shared options (single source of truth)
const options = {
  tops: [
    { name: 'blaues T-Shirt', src: blueShirt, top: '0px', left: '0px' },
    { name: 'gelbes T-Shirt', src: yellowShirt, top: '0px', left: '0px' },
    { name: 'rosa T-Shirt', src: pinkShirt, top: '0px', left: '0px' },
    { name: 'graues T-Shirt', src: grayShirt, top: '0px', left: '0px' },
    { name: 'lila T-Shirt', src: purpleShirt, top: '0px', left: '0px' }
  ],
  bottoms: [
    { name: 'graue Hose', src: grayPants, top: '0px', left: '0px' },
    { name: 'braune Hose', src: brownPants, top: '0px', left: '0px' },
    { name: 'türkise Hose', src: turqoisePants, top: '0px', left: '0px' }
  ],
  hair: [
    { name: 'schwarz', src: blackHair, top: '-74px', left: '1.5px' },
    { name: 'blond', src: blondeHair, top: '-74px', left: '1.5px' }
  ]
};

const Character: React.FC<CharacterProps> = ({ gender, topIndex, bottomIndex, hairIndex }) => {
  const currentTop = options.tops[topIndex] || options.tops[0];
  const currentBottom = options.bottoms[bottomIndex] || options.bottoms[0];
  const currentHair = options.hair[hairIndex] || options.hair[0];

  // We fix the size here so offsets like "-93px" always mean the same thing
  const baseWidth = 300;
  const baseHeight = 500;

  return (
    <div className="character-preview-window" style={{ width: `${baseWidth}px`, height: `${baseHeight}px`, marginBottom: 0, flex: 'none' }}>
      <img
        src={gender === 'male' ? maleBase : femaleBase}
        className="char-layer base"
        alt="base"
      />
      <img 
        src={currentBottom.src} 
        className="char-layer" 
        alt="" 
        style={{ top: (currentBottom as any).top, left: (currentBottom as any).left }} 
      />
      <img 
        src={currentTop.src} 
        className="char-layer" 
        alt="" 
        style={{ top: (currentTop as any).top, left: (currentTop as any).left }} 
      />
      <img 
        src={currentHair.src} 
        className="char-layer" 
        alt="" 
        style={{ zIndex: 5, top: (currentHair as any).top, left: (currentHair as any).left }} 
      />
    </div>
  );
};

export default Character;