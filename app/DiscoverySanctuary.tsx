'use client';
import React, { useState, useRef } from 'react';

export interface SanctuaryProps {
  initialData?: {
    toName: string;
    fromName: string;
    text: string;
    bgIndex: number;
    youtubeUrl: string;
  };
}

export function DiscoverySanctuary({ initialData }: SanctuaryProps) {
  const [toName, setToName] = useState(initialData?.toName || 'Friend');
  const [text, setText] = useState(initialData?.text || 'Stash your vintage wisdom here...');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [isReceiver] = useState(!!initialData);
  const cursiveFont = "'Great Vibes', cursive";
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
      {/* BACKGROUND: SENDER CHOICE */}
      <video key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginTop: '5vh', letterSpacing: '18px', color: '#D4AF37', fontSize: '1rem' }}>HARMONICA</h1>

        {/* THE GLASS VESSEL: RE-CENTERED WITH MARGINS */}
        <div style={{ 
          marginTop: 'auto', marginBottom: '10vh', 
          width: '85%', maxWidth: '800px', height: '400px',
          background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(30px)',
          borderRadius: '40px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
          padding: '40px', boxSizing: 'border-box', // THE MARGIN FIX
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          overflowY: 'auto' // THE SCROLLBAR FIX
        }}>
          <textarea 
            disabled={isReceiver} value={text} onChange={(e) => setText(e.target.value)}
            style={{ 
              width: '100%', flex: 1, background: 'transparent', border: 'none', 
              textAlign: 'center', fontSize: '1.8rem', fontFamily: cursiveFont, 
              color: '#D4AF37', outline: 'none', resize: 'none' 
            }} 
          />
        </div>

        {/* SENDER CONTROLS */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '3vh', display: 'flex', gap: '10px' }}>
            {[...Array(10)].map((_, i) => (
              <button key={i} onClick={() => setBgIndex(i)} style={{ width: '25px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: 'none', cursor: 'pointer' }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
