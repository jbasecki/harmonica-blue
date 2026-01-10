'use client';
import React, { useState, Suspense } from 'react';

function SanctuaryComposer() {
  const [text, setText] = useState('');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [bgIndex, setBgIndex] = useState(16); 
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // ALPHABET LOGIC: Links Receiver Name to Center Tiles
  const getReceiverArt = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    return [clean[0], clean.length > 1 ? clean[1] : clean[0]];
  };

  const tiles = getReceiverArt(toName);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', fontFamily: 'serif', overflow: 'hidden', position: 'relative' }}>
      
      {/* 1. DYNAMIC CINEMATIC BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video 
          key={bgIndex} autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
          src={`${bucketUrl}/bg-video-${bgIndex + 1}.mp4`} 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85))' }} />
      </div>

      {/* 2. THE REFINED UI OVERLAY */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: '5vh 6vw', boxSizing: 'border-box' }}>
        
        {/* TOP: ADJUSTED ART TILES */}
        <div style={{ flex: 1.2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '38px', border: '0.3px solid #D4AF37', borderRadius: '2.5px' }} alt="Art" />
             ))}
          </div>
        </div>

        {/* BOTTOM DASHBOARD: THE PERFECT HORIZON */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          
          {/* LEFT: GIFTED MELODY */}
          <div style={{ background: 'rgba(0,0,0,0.35)', border: '0.3px solid rgba(212,175,55,0.2)', padding: '10px', borderRadius: '8px', width: '190px' }}>
            <p style={{ fontSize: '0.35rem', letterSpacing: '2px', marginBottom: '6px', opacity: 0.5 }}>GIFTED MELODY</p>
            <input placeholder="Paste Link..." style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '0.3px solid #333', color: '#D4AF37', fontSize: '0.65rem' }} />
            <div style={{ marginTop: '10px', height: '24px', border: '0.5px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', cursor: 'pointer', letterSpacing: '1px' }}>PLAY GIFT</div>
          </div>

          {/* CENTER: GREETING & PICKER (PUSHED DOWN) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', maxWidth: '350px', marginBottom: '5px' }}>
            <textarea 
              placeholder="Write your greeting..." value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', height: '40px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '0.9rem', fontStyle: 'italic', color: '#D4AF37', outline: 'none', resize: 'none' }}
            />
            <p style={{ fontSize: '0.35rem', opacity: 0.5, letterSpacing: '1px' }}>PICK THE BACKGROUND FROM 1 - 19</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '3px' }}>
              {[...Array(19)].map((_, i) => (
                <button 
                  key={i} onClick={() => setBgIndex(i)}
                  style={{ width: '16px', height: '14px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.3px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.35rem', cursor: 'pointer' }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px', marginTop: '5px' }}>
              <button style={{ background: 'none', border: '0.3px solid #D4AF37', color: '#D4AF37', padding: '4px 10px', fontSize: '0.4rem' }}>QUOTE PICKER</button>
              <button onClick={() => setText('')} style={{ background: 'none', border: '0.3px solid #333', color: '#D4AF37', padding: '4px 10px', fontSize: '0.4rem' }}>SKIP</button>
            </div>
            <button style={{ background: '#D4AF37', color: '#000', padding: '8px 25px', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.6rem', letterSpacing: '2px', marginTop: '5px' }}>
              STASH & SEND
            </button>
          </div>

          {/* RIGHT: PERSONALIZED NAMES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <p style={{ fontSize: '0.35rem', opacity: 0.4, letterSpacing: '2px', margin: 0 }}>TO:</p>
              <input placeholder="NAME" value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '90px', background: 'transparent', border: 'none', borderBottom: '0.3px solid #333', color: '#D4AF37', fontSize: '0.7rem', textAlign: 'right', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <p style={{ fontSize: '0.35rem', opacity: 0.4, letterSpacing: '2px', margin: 0 }}>FROM:</p>
              <input placeholder="NAME" value={fromName} onChange={(e) => setFromName(e.target.value)} style={{ width: '90px', background: 'transparent', border: 'none', borderBottom: '0.3px solid #333', color: '#D4AF37', fontSize: '0.7rem', textAlign: 'right', outline: 'none' }} />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense><SanctuaryComposer /></Suspense>; }
