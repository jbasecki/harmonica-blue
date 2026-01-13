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
  const [toName, setToName] = useState(initialData?.toName || 'Mark');
  const [text, setText] = useState(initialData?.text || 'Stash your vintage wisdom here...');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [isReceiver] = useState(!!initialData);
  
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const cursiveFont = "'Great Vibes', cursive";

  // Harmonica Tile Logic for the Name at the Top
  const getNameTiles = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B'];
    return clean.length === 1 ? [clean[0], clean[0]] : [clean[0], clean[clean.length - 2]]; 
  };

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', overflow: 'hidden', position: 'relative' }}>
      
      {/* CINEMATIC BACKGROUND */}
      <video key={bgIndex} autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, zIndex: 1 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* TITLE */}
        <h1 style={{ marginTop: '5vh', letterSpacing: '18px', color: '#D4AF37', fontSize: '1rem', fontWeight: 300 }}>HARMONICA</h1>

        {/* TOP ANCHOR: Visual Tiles and Name */}
        <div style={{ marginTop: '5vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {getNameTiles(toName).map((ltr, i) => (
              <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '50px', border: '0.3px solid #D4AF37', borderRadius: '4px' }} alt="" />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: cursiveFont, fontSize: '2.5rem', color: '#D4AF37' }}>{toName}</span>
            <div style={{ width: '16px', height: '16px', border: '0.5px solid #D4AF37', borderRadius: '50%', fontSize: '0.5rem', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>i</div>
          </div>
        </div>

        {/* THE GLASS VESSEL: Centered and Margin-Fixed */}
        <div style={{ 
          marginTop: 'auto', marginBottom: '10vh', 
          width: '85%', maxWidth: '800px', height: '400px',
          background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
          borderRadius: '40px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', 
          padding: '40px', boxSizing: 'border-box' // FIXED MARGINS
        }}>
          <textarea 
            disabled={isReceiver}
            value={text} 
            onChange={(e) => setText(e.target.value)}
            style={{ 
              width: '100%', height: '100%', background: 'transparent', border: 'none', 
              textAlign: 'center', // FIXED CENTERING
              fontSize: '2rem', // FIXED FONT SIZE
              fontFamily: cursiveFont, color: '#D4AF37', outline: 'none', resize: 'none'
            }} 
          />
        </div>

        {/* SENDER CONTROLS */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '3vh', display: 'flex', gap: '12px' }}>
            {[...Array(10)].map((_, i) => (
              <button key={i} onClick={() => setBgIndex(i)} style={{ width: '30px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: 'none', cursor: 'pointer' }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
