'use client';
import React, { useState, Suspense, useEffect } from 'react';

const SUBJECTS = [
  { title: "The Fate of Ophelia", id: "ko70cExuzZM", artist: "Taylor Swift" },
  { title: "Sonny Boy Blues", id: "pA_v070D1iE", artist: "Sonny Boy Williamson" },
  { title: "Clair de Lune", id: "W0LHTWG-UmQ", artist: "Claude Debussy" },
  { title: "Abstract Gold", id: "E6M8qYn7KzQ", artist: "Unknown Visual Artist" }
];

function SanctuaryStudio() {
  const [showIntro, setShowIntro] = useState(true);
  const [ytId, setYtId] = useState('ko70cExuzZM'); 
  const [artist, setArtist] = useState('Taylor Swift');
  const [text, setText] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  useEffect(() => {
    if (localStorage.getItem('hideHBIntro')) setShowIntro(false);
  }, []);

  const getAbstracts = (input: string) => {
    const clean = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B'];
    const first = clean[0];
    const penult = clean.length > 1 ? clean[clean.length - 2] : first;
    return [first, penult];
  };

  return (
    <main style={{ display: 'flex', height: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif', position: 'relative' }}>
      
      {/* 1. THE STUDIO BASE (RESTORED PREVIOUS DESIGN) */}
      <div style={{ flex: 1.5, position: 'relative', borderRight: '1px solid #333' }}>
        <iframe 
          width="100%" height="100%" 
          src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&rel=0`} 
          frameBorder="0" allow="autoplay" 
        />
        <div style={{ position: 'absolute', top: 20, right: 20, textAlign: 'right', textShadow: '2px 2px 4px #000' }}>
          <p style={{ fontSize: '0.6rem', margin: 0, opacity: 0.7 }}>SELECTED MELODY</p>
          <p style={{ fontWeight: 'bold' }}>{artist.toUpperCase()}</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '3px' }}>WORDS AS ABSTRACTS</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '15px 0' }}>
            {getAbstracts(text).map((ltr, i) => (
              <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '70px', height: '105px', border: '1px solid #D4AF37' }} />
            ))}
          </div>
        </div>
        <textarea 
          placeholder="Stash your cognition..." 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', height: '180px', background: '#111', border: '1px solid #333', color: '#D4AF37', padding: '20px', fontSize: '1.2rem' }}
        />
        <div style={{ overflowX: 'auto', display: 'flex', gap: '10px' }}>
          {SUBJECTS.map(s => (
            <button key={s.id} onClick={() => { setYtId(s.id); setArtist(s.artist); }} style={{ minWidth: '130px', padding: '10px', background: '#111', border: '1px solid #D4AF37', color: '#D4AF37', cursor: 'pointer', fontSize: '0.65rem' }}>
              {s.title.toUpperCase()}
            </button>
          ))}
        </div>
        <button style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
          STASH & SEND ($0.99)
        </button>
      </div>

      {/* 2. THE SIMPLE TEXT OVERLAY (NO BOX) */}
      {showIntro && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <p style={{ fontSize: '1.4rem', fontStyle: 'italic', textAlign: 'center', maxWidth: '800px', lineHeight: '1.6' }}>
            “Share a thought, a melody, a film or a quote with someone. Sharing makes a day fuller. A thought shared is a thought that will live on.”
          </p>
          <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
            <button onClick={() => setShowIntro(false)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '10px 30px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>OK</button>
            <button onClick={() => { localStorage.setItem('hideHBIntro', 'true'); setShowIntro(false); }} style={{ background: 'none', border: '1px solid #D4AF37', color: '#D4AF37', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.7rem' }}>DON'T SHOW THIS ANYMORE</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function Home() { return <Suspense><SanctuaryStudio /></Suspense>; }
