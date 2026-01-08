'use client';
import React, { useState, useEffect, Suspense } from 'react';

function GentleStudio() {
  const [showIntro, setShowIntro] = useState(true);
  const [text, setText] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
      
      {/* GENTLE OVERLAY: Only shows for newcomers */}
      {showIntro && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
          <p style={{ fontSize: '1.4rem', fontStyle: 'italic', maxWidth: '700px', lineHeight: '1.8' }}>
            “Share a thought, a melody, a film or a quote with someone. Sharing makes a day fuller. <br/>
            A thought shared is a thought that will live on.”
          </p>
          <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
            <button onClick={() => setShowIntro(false)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '10px 30px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>OK</button>
            <button onClick={() => { localStorage.setItem('hideHBIntro', 'true'); setShowIntro(false); }} style={{ background: 'none', border: '1px solid #D4AF37', color: '#D4AF37', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.7rem' }}>DON'T SHOW AGAIN</button>
          </div>
        </div>
      )}

      {/* THE SANCTUARY CONSOLE: Focused and Small */}
      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', gap: '40px', marginTop: '20px' }}>
        
        {/* LEFT: THE GENTLE INSERT (30% width instead of 50%) */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ width: '100%', paddingTop: '150%', position: 'relative', border: '1px solid #333', borderRadius: '20px', overflow: 'hidden' }}>
            <iframe 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              src="https://www.youtube-nocookie.com/embed/ko70cExuzZM?autoplay=1&mute=1&loop=1&playlist=ko70cExuzZM&controls=0&modestbranding=1" 
              frameBorder="0" 
            />
          </div>
          <p style={{ fontSize: '0.6rem', textAlign: 'center', marginTop: '10px', opacity: 0.5 }}>THE FATE OF OPHELIA</p>
        </div>

        {/* RIGHT: THE HEARTFELT COGNITION (70% width) */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'center', borderBottom: '1px solid #222', paddingBottom: '20px' }}>
             <p style={{ fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '15px' }}>WORDS AS ABSTRACTS</p>
             <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {/* Logic to show tiles based on text */}
                <img src={`${bucketUrl}/H5.png`} style={{ width: '50px', border: '1px solid #D4AF37' }} />
                <img src={`${bucketUrl}/B5.png`} style={{ width: '50px', border: '1px solid #D4AF37' }} />
             </div>
          </div>

          <textarea 
            placeholder="Stash your heartfelt quote..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '200px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.5rem', fontStyle: 'italic', outline: 'none', resize: 'none' }}
          />

          <button style={{ alignSelf: 'center', background: '#D4AF37', color: '#000', border: 'none', padding: '15px 50px', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>
            STASH & SEND ($0.99)
          </button>
        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense><GentleStudio /></Suspense>; }
