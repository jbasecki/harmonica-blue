'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ViewContent() {
  const searchParams = useSearchParams();
  const ytId = searchParams.get('v') || 'ko70cExuzZM'; 
  const msg = searchParams.get('m') || 'Thinking of you.';
  const toName = searchParams.get('to') || 'Recipient';
  const fromName = searchParams.get('from') || 'A Friend';
  const artist = searchParams.get('a') || 'Unknown Artist';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const credits = parseInt(searchParams.get('credits') || '0');

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
      
      {/* LEFT: THE CINEMATIC SANCTUARY */}
      <div style={{ flex: 1.5, position: 'relative', borderRight: '1px solid #333' }}>
        <iframe 
          width="100%" height="100%" 
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&controls=0&mute=0&loop=1&playlist=${ytId}`} 
          frameBorder="0" allow="autoplay" 
        />
        {/* TOP RIGHT OVERLAY FOR MELODY IDENTIFICATION */}
        <div style={{ position: 'absolute', top: 20, right: 20, textAlign: 'right', textShadow: '2px 2px 4px #000' }}>
           <p style={{ fontSize: '0.6rem', margin: 0, opacity: 0.7, letterSpacing: '1px' }}>SELECTED MELODY</p>
           <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{artist.toUpperCase()}</p>
        </div>
      </div>

      {/* RIGHT: THE COGNITION CONSOLE */}
      <div style={{ flex: 1, padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* PERSONAL GREETING */}
        <p style={{ fontSize: '0.8rem', letterSpacing: '4px', marginBottom: '40px', opacity: 0.6 }}>
          TO: {toName.toUpperCase()} — FROM: {fromName.toUpperCase()}
        </p>

        {/* ALPHABET LOGIC: DIRECTLY ABOVE THE TEXT */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
          {abstracts.map((ltr, i) => (
            <img 
              key={i} 
              src={`${bucketUrl}/${ltr}5.png`} 
              style={{ width: '90px', height: '135px', border: '1px solid #D4AF37', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
              alt="Visual Cognition" 
            />
          ))}
        </div>

        {/* THE MESSAGE */}
        <p style={{ fontSize: '2.4rem', fontStyle: 'italic', lineHeight: '1.3', textAlign: 'center', maxWidth: '80%' }}>
          "{msg}"
        </p>

        {/* THE LOOP BUTTON */}
        <div style={{ marginTop: '60px' }}>
          <button 
            onClick={() => window.location.href = `/?credits=${credits > 0 ? credits - 1 : 0}`}
            style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '18px 45px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}
          >
            {credits > 0 ? `SEND ANOTHER (${credits} LEFT)` : 'REPLY WITH A HARMONICA'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function SharedView() { return <Suspense><ViewContent /></Suspense>; }
