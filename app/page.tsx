'use client';
import React, { useState, Suspense } from 'react';

export default function GiftSanctuary() {
  const [text, setText] = useState('');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [ytLink, setYtLink] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', fontFamily: 'serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* FULL-SCREEN CINEMATIC BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <iframe 
          width="100%" height="100%" 
          src="https://www.youtube-nocookie.com/embed/ko70cExuzZM?autoplay=1&mute=1&loop=1&playlist=ko70cExuzZM&controls=0&modestbranding=1" 
          frameBorder="0" style={{ objectFit: 'cover', opacity: 0.6 }} // Lowered opacity for better text visibility
        />
      </div>

      {/* UI OVERLAY LAYER */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', padding: '40px', display: 'flex', justifyContent: 'space-between' }}>
        
        {/* LEFT: THE MELODY PLAYER */}
        <div style={{ alignSelf: 'flex-end', width: '250px', background: 'rgba(0,0,0,0.7)', border: '1px solid #D4AF37', padding: '20px', borderRadius: '15px' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '2px', opacity: 0.7 }}>SURPRISE MELODY</p>
          <input 
            placeholder="Paste YouTube Link..." 
            onChange={(e) => setYtLink(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: '#D4AF37', fontSize: '0.7rem', marginTop: '10px' }}
          />
          <div style={{ marginTop: '15px', height: '40px', border: '1px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', cursor: 'pointer' }}>
            PLAY SONG
          </div>
        </div>

        {/* CENTER: COGNITION & ALPHABET LOGIC */}
        <div style={{ flex: 1, maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '100px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
             <img src={`${bucketUrl}/H5.png`} style={{ width: '60px', border: '1px solid #D4AF37' }} />
             <img src={`${bucketUrl}/B5.png`} style={{ width: '60px', border: '1px solid #D4AF37' }} />
          </div>
          
          <textarea 
            placeholder="Write your stashed greeting..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '150px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.5rem', fontStyle: 'italic', color: '#D4AF37', outline: 'none' }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '8px 20px', background: 'none', border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '0.7rem' }}>QUOTE PICKER</button>
            <button style={{ padding: '8px 20px', background: 'none', border: '1px solid #333', color: '#D4AF37', fontSize: '0.7rem' }}>SKIP</button>
          </div>

          <button style={{ background: '#D4AF37', color: '#000', padding: '15px 60px', borderRadius: '40px', fontWeight: 'bold', marginTop: '20px' }}>
            STASH & SEND
          </button>
        </div>

        {/* RIGHT: THE NAMES (TO & FROM) */}
        <div style={{ width: '300px', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '3px', opacity: 0.5 }}>TO:</p>
            <input 
              placeholder="RECEIVER NAME" 
              onChange={(e) => setToName(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2rem', textAlign: 'right', outline: 'none' }}
            />
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '3px', opacity: 0.5 }}>FROM:</p>
            <input 
              placeholder="SENDER NAME" 
              onChange={(e) => setFromName(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2rem', textAlign: 'right', outline: 'none' }}
            />
          </div>
        </div>

      </div>
    </main>
  );
}
