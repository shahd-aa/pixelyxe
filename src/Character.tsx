import React from 'react';

// assets
import femaleBase from './assets/char_customization/base/female_base.png';
import maleBase from './assets/char_customization/base/male_base.png';

import whiteShirt from './assets/char_customization/tops/white_shirt.png';
import blueShirt from './assets/char_customization/tops/blue_shirt.png';
import yellowShirt from './assets/char_customization/tops/yellow_shirt.png';
import pinkShirt from './assets/char_customization/tops/pink_shirt.png';
import grayShirt from './assets/char_customization/tops/gray_shirt.png';
import purpleShirt from './assets/char_customization/tops/purple_shirt.png';

import bluePants from './assets/char_customization/bottoms/blue_pants.png';
import brownPants from './assets/char_customization/bottoms/brown_pants.png';
import grayPants from './assets/char_customization/bottoms/gray_pants.png';
import turqoisePants from './assets/char_customization/bottoms/turqoise_pants.png';

import blackHairF from './assets/char_customization/hair/black_hair_f.png';
import brownHairF from './assets/char_customization/hair/brown_hair_f.png';
import blondeHairF from './assets/char_customization/hair/blonde_hair_f.png';

import maleBlackHairM from './assets/char_customization/hair/black_hair_m.png';
import maleBrownHairM from './assets/char_customization/hair/brown_hair_m.png';
import maleBlondeHairM from './assets/char_customization/hair/blonde_hair_m.png';

import blackShoes from './assets/char_customization/shoes/black_shoes.png';
import brownShoes from './assets/char_customization/shoes/brown_shoes.png';
import blueShoes from './assets/char_customization/shoes/blue_shoes.png';

// types
type Gender = 'male' | 'female';

interface CharacterProps {
  gender: Gender;
  topIndex: number;
  bottomIndex: number;
  hairIndex: number;
  shoeIndex: number;
}

interface CharacterItem {
  name: string;
  src: string;
  top: string;
  left: string;
}

// shared options
export const CHARACTER_OPTIONS: Record<
  Gender,
  {
    tops: CharacterItem[];
    bottoms: CharacterItem[];
    hair: CharacterItem[];
    shoes: CharacterItem[];
  }
> = {
  female: {
    tops: [
      { name: 'weißes T-Shirt', src: whiteShirt, top: '0px', left: '0px' },
      { name: 'blaues T-Shirt', src: blueShirt, top: '0px', left: '0px' },
      { name: 'gelbes T-Shirt', src: yellowShirt, top: '0px', left: '0px' },
      { name: 'rosa T-Shirt', src: pinkShirt, top: '0px', left: '0px' },
      { name: 'graues T-Shirt', src: grayShirt, top: '0px', left: '0px' },
      { name: 'lila T-Shirt', src: purpleShirt, top: '0px', left: '0px' }
    ],

    bottoms: [
      { name: 'blaue Hose', src: bluePants, top: '0px', left: '0px' },
      { name: 'graue Hose', src: grayPants, top: '0px', left: '0px' },
      { name: 'braune Hose', src: brownPants, top: '0px', left: '0px' },
      { name: 'türkise Hose', src: turqoisePants, top: '0px', left: '0px' }
    ],

    hair: [
      { name: 'braun', src: brownHairF, top: '0px', left: '0px' },
      { name: 'schwarz', src: blackHairF, top: '-76px', left: '1.5px' },
      { name: 'blond', src: blondeHairF, top: '-76px', left: '1.5px' }
    ],

    shoes: [
      { name: 'schwarze Schuhe', src: blackShoes, top: '0px', left: '0px' },
      { name: 'braune Schuhe', src: brownShoes, top: '0px', left: '0px' },
      { name: 'blaue Schuhe', src: blueShoes, top: '0px', left: '0px' }
    ]
  },

  male: {
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
      { name: 'schwarz', src: maleBlackHairM, top: '0px', left: '0px' },
      { name: 'braun', src: maleBrownHairM, top: '0px', left: '0px' },
      { name: 'blond', src: maleBlondeHairM, top: '0px', left: '0px' }
    ],

    shoes: [
      { name: 'schwarze Schuhe', src: blackShoes, top: '0px', left: '0px' },
      { name: 'braune Schuhe', src: brownShoes, top: '0px', left: '0px' },
      { name: 'blaue Schuhe', src: blueShoes, top: '0px', left: '0px' }
    ]
  }
};

const Character: React.FC<CharacterProps> = ({
  gender,
  topIndex,
  bottomIndex,
  hairIndex,
  shoeIndex
}) => {

  const genderOptions = CHARACTER_OPTIONS[gender];

  const currentTop =
    genderOptions.tops[topIndex] || genderOptions.tops[0];

  const currentBottom =
    genderOptions.bottoms[bottomIndex] || genderOptions.bottoms[0];

  const currentHair =
    genderOptions.hair[hairIndex] || genderOptions.hair[0];

  const currentShoes =
    genderOptions.shoes[shoeIndex] || genderOptions.shoes[0];

  console.log('CURRENT CHARACTER', {
    gender,
    topIndex,
    bottomIndex,
    hairIndex,
    shoeIndex,
    top: currentTop?.name,
    bottom: currentBottom?.name,
    hair: currentHair?.name,
    shoe: currentShoes?.name
  });

  return (
    <div
      className="character-preview-window"
      style={{
        width: '300px',
        height: '500px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 0,
        flex: 'none'
      }}
    >
      {/* BASE */}
      <img
        key={`base-${gender}`}
        src={gender === 'male' ? maleBase : femaleBase}
        className="char-layer base"
        alt="base"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          imageRendering: 'pixelated',
          zIndex: 1
        }}
      />

      {/* BOTTOM */}
      {currentBottom && (
        <img
          key={`bottom-${gender}-${bottomIndex}`}
          src={currentBottom.src}
          className="char-layer"
          alt={currentBottom.name}
          style={{
            position: 'absolute',
            top: currentBottom.top,
            left: currentBottom.left,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            imageRendering: 'pixelated',
            zIndex: 2
          }}
        />
      )}

      {/* TOP */}
      {currentTop && (
        <img
          key={`top-${gender}-${topIndex}`}
          src={currentTop.src}
          className="char-layer"
          alt={currentTop.name}
          style={{
            position: 'absolute',
            top: currentTop.top,
            left: currentTop.left,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            imageRendering: 'pixelated',
            zIndex: 3
          }}
        />
      )}

      {/* HAIR */}
      {currentHair && (
        <img
          key={`hair-${gender}-${hairIndex}`}
          src={currentHair.src}
          className="char-layer"
          alt={currentHair.name}
          style={{
            position: 'absolute',
            top: currentHair.top,
            left: currentHair.left,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            imageRendering: 'pixelated',
            zIndex: 5
          }}
        />
      )}

      {/* SHOES */}
      {currentShoes && (
        <img
          key={`shoes-${gender}-${shoeIndex}`}
          src={currentShoes.src}
          className="char-layer"
          alt={currentShoes.name}
          style={{
            position: 'absolute',
            top: currentShoes.top,
            left: currentShoes.left,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            imageRendering: 'pixelated',
            zIndex: 4
          }}
        />
      )}
    </div>
  );
};

export default Character;