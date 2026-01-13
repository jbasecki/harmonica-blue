'use client';
import React, { useState } from 'react';

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
  const [toName] = useState(initialData?.toName || 'Mark');
  const [fromName] = useState(initialData?.fromName || 'Krystyna');
  const [text, setText] = useState(initialData?.text || 'stash your vintage wisdom here...');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  
  const [isReceiver] = useState(!!initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const cursiveFont = "'Great Vibes', cursive";

  const getNameTiles = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B'];
    return clean.length === 1 ? [clean[0], clean[0]] : [clean[0], clean[clean.length - 2]]; 
  };

  const handleStashAndSend = async () => {
    setIsSaving(true);
    const giftId = Math.random().toString(36).substring(2, 12);
    try {
      const res = await fetch('/api/stash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: giftId, toName, fromName, message: text, bgIndex }),
      });
      if (res.ok) setShareableLink(`${window.location.origin}/gift/${giftId}`);
    } catch (e) { console.error(e); }
    setIsSaving(false);
  };

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', overflow: 'hidden', position: 'relative' }}>
      
      <video key={bgIndex} autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, zIndex: 1 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <h1 style={{ marginTop: '4vh', letterSpacing: '18px', color: '#D4AF37', fontSize: '0.9rem', fontWeight: 300, opacity: 0.8 }}>HARMONICA</h1>

        {/* TOP ANCHOR */}
        <div style={{ marginTop: '3vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {getNameTiles(toName).map((ltr, i) => (
              <img key={ltr + i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '48px', border: '0.4px solid #D4AF37', borderRadius: '4px' }} alt="" />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: cursiveFont, fontSize: '2.5rem', color: '#D4AF37' }}>{toName}</span>
            <div style={{ width: '16px', height: '16px', border: '0.5px solid #D4AF37', borderRadius: '50%', fontSize: '0.5rem', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>i</div>
          </div>
        </div>

        {/* THE GLASS VESSEL - FORCE CENTERED */}
        <div style={{ 
          marginTop: 'auto', marginBottom: '10vh', 
          width: '88%', maxWidth: '850px', height: '450px',
          background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(35px)', WebkitBackdropFilter: 'blur(35px)',
          borderRadius: '45px', border: '0.7px solid rgba(212, 175, 55, 0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', // Vertical Center
          padding: '40px', boxSizing: 'border-box'
        }}>
          <textarea 
            disabled={isReceiver}
            value={text} 
            onChange={(e) => setText(e.target.value)}
            style={{ 
              width: '100%', background: 'transparent', border: 'none', 
              color: '#D4AF37', fontFamily: cursiveFont,
              fontSize: '2.8rem', // Massive visibility
              textAlign: 'center', // Horizontal Center
              outline: 'none', resize: 'none',
              lineHeight: '1.4',
              display: 'block', margin: 'auto' // Force browser centering
            }} 
          />

          {!isReceiver && (
            <button onClick={handleStashAndSend} style={{ position: 'absolute', bottom: '30px', background: '#D4AF37', color: '#000', padding: '10px 50px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
              STASH & SEND
            </button>
          )}
        </div>

        {/* BACKGROUND SELECTORS */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '3vh', display: 'flex', gap: '12px' }}>
            {[...Array(10)].map((_, i) => (
              <button key={i} onClick={() => setBgIndex(i)} style={{ width: '30px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.15)', border: 'none' }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
