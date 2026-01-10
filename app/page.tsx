'use client';
import React, { useState, Suspense } from 'react';

function SanctuaryComposer() {
  const [text, setText] = useState('');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [bgIndex, setBgIndex] = useState(16); // Button 17
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // ALPHABET LOGIC: Receiver name drives the center art
  const getReceiverArt = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    return [clean[0], clean.length > 1 ? clean[1] : clean[0]];
  };

  const tiles = getReceiverArt(toName);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', fontFamily: 'serif', overflow: 'hidden', position: 'relative' }}>
      
      {/* 1. DYNAMIC BUCKET BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video 
          key={bgIndex} autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
          src={`${bucketUrl}/bg-video-${bgIndex + 1}.mp4`} 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.8))' }} />
      </div>

      {/* 2. THE MINIATURIZED UI */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', padding: '3vh 5vw', boxSizing: 'border-box' }}>
        
        {/* LEFT: MINIMAL PLAYER */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '0.3px solid rgba(212,175,55,0.2)', padding: '8px', borderRadius: '6px', width: '140px' }}>
            <p style={{ fontSize: '0.3rem', letterSpacing: '2px', marginBottom: '4px', opacity: 0.5 }}>GIFTED MELODY</p>
            <input placeholder="Paste Link..." style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '0.5px solid #333', color: '#D4AF37', fontSize: '0.55rem' }} />
            <div style={{ marginTop: '8px', height: '20px', border: '0.5px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.4rem', cursor: 'pointer' }}>PLAY GIFT</div>
          </div>
        </div>

        {/* CENTER: ART & REORGANIZED LOWER CONTROLS */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '5px', paddingBottom: '2vh' }}>
          
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '28px', border: '0.3px solid #D4AF37', borderRadius: '1.5px' }} alt="Art" />
             ))}
          </div>

          <textarea 
            placeholder="Write your greeting..." value={text} onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '35px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '0.8rem', fontStyle: 'italic', color: '#D4AF37', outline: 'none', resize: 'none' }}
          />

          <p style={{ fontSize: '0.3rem', opacity: 0.4, letterSpacing: '1px', marginTop: '15px' }}>PICK THE BACKGROUND FROM 1 - 19</p>
          
          {/* MICRO 1-19 PICKER */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px', maxWidth: '160px' }}>
            {[...Array(19)].map((_, i) => (
              <button 
                key={i} onClick={() => setBgIndex(i)}
                style={{ width: '12px', height: '10px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.3px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.25rem', cursor: 'pointer' }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
            <button style={{ background: 'none', border: '0.3px solid #D4AF37', color: '#D4AF37', padding: '2px 8px', fontSize: '0.3rem' }}>QUOTE PICKER</button>
            <button onClick={() => setText('')} style={{ background: 'none', border: '0.3px solid #333', color: '#D4AF37', padding: '2px 8px', fontSize: '0.3rem' }}>SKIP</button>
          </div>

          <button style={{ background: '#D4AF37', color: '#000', padding: '5px 18px', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.45rem', letterSpacing: '2px', marginTop: '10px' }}>
            STASH & SEND
          </button>
        </div>

        {/* RIGHT: SUBTLE INLINE NAMES */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.25rem', opacity: 0.4, letterSpacing: '2px' }}>TO:</p>
            <input placeholder="NAME" value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '60px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.5rem', textAlign: 'right', outline: 'none' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.25rem', opacity: 0.4, letterSpacing: '2px' }}>FROM:</p>
            <input placeholder="NAME" value={fromName} onChange={(e) => setFromName(e.target.value)} style={{ width: '60px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.5rem', textAlign: 'right', outline: 'none' }} />
          </div>
        </div>

      </div>
    </main>
  );
}

export default function Home() { return <Suspense><SanctuaryComposer /></Suspense>; }
