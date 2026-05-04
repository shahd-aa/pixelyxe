import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';
import Character from './Character';

interface CharakterProps {
  user: any;
}

type Gender = 'male' | 'female';
type Category = 'hair' | 'tops' | 'bottoms';

const CharakterGestaltung: React.FC<CharakterProps> = ({ user }) => {
  const [gender, setGender] = useState<Gender>('female');
  const [hairIndex, setHairIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>('hair');

  // Load saved character state from Supabase on mount
  useEffect(() => {
    const loadSavedCharacter = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('gender, hair_index, top_index, bottom_index')
        .eq('id', user.id)
        .maybeSingle();

      if (data && !error) {
        if (data.gender) setGender(data.gender as Gender);
        setHairIndex(data.hair_index ?? 0);
        setTopIndex(data.top_index ?? 0);
        setBottomIndex(data.bottom_index ?? 0);
      }
    };

    loadSavedCharacter();
  }, [user]);

  const maxOptions = {
    hair: 2,      // must match your Character.tsx options length
    tops: 5,      // must match your Character.tsx options length
    bottoms: 3
  };

  const handleCycle = (direction: number) => {
    if (activeCategory === 'hair') {
      setHairIndex((prev) => (prev + direction + maxOptions.hair) % maxOptions.hair);
    } else if (activeCategory === 'tops') {
      setTopIndex((prev) => (prev + direction + maxOptions.tops) % maxOptions.tops);
    } else {
      setBottomIndex((prev) => (prev + direction + maxOptions.bottoms) % maxOptions.bottoms);
    }
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        gender,
        hair_index: hairIndex,
        top_index: topIndex,
        bottom_index: bottomIndex
      });

    if (error) {
      console.error('Error saving character:', error.message);
      alert('Fehler beim Speichern des Charakters.');
    } else {
      console.log('Save successful', { gender, topIndex, bottomIndex });
      alert('Charakter-Einstellungen wurden erfolgreich gespeichert!');
    }
  };

  return (
    <div className="charakter-gestaltung">
      {/* Left Panel */}
      <div className="character-display-panel">
        <h3>Character Preview</h3>

        {/* Shared component */}
        <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <div style={{ transform: 'scale(1.2)', transformOrigin: 'center center', flex: 'none' }}>
            <Character 
              gender={gender}
              topIndex={topIndex}
              bottomIndex={bottomIndex}
              hairIndex={hairIndex}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="cycle-controls">
          <button className="arrow-btn" onClick={() => handleCycle(-1)}>&lt;</button>
          
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5 }}>
              Editing {activeCategory}
            </span>
            <div style={{ fontWeight: 600 }}>
              {activeCategory === 'hair'
                ? `Hair #${hairIndex + 1}`
                : activeCategory === 'tops'
                ? `Top #${topIndex + 1}`
                : `Bottom #${bottomIndex + 1}`}
            </div>
          </div>

          <button className="arrow-btn" onClick={() => handleCycle(1)}>&gt;</button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="customization-settings">
        <h2>Einstellungen</h2>

        {/* Gender */}
        <div className="selection-group">
          <label>Geschlecht</label>
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

        {/* Category */}
        <div className="selection-group">
          <label>Kategorie</label>
          <div className="toggle-row">
            <button
              className={`toggle-btn ${activeCategory === 'hair' ? 'active' : ''}`}
              onClick={() => setActiveCategory('hair')}
            >
              Haare
            </button>
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
              Hosen
            </button>
          </div>
        </div>

        {/* Save */}
        <button
          className="character-confirm"
          style={{ marginTop: 'auto', padding: '12px', fontSize: '16px' }}
          onClick={handleSave}
        >
          Aussehen speichern
        </button>
      </div>
    </div>
  );
};

export default CharakterGestaltung;