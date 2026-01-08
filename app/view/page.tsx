'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ViewContent() {
  const searchParams = useSearchParams();
  const ytId = searchParams.get('v') || 'ko70cExuzZM'; 
  const msg = searchParams.get('m') || 'Thinking of you.';
  const toName = searchParams.get('to') || '';
  const fromName = searchParams.get('from') || '';
  const artist = searchParams.get('a') || 'Unknown Artist';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const getAbstracts = (input: string) => {
    const clean = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B'];
    const first = clean[0];
    const penult = clean.length > 1 ? clean[clean.length - 2] : first;
    return [first, penult];
  };

  const abstracts = getAbstracts(msg);

  return (
    <main style={{ display: 'flex', height: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif' }}>
      
      {/* LEFT: VIDEO SPACE */}
      <div style={{ flex: 1.5, position: 'relative', borderRight: '1px solid #333' }}>
        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytId}?autoplay=1&controls=0&mute=0`} frameBorder="0" allow="autoplay" />
        
        {/* ARTIST CORNER - NOW VISIBLE */}
        <div style={{ position: 'absolute', top: 20, right: 20, textAlign: 'right', textShadow: '2px 2px 4px #000' }}>
           <p style={{ fontSize: '0.6rem', margin: 0, opacity: 0.7 }}>SELECTED MELODY</p>
           <p style={{ fontWeight: 'bold' }}>{artist.toUpperCase()}</p>
        </div>
      </div>

      {/* RIGHT: TEXT GALLERY */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          {abstracts.map((ltr, i) => (
            <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '60px', border: '1px solid #D4AF37' }} />
          ))}
        </div>
        <p style={{ fontSize: '2rem', fontStyle: 'italic', textAlign: 'center' }}>"{msg}"</p>
        <p style={{ marginTop: '30px', fontSize: '0.8rem', opacity: 0.6 }}>TO: {toName} | FROM: {fromName}</p>
      </div>
    </main>
  );
}

export default function SharedView() { return <Suspense><ViewContent /></Suspense>; }
