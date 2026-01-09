'use client';
import React, { useState, Suspense } from 'react';

const DEEP_QUOTES = [
  { label: "COSMOLOGY", text: "We are just an advanced breed of monkeys on a minor planet... But we can understand the Universe." },
  { label: "CINEMA", text: "I always tell the truth. Even when I lie. The work is the only thing that matters." },
  { label: "MISSION", text: "Share a thought, a melody, a film or a quote with someone. Sharing makes a day fuller." }
];

function SanctuaryGift() {
  const [text, setText] = useState('');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ 
      height: '100vh', width: '100vw', 
      background: '#000', color: '#D4AF37', 
      fontFamily: 'serif', position: 'relative', 
      overflow: 'hidden', display: 'flex', flexDirection: 'column' 
    }}>
      
      {/* 1. FULL-SCREEN BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <iframe 
          width="100%" height="100%" 
          src="https://www.youtube-nocookie.com/embed/ko70cExuzZM?autoplay=1&mute=1&loop=1&playlist=ko70cExuzZM&controls=0&modestbranding=1" 
          frameBorder="0" style={{ objectFit: 'cover', opacity: 0.5 }} 
        />
        {/* SCRIM: Protects text visibility */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6))' }} />
      </div>

      {/* 2. THE RESPONSIVE UI LAYER */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', padding: '2vh 2vw', display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box' }}>
        
        {/* LEFT: SOUNDTRACK PLAYER */}
        <div style={{ alignSelf: 'flex-end', width: '20vw', minWidth: '200px', background: 'rgba(0,0,0,0.6)', border: '1px solid #D4AF37', padding: '15px', borderRadius: '12px' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '2px', opacity: 0.6 }}>GIFTED MELODY</p>
          <input placeholder="Paste Link..." style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: '#D4AF37', fontSize: '0.7rem', marginTop: '10px' }} />
          <div style={{ marginTop: '15px', height: '35px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', cursor: 'pointer' }}>PLAY GIFT</div>
        </div>

        {/* CENTER: COGNITION CONSOLE */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2vh' }}>
          <div style={{ display: 'flex', gap: '1vw' }}>
             <img src={`${bucketUrl}/H5.png`} style={{ width: '4.5vw', minWidth: '45px', border: '1px solid #D4AF37' }} />
             <img src={`${bucketUrl}/B5.png`} style={{ width: '4.5vw', minWidth: '45px', border: '1px solid #D4AF37' }} />
          </div>
          
          <textarea 
            placeholder="Write your greeting..."
            value={text} onChange={(e) => setText(e.target.value)}
            style={{ width: '90%', height: '20vh', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.4rem', fontStyle: 'italic', color: '#D4AF37', outline: 'none', resize: 'none' }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '8px 15px', background: 'none', border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '0.6rem' }}>QUOTE PICKER</button>
            <button onClick={() => setText('')} style={{ padding: '8px 15px', background: 'none', border: '1px solid #333', color: '#D4AF37', fontSize: '0.6rem' }}>SKIP</button>
          </div>

          <button style={{ background: '#D4AF37', color: '#000', padding: '12px 40px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>STASH & SEND</button>
        </div>

        {/* RIGHT: PERSONALIZATION */}
        <div style={{ width: '25vw', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4vh', justifyContent: 'center' }}>
          <div>
            <p style={{ fontSize: '0.6rem', opacity: 0.5, letterSpacing: '2px' }}>TO:</p>
            <input placeholder="NAME" onChange={(e) => setToName(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2vw', textAlign: 'right', outline: 'none' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.6rem', opacity: 0.5, letterSpacing: '2px' }}>FROM:</p>
            <input placeholder="NAME" onChange={(e) => setFromName(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2vw', textAlign: 'right', outline: 'none' }} />
          </div>
        </div>

      </div>
    </main>
  );
}

export default function Home() { return <Suspense><SanctuaryGift /></Suspense>; }
