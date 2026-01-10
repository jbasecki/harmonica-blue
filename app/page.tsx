'use client';
import React, { useState, Suspense } from 'react';

// 1. DATA SOURCES: QUOTES & BUCKET CONFIG
const DEEP_QUOTES = [
  { label: "COSMOLOGY", text: "We are just an advanced breed of monkeys on a minor planet... But we can understand the Universe." },
  { label: "CINEMA", text: "I always tell the truth. Even when I lie. The work is the only thing that matters." },
  { label: "MISSION", text: "Share a thought, a melody, a film or a quote with someone. Sharing makes a day fuller." }
];

function SanctuaryGift() {
  const [text, setText] = useState('');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [bgIndex, setBgIndex] = useState(16); // Default to button 17
  
  // DIRECT BUCKET LINK
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // ALPHABET LOGIC: Personalizes tiles based on Receiver Name
  const getPersonalTiles = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    return [clean[0], clean.length > 1 ? clean[1] : clean[0]];
  };

  const tiles = getPersonalTiles(toName);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', fontFamily: 'serif', overflow: 'hidden', position: 'relative' }}>
      
      {/* 2. DYNAMIC BUCKET BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video 
          key={bgIndex} autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
          src={`${bucketUrl}/bg-video-${bgIndex + 1}.mp4`} 
        />
        {/* SCRIM for visibility */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.75))' }} />
      </div>

      {/* 3. MINIATURIZED UI OVERLAY */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', padding: '4vh 5vw', boxSizing: 'border-box' }}>
        
        {/* LEFT: MINIMAL PLAYER */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '0.3px solid rgba(212,175,55,0.2)', padding: '10px', borderRadius: '8px', width: '150px' }}>
            <p style={{ fontSize: '0.35rem', letterSpacing: '2px', marginBottom: '5px', opacity: 0.5 }}>GIFTED MELODY</p>
            <input placeholder="Paste Link..." style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '0.5px solid #333', color: '#D4AF37', fontSize: '0.6rem' }} />
            <div style={{ marginTop: '10px', height: '22px', border: '0.5px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.45rem', cursor: 'pointer' }}>PLAY GIFT</div>
          </div>
        </div>

        {/* CENTER: ART & REORGANIZED LOWER CONTROLS */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', paddingBottom: '2vh' }}>
          
          <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '32px', border: '0.3px solid #D4AF37', borderRadius: '2px' }} alt="Art" />
             ))}
          </div>

          <textarea 
            placeholder="Write your greeting..." value={text} onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '40px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '0.9rem', fontStyle: 'italic', color: '#D4AF37', outline: 'none', resize: 'none' }}
          />

          <p style={{ fontSize: '0.35rem', opacity: 0.5, letterSpacing: '1px', marginTop: '10px' }}>PICK THE BACKGROUND FROM 1 - 19</p>
          
          {/* MICRO 1-19 PICKER */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px', maxWidth: '180px' }}>
            {[...Array(19)].map((_, i) => (
              <button 
                key={i} onClick={() => setBgIndex(i)}
                style={{ width: '14px', height: '12px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.3px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.3rem', cursor: 'pointer' }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            <button style={{ background: 'none', border: '0.3px solid #D4AF37', color: '#D4AF37', padding: '3px 8px', fontSize: '0.35rem' }}>QUOTE PICKER</button>
            <button onClick={() => setText('')} style={{ background: 'none', border: '0.3px solid #333', color: '#D4AF37', padding: '3px 8px', fontSize: '0.35rem' }}>SKIP</button>
          </div>

          <button style={{ background: '#D4AF37', color: '#000', padding: '6px 20px', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.5rem', letterSpacing: '2px', marginTop: '5px' }}>
            STASH & SEND
          </button>
        </div>

        {/* RIGHT: SUBTLE INLINE NAMES */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.3rem', opacity: 0.4, letterSpacing: '2px' }}>TO:</p>
            <input placeholder="NAME" value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '70px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.55rem', textAlign: 'right', outline: 'none' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.3rem', opacity: 0.4, letterSpacing: '2px' }}>FROM:</p>
            <input placeholder="NAME" value={fromName} onChange={(e) => setFromName(e.target.value)} style={{ width: '70px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.55rem', textAlign: 'right', outline: 'none' }} />
          </div>
        </div>

      </div>
    </main>
  );
}

export default function Home() { return <Suspense><SanctuaryGift /></Suspense>; }
