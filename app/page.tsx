'use client';
import React, { useState, Suspense } from 'react';

export default function SanctuaryHome() {
  const [text, setText] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* NEUTRAL DOMAIN HEADER */}
      <div style={{ marginBottom: '40px', opacity: 0.8 }}>
        <h1 style={{ fontSize: '1rem', letterSpacing: '8px', margin: 0 }}>HARMONICA-BLUE.APP</h1>
      </div>

      <div style={{ width: '100%', maxWidth: '950px', display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
        
        {/* LEFT: BUCKET VIDEO INSERT */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ width: '100%', aspectRatio: '2/3', border: '1px solid #222', borderRadius: '12px', overflow: 'hidden' }}>
            <video 
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={`${bucketUrl}/ophelia-snippet.mp4`} 
            />
          </div>
          <p style={{ fontSize: '0.5rem', textAlign: 'center', marginTop: '12px', opacity: 0.4, letterSpacing: '1px' }}>ATMOSPHERIC: THE FATE OF OPHELIA</p>
        </div>

        {/* RIGHT: COGNITION & ALPHABET LOGIC */}
        <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '4px', marginBottom: '15px', opacity: 0.5 }}>WORDS AS ABSTRACTS</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
               {/* Tiles directly above text for association */}
               <img src={`${bucketUrl}/H5.png`} style={{ width: '50px', border: '1px solid #D4AF37' }} />
               <img src={`${bucketUrl}/B5.png`} style={{ width: '50px', border: '1px solid #D4AF37' }} />
            </div>
          </div>

          <textarea 
            placeholder="Stash a thought from Hawking, Pacino, or yourself..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '240px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.4rem', fontStyle: 'italic', outline: 'none', resize: 'none', lineHeight: '1.7' }}
          />

          <div style={{ marginTop: '20px', borderTop: '1px solid #111', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ background: 'none', border: '1px solid #D4AF37', color: '#D4AF37', padding: '10px 25px', fontSize: '0.7rem', borderRadius: '25px', cursor: 'pointer' }}>
              REPLY SANCTUARY
            </button>
            <button style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '15px 50px', fontWeight: 'bold', borderRadius: '40px', cursor: 'pointer', fontSize: '0.9rem' }}>
              STASH & SEND ($0.99)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
