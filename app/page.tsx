'use client';
import React, { useState, Suspense } from 'react';

function SanctuaryGift() {
  const [text, setText] = useState('');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // ALPHABET LOGIC: Links Receiver Name to Center Tiles
  const getPersonalTiles = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    const first = clean[0];
    const second = clean.length > 1 ? clean[1] : clean[0];
    return [first, second];
  };

  const tiles = getPersonalTiles(toName);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', fontFamily: 'serif', overflow: 'hidden', position: 'relative' }}>
      
      {/* 1. FULL-SCREEN BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <iframe 
          width="100%" height="100%" 
          src="https://www.youtube-nocookie.com/embed/ko70cExuzZM?autoplay=1&mute=1&loop=1&playlist=ko70cExuzZM&controls=0" 
          frameBorder="0" style={{ objectFit: 'cover', opacity: 0.35 }} 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }} />
      </div>

      {/* 2. THE REFINED, SCALED-DOWN UI */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', padding: '6vh 6vw', boxSizing: 'border-box' }}>
        
        {/* LEFT: COMPACT GIFTED MELODY */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: 'rgba(0,0,0,0.6)', border: '0.5px solid rgba(212,175,55,0.4)', padding: '15px', borderRadius: '10px', width: '200px' }}>
            <p style={{ fontSize: '0.5rem', letterSpacing: '2px', marginBottom: '8px', opacity: 0.7 }}>GIFTED MELODY</p>
            <input placeholder="Paste Link..." style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: '#D4AF37', fontSize: '0.7rem', marginBottom: '15px' }} />
            <div style={{ height: '32px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', cursor: 'pointer', letterSpacing: '1px' }}>PLAY GIFT</div>
          </div>
        </div>

        {/* CENTER: ACCENT TILES & COGNITION */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '45px', border: '0.5px solid #D4AF37', borderRadius: '3px', opacity: 0.9 }} alt="Art" />
             ))}
          </div>
          <textarea 
            placeholder="Write your greeting..."
            value={text} onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '80px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.2rem', fontStyle: 'italic', color: '#D4AF37', outline: 'none', resize: 'none' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', padding: '6px 15px', fontSize: '0.55rem', letterSpacing: '1px' }}>QUOTE PICKER</button>
            <button style={{ background: 'none', border: '0.5px solid #333', color: '#D4AF37', padding: '6px 15px', fontSize: '0.55rem', letterSpacing: '1px' }}>SKIP</button>
          </div>
          <button style={{ background: '#D4AF37', color: '#000', padding: '12px 45px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '2px', marginTop: '10px' }}>STASH & SEND</button>
        </div>

        {/* RIGHT: SUBTLE NAMES */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: '30px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.5rem', opacity: 0.5, letterSpacing: '2px', marginBottom: '5px' }}>TO:</p>
            <input 
              placeholder="NAME" value={toName} onChange={(e) => setToName(e.target.value)} 
              style={{ width: '150px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.9rem', textAlign: 'right', outline: 'none', borderBottom: '1px solid transparent' }} 
            />
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.5rem', opacity: 0.5, letterSpacing: '2px', marginBottom: '5px' }}>FROM:</p>
            <input 
              placeholder="NAME" value={fromName} onChange={(e) => setFromName(e.target.value)} 
              style={{ width: '150px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.9rem', textAlign: 'right', outline: 'none' }} 
            />
          </div>
        </div>

      </div>
    </main>
  );
}

export default function Home() { return <Suspense><SanctuaryGift /></Suspense>; }
