import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';
import Character from './Character';
import { CHARACTER_OPTIONS } from './Character';

interface CharakterProps {
  user: any;
}

type Gender = 'male' | 'female';
type Category = 'hair' | 'tops' | 'bottoms' | 'shoes';

const CharakterGestaltung: React.FC<CharakterProps> = ({ user }) => {
  const [gender, setGender] = useState<Gender>('female');
  const [hairIndex, setHairIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [shoeIndex, setShoeIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>('hair');

  console.log('CharakterGestaltung rendered. Current user:', user);

  useEffect(() => {
    const loadSavedCharacter = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('gender, hair_index, top_index, bottom_index, shoe_index')
        .eq('id', user.id)
        .maybeSingle();

      if (data && !error) {
        console.log('Loaded character data from Supabase:', data);
        if (data.gender) setGender(data.gender as Gender);
        setHairIndex(data.hair_index ?? 0);
        setTopIndex(data.top_index ?? 0);
        setBottomIndex(data.bottom_index ?? 0);
        setShoeIndex(data.shoe_index ?? 0);
        console.log('Character state updated to:', {
          gender: data.gender, hairIndex: data.hair_index, topIndex: data.top_index,
          bottomIndex: data.bottom_index, shoeIndex: data.shoe_index
        });
      }
      if (error) console.error('Error loading saved character:', error);
    };

    loadSavedCharacter();
  }, [user]);

  const currentMax = {
    hair: CHARACTER_OPTIONS[gender].hair.length,
    tops: CHARACTER_OPTIONS[gender].tops.length,
    bottoms: CHARACTER_OPTIONS[gender].bottoms.length,
    shoes: CHARACTER_OPTIONS[gender].shoes.length,
  };

  const handleCycle = (direction: number) => {
    const max = currentMax[activeCategory];

    if (activeCategory === 'hair') setHairIndex(p => (p + direction + max) % max);
    else if (activeCategory === 'tops') setTopIndex(p => (p + direction + max) % max);
    else if (activeCategory === 'bottoms') setBottomIndex(p => (p + direction + max) % max);
    else setShoeIndex(p => (p + direction + max) % max);
  };

  const handleSave = async () => {
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      gender,
      hair_index: hairIndex,
      top_index: topIndex,
      bottom_index: bottomIndex,
      shoe_index: shoeIndex,
    });

    if (error) {
      console.error('Error saving character:', error);
      alert('Fehler beim Speichern.');
    } else {
      alert('Gespeichert!');
      console.log('Character saved successfully.');
    }
  };

  const handleGenderChange = (newGender: Gender) => {
    setGender(newGender);

    setHairIndex(0);
    setTopIndex(0);
    setBottomIndex(0);
    setShoeIndex(0);
  };

  return (
    <div className="charakter-gestaltung">

      {/* LEFT PANEL */}
      <div className="character-display-panel">
        <h3>Charakter-Vorschau</h3>

        {/* FLEXIBLE PREVIEW AREA */}
        <div className="character-preview-area">
          <div className="character-inner">
            <Character
              gender={gender}
              hairIndex={hairIndex}
              topIndex={topIndex}
              bottomIndex={bottomIndex}
              shoeIndex={shoeIndex}
            />
          </div>
        </div>

        {/* CONTROLS */}
        <div className="cycle-controls">
          <button className="arrow-btn" onClick={() => handleCycle(-1)}>&lt;</button>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '11px', opacity: 0.5, textTransform: 'capitalize' }}>
              Bearbeite: {activeCategory === 'hair' ? 'Haare' : 
                          activeCategory === 'tops' ? 'Oberteil' : 
                          activeCategory === 'bottoms' ? 'Hose' : 'Schuhe'}
            </span>

            <div style={{ fontWeight: 600 }}>
              {activeCategory === 'hair'
                ? `Frisur #${hairIndex + 1}`
                : activeCategory === 'tops'
                ? `Oberteil #${topIndex + 1}`
                : activeCategory === 'bottoms'
                ? `Hose #${bottomIndex + 1}`
                : `Schuhe #${shoeIndex + 1}`}
            </div>
          </div>

          <button className="arrow-btn" onClick={() => handleCycle(1)}>&gt;</button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="customization-settings">
        <h2>Einstellungen</h2>

        <div className="selection-group">
          <label>Geschlecht</label>
          <div className="toggle-row">
            <button className={`toggle-btn ${gender === 'male' ? 'active' : ''}`} onClick={() => handleGenderChange('male')}>Männlich</button>
            <button className={`toggle-btn ${gender === 'female' ? 'active' : ''}`} onClick={() => handleGenderChange('female')}>Weiblich</button>
          </div>
        </div>

        <div className="selection-group">
          <label>Kategorie</label>
          <div className="toggle-row">
            <button className={`toggle-btn ${activeCategory === 'hair' ? 'active' : ''}`} onClick={() => setActiveCategory('hair')}>Haare</button>
            <button className={`toggle-btn ${activeCategory === 'tops' ? 'active' : ''}`} onClick={() => setActiveCategory('tops')}>Tops</button>
            <button className={`toggle-btn ${activeCategory === 'bottoms' ? 'active' : ''}`} onClick={() => setActiveCategory('bottoms')}>Hosen</button>
            <button className={`toggle-btn ${activeCategory === 'shoes' ? 'active' : ''}`} onClick={() => setActiveCategory('shoes')}>Schuhe</button>
          </div>
        </div>

        <button className="character-confirm" onClick={handleSave}>
          Aussehen speichern
        </button>
      </div>

    </div>
  );
};

export default CharakterGestaltung;