'use client';
import React, { useState, Suspense } from 'react';

// 1. DEFINE ALL CONSTANTS OUTSIDE THE COMPONENT TO PREVENT ERRORS
const DEEP_QUOTES = [
  { label: "COSMOLOGY", text: "We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special. Quiet people have the loudest minds." },
  { label: "CINEMA", text: "I always tell the truth. Even when I lie. The work is the only thing that matters, the only thing that lives on after the career is long gone. Forget the career, do the work." },
  { label: "THE MISSION", text: "Share a thought, a melody, a film or a quote with someone. Sharing makes a day fuller. A thought shared is a thought that will live on. This is your sanctuary." }
];

const SUBJECTS = [
  { title: "OPHELIA", id: "ko70cExuzZM", artist: "Taylor Swift" },
  { title: "SONNY BOY", id: "pA_v070D1iE", artist: "Sonny Boy Williamson" },
  { title: "CLAIR DE LUNE", id: "W0LHTWG-UmQ", artist: "Claude Debussy" },
  { title: "ABSTRACT GOLD", id: "E6M8qYn7KzQ", artist: "Unknown Artist" }
];

function SanctuaryConsole() {
  const [text, setText] = useState('');
  const [ytId, setYtId] = useState('ko70cExuzZM'); // Ophelia as default
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* MINIMALIST DOMAIN HEADER */}
      <div style={{ marginBottom: '30px', opacity: 0.8 }}>
        <h1 style={{ fontSize: '1rem', letterSpacing: '8px', margin: 0 }}>HARMONICA-BLUE.APP</h1>
      </div>

      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        
        {/* LEFT: ATMOSPHERIC VIDEO INSERT */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ width: '100%', aspectRatio: '2/3', border: '1px solid #222', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe 
               width="100%" height="100%"
               src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0&start=35&end=55`} 
               frameBorder="0" allow="autoplay"
            />
          </div>
          <p style={{ fontSize: '0.5rem', textAlign: 'center', marginTop: '12px', opacity: 0.4, letterSpacing: '1px' }}>SANCTUARY ATMOSPHERE</p>
        </div>

        {/* RIGHT: COGNITION CONSOLE */}
        <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column' }}>
          
          {/* WORDS AS ABSTRACTS: TILES ABOVE TEXT */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '4px', marginBottom: '10px', opacity: 0.5 }}>WORDS AS ABSTRACTS</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
               <img src={`${bucketUrl}/H5.png`} style={{ width: '55px', border: '1px solid #D4AF37', borderRadius: '4px' }} alt="Logic" />
               <img src={`${bucketUrl}/B5.png`} style={{ width: '55px', border: '1px solid #D4AF37', borderRadius: '4px' }} alt="Logic" />
            </div>
          </div>

          <textarea 
            placeholder="Stash a deep thought, a poem, or a link..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '240px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.4rem', fontStyle: 'italic', outline: 'none', resize: 'none', lineHeight: '1.8' }}
          />

          {/* DEEP THOUGHT PICKER */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '15px 0', borderTop: '1px solid #111' }}>
            {DEEP_QUOTES.map((q, i) => (
              <button key={i} onClick={() => setText(q.text)} style={{ minWidth: '110px', background: 'none', border: '1px solid #333', color: '#D4AF37', padding: '10px', fontSize: '0.6rem', cursor: 'pointer', borderRadius: '4px' }}>
                {q.label}
              </button>
            ))}
          </div>

          {/* VIDEO SELECTION */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '15px' }}>
            {SUBJECTS.map((s) => (
              <button key={s.id} onClick={() => setYtId(s.id)} style={{ minWidth: '110px', background: 'none', border: '1px solid #333', color: '#D4AF37', padding: '10px', fontSize: '0.6rem', cursor: 'pointer', borderRadius: '4px' }}>
                {s.title}
              </button>
            ))}
          </div>

          <button style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '15px 50px', fontWeight: 'bold', borderRadius: '40px', cursor: 'pointer', fontSize: '1rem', letterSpacing: '2px' }}>
            STASH & SEND ($0.99)
          </button>
        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense><SanctuaryConsole /></Suspense>; }
