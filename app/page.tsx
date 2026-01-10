'use client';
import React, { useState, Suspense } from 'react';

// Two distinct cursive possibilities
const CURSIVE_OPTIONS = [
  "'Dancing Script', cursive", 
  "'Great Vibes', cursive"
];

const BG_CREDITS = [
  "BBC: African Savannah", "National Geographic: Deep Ocean", "Discovery: Arctic Tundra",
  "BBC: Amazon Rainforest", "Author: Alpine Peaks", "Discovery: Desert Dunes",
  "National Geographic: Coral Reefs", "BBC: Redwoods", "Author: Storm Clouds",
  "Discovery: Serengeti", "National Geographic: Galaxy", "Author: Misty Forest",
  "BBC: Great Barrier Reef", "Discovery: Volcanic Flow", "Author: Night Sky",
  "National Geographic: Tundra", "BBC: Waterfall", "Discovery: Coastal Cliffs",
  "Author: Wild Grasslands"
];

function DiscoverySanctuary() {
  const [toName, setToName] = useState('');
  const [bgIndex, setBgIndex] = useState(13); // Button 14
  const [fontChoice, setFontChoice] = useState(0); 
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // REFINED ALPHABET LOGIC: First and Penultimate
  const getReceiverArt = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    if (clean.length === 1) return [clean[0], clean[0]];
    const penultimate = clean.length > 2 ? clean[clean.length - 2] : clean[1];
    return [clean[0], penultimate];
  };

  const tiles = getReceiverArt(toName);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* 1. BACKGROUND: Matches actual bucket filenames like '14.mp4' */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video 
          key={bgIndex} autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
          src={`${bucketUrl}/${bgIndex + 1}.mp4`} 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85))' }} />
      </div>

      {/* 2. GALLERY FRAME */}
      <div style={{ position: 'absolute', top: '3vh', left: '4vw', zIndex: 3 }}>
        <p style={{ fontSize: '0.35rem', fontStyle: 'italic', opacity: 0.4 }}>Visual by {BG_CREDITS[bgIndex]}</p>
      </div>

      {/* 3. CENTERED ART & MINIATURIZED DUAL-FONT SIGNATURE */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: '5vh 6vw', boxSizing: 'border-box' }}>
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          
          <div style={{ display: 'flex', gap: '8px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '32px', border: '0.3px solid #D4AF37', borderRadius: '2px' }} alt="Art" />
             ))}
          </div>

          {/* CLICK TO TOGGLE FONT */}
          <div 
            onClick={() => setFontChoice(fontChoice === 0 ? 1 : 0)} 
            style={{ 
              fontFamily: CURSIVE_OPTIONS[fontChoice], 
              fontSize: '1.4rem', 
              color: '#D4AF37', 
              textShadow: '0 0 10px rgba(212,175,55,0.5)', 
              cursor: 'pointer', 
              marginTop: '-5px',
              userSelect: 'none'
            }}
          >
            {toName}
          </div>
        </div>

        {/* 4. DASHBOARD HORIZON */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '0.3px solid rgba(212,175,55,0.2)', padding: '10px', borderRadius: '6px', width: '160px' }}>
            <p style={{ fontSize: '0.3rem', opacity: 0.5 }}>GIFTED MELODY</p>
            <input placeholder="Paste Link..." style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '0.3px solid #333', color: '#D4AF37', fontSize: '0.6rem' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px' }}>
              {[...Array(19)].map((_, i) => (
                <button key={i} onClick={() => setBgIndex(i)} style={{ width: '14px', height: '12px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.3px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.28rem', cursor: 'pointer' }}>{i + 1}</button>
              ))}
            </div>
            <button style={{ background: '#D4AF37', color: '#000', padding: '6px 22px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.5rem', letterSpacing: '2px' }}>STASH & SEND</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <p style={{ fontSize: '0.3rem', opacity: 0.4 }}>TO:</p>
            <input placeholder="NAME" value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '80px', background: 'transparent', border: 'none', borderBottom: '0.3px solid #333', color: '#D4AF37', fontSize: '0.65rem', textAlign: 'right', outline: 'none' }} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense><DiscoverySanctuary /></Suspense>; }
