'use client';
import React, { useState, useRef, useEffect } from 'react';

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
  const [fromName, setFromName] = useState(initialData?.fromName || 'Krystyna');
  const [text, setText] = useState(initialData?.text || 'stash your vintage wisdom here...');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || '');
  
  const [isReceiver] = useState(!!initialData);
  const [showDashboard, setShowDashboard] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const cursiveFont = "'Great Vibes', cursive";

  // Harmonica Tile Engine
  const getTilesForWord = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return [];
    return clean.length === 1 ? [clean[0]] : [clean[0], clean[clean.length - 1]]; 
  };

  const handleStashAndSend = async () => {
    setIsSaving(true);
    // ... stash logic ...
    setIsSaving(false);
  };

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* BACKGROUND VIDEO: Controlled by 10 buttons */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video ref={videoRef} key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* HARMONICA TITLE */}
        <h1 style={{ marginTop: '5vh', letterSpacing: '18px', fontSize: '1rem', fontWeight: 300 }}>HARMONICA</h1>

        {/* RESTORED TOP BRIDGE: Names and Visual Tiles */}
        <div style={{ marginTop: '5vh', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {getTilesForWord(toName).map((ltr, i) => (
              <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '50px', border: '0.3px solid #D4AF37', borderRadius: '4px' }} alt="" />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: cursiveFont, fontSize: '2.5rem' }}>{toName}</span>
            <div title="Visual name form" style={{ width: '18px', height: '18px', border: '0.6px solid #D4AF37', borderRadius: '50%', fontSize: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'help' }}>i</div>
          </div>
          {isReceiver && <p style={{ fontSize: '0.6rem', opacity: 0.6, letterSpacing: '4px' }}>GIFT FROM {fromName.toUpperCase()}</p>}
        </div>

        {/* GLASS VESSEL: Anchored at the Bottom with FIXED MARGINS */}
        {showDashboard && (
          <div style={{ 
            marginTop: 'auto', marginBottom: '10vh', 
            width: '85%', maxWidth: '850px', height: '420px',
            background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '40px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            padding: '40px', boxSizing: 'border-box' // FIXED THE OVERFLOW MARGINS
          }}>
            
            <textarea 
              disabled={isReceiver} value={text} onChange={(e) => setText(e.target.value)}
              style={{ 
                width: '100%', flex: 1, background: 'transparent', border: 'none', 
                textAlign: 'center', fontSize: '1.8rem', fontFamily: cursiveFont, 
                color: '#D4AF37', outline: 'none', resize: 'none', padding: '10px'
              }} 
            />

            {!isReceiver && (
              <button onClick={handleStashAndSend} style={{ background: '#D4AF37', color: '#000', padding: '12px 60px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px' }}>
                {isSaving ? 'STASHING...' : 'STASH & SEND'}
              </button>
            )}

            {isReceiver && (
               <button onClick={() => window.location.href = `/?to=${encodeURIComponent(fromName)}&from=${encodeURIComponent(toName)}`} style={{ background: '#D4AF37', color: '#000', padding: '12px 40px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                 REPLY TO {fromName.toUpperCase()}
               </button>
            )}
          </div>
        )}

        {/* SENDER CONTROLS: 10 BACKGROUND SELECTORS */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '3vh', display: 'flex', gap: '10px' }}>
            {[...Array(10)].map((_, i) => (
              <button key={i} onClick={() => setBgIndex(i)} style={{ width: '25px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: 'none' }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
