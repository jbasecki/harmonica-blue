'use client';
import React, { useState, Suspense } from 'react';

export default function SanctuaryHome() {
  const [text, setText] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* THE NEUTRAL ENTRANCE: Domain Branding Only */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.2rem', letterSpacing: '8px', margin: 0, opacity: 0.9 }}>HARMONICA-BLUE.APP</h1>
      </div>

      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
        
        {/* THE GENTLE INSERT: Now scaled as a small emotional hook */}
        <div style={{ flex: 0.8, position: 'relative' }}>
          <div style={{ width: '100%', aspectRatio: '2/3', border: '1px solid #222', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe 
              src="https://www.youtube-nocookie.com/embed/ko70cExuzZM?controls=0&modestbranding=1&rel=0&autoplay=1&mute=1" 
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
          <p style={{ fontSize: '0.5rem', textAlign: 'center', marginTop: '12px', opacity: 0.4 }}>INTRODUCTORY HOOK: OPHELIA</p>
        </div>

        {/* THE SANCTUARY GALLERY */}
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '4px', marginBottom: '15px', opacity: 0.5 }}>WORDS AS ABSTRACTS</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
               <img src={`${bucketUrl}/H5.png`} style={{ width: '50px', border: '1px solid #D4AF37' }} />
               <img src={`${bucketUrl}/B5.png`} style={{ width: '50px', border: '1px solid #D4AF37' }} />
            </div>
          </div>

          <textarea 
            placeholder="Stash a thought from Hawking, Pacino, or yourself..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '200px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.5rem', fontStyle: 'italic', outline: 'none', resize: 'none', lineHeight: '1.6' }}
          />

          <div style={{ marginTop: '30px', borderTop: '1px solid #111', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* THE DOOR TO REPLY */}
            <button style={{ background: 'none', border: '1px solid #D4AF37', color: '#D4AF37', padding: '10px 25px', fontSize: '0.7rem', borderRadius: '25px', cursor: 'pointer' }}>
              REPLY SANCTUARY
            </button>
            
            <button style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '15px 50px', fontWeight: 'bold', borderRadius: '40px', cursor: 'pointer', fontSize: '0.9rem' }}>
              STASH & SEND ($0.99)
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER MISSION */}
      <div style={{ marginTop: '60px', textAlign: 'center', opacity: 0.4 }}>
        <p style={{ fontSize: '0.7rem', maxWidth: '500px' }}>
          "Share a thought, a melody, a film or a quote with someone. Sharing makes a day fuller."
        </p>
      </div>
    </main>
  );
}
