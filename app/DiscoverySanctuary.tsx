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
  // CORE STATE
  const [toName] = useState(initialData?.toName || 'Mark');
  const [fromName] = useState(initialData?.fromName || 'Krystyna');
  const [text, setText] = useState(initialData?.text || 'stash your vintage wisdom here...');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [isReceiver] = useState(!!initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const cursiveFont = "'Great Vibes', cursive";

  // LOGIC: Top Tiles for the name bridge
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
      
      {/* BACKGROUND VIDEO: Anchored to Choice */}
      <video key={bgIndex} autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, zIndex: 1 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* TITLE */}
        <h1 style={{ marginTop: '4vh', letterSpacing: '18px', color: '#D4AF37', fontSize: '0.8rem', fontWeight: 300, opacity: 0.8 }}>HARMONICA</h1>

        {/* TOP ANCHOR: Names and Tiles (The Bridge) */}
        <div style={{ marginTop: '3vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {getNameTiles(toName).map((ltr, i) => (
              <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '45px', border: '0.4px solid #D4AF37', borderRadius: '4px' }} alt="" />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: cursiveFont, fontSize: '2.5rem', color: '#D4AF37' }}>{toName}</span>
            <div style={{ width: '16px', height: '16px', border: '0.5px solid #D4AF37', borderRadius: '50%', fontSize: '0.5rem', color: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>i</div>
          </div>
          {isReceiver && <p style={{ fontSize: '0.55rem', color: '#D4AF37', opacity: 0.6, letterSpacing: '4px' }}>GIFT FROM {fromName.toUpperCase()}</p>}
        </div>

        {/* THE GLASS VESSEL: CENTERED, LARGE, & MARGIN-PROTECTED */}
        <div style={{ 
          marginTop: 'auto', marginBottom: '10vh', 
          width: '88%', maxWidth: '850px', height: '450px',
          background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(35px)', WebkitBackdropFilter: 'blur(35px)',
          borderRadius: '45px', border: '0.7px solid rgba(212, 175, 55, 0.25)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', // VERTICAL CENTERING
          padding: '40px', boxSizing: 'border-box'
        }}>
          {/* WRITING AREA: LARGE & CENTERED */}
          <textarea 
            disabled={isReceiver}
            value={text} 
            onChange={(e) => setText(e.target.value)}
            style={{ 
              width: '100%', flex: 1, background: 'transparent', border: 'none', 
              textAlign: 'center', // HORIZONTAL CENTERING
              fontSize: '2.4rem', // BOLD VINTAGE SIZE
              fontFamily: cursiveFont, color: '#D4AF37', outline: 'none', resize: 'none',
              padding: '10px'
            }} 
          />

          {!isReceiver && (
            <button onClick={handleStashAndSend} style={{ marginTop: '20px', background: '#D4AF37', color: '#000', padding: '12px 60px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px', flexShrink: 0 }}>
              {isSaving ? 'STASHING...' : 'STASH & SEND'}
            </button>
          )}

          {shareableLink && (
            <div style={{ marginTop: '15px', fontSize: '0.6rem', color: '#D4AF37', opacity: 0.8 }}>LINK: {shareableLink}</div>
          )}
        </div>

        {/* 10 BACKGROUND SELECTORS: SENDER CHOICE */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '
