'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ViewContent() {
  const searchParams = useSearchParams();
  
  // Data harvested from the URL parameters
  const ytId = searchParams.get('v') || 'ko70cExuzZM'; 
  const msg = searchParams.get('m') || 'Thinking of you.';
  const toName = searchParams.get('to') || 'Recipient';
  const fromName = searchParams.get('from') || 'A Friend';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // The "5-for-1" Credit Logic tracking
  const credits = parseInt(searchParams.get('credits') || '0');
  const nextCredits = credits > 0 ? credits - 1 : 0;

  // Alphabet Logic: Recreating the visual abstracts from the message
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
        {/* GOLD PERSONALIZED GREETING OVERLAY */}
        <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.8)', padding: '15px', fontSize: '0.9rem', textAlign: 'center', borderTop: '1px solid #D4AF37', letterSpacing: '3px' }}>
          FOR: {toName.toUpperCase()} — FROM: {fromName.toUpperCase()}
        </div>
      </div>

      {/* RIGHT: THE MESSAGE CONSOLE */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* ARTIST PROMOTION CORNER */}
        <div style={{ textAlign: 'right', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '10px' }}>
          <p style={{ fontSize: '0.7rem', margin: 0 }}>artist / promotion</p>
          <p style={{ fontWeight: 'bold', letterSpacing: '1px' }}>HARMONICA BLUE EXCLUSIVE</p>
        </div>

        {/* THE ALPHABET ABSTRACTS & STASHED COGNITION */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '30px' }}>
            {abstracts.map((ltr, i) => (
              <img 
                key={i} 
                src={`${bucketUrl}/${ltr}5.png`} 
                style={{ width: '70px', height: '100px', border: '1px solid #D4AF37', borderRadius: '4px' }} 
                alt="Abstract Art" 
              />
            ))}
          </div>
          <p style={{ fontSize: '2rem', fontStyle: 'italic', lineHeight: '1.4', margin: '0 20px' }}>"{msg}"</p>
        </div>

        {/* THE RECURSIVE REPLY LOOP */}
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => window.location.href = `/?credits=${nextCredits}`}
            style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '18px 50px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px', boxShadow: '0 4px 15px rgba(212,175,55,0.3)' }}
          >
            {credits > 0 ? `SEND ANOTHER (${credits} LEFT)` : 'REPLY WITH A HARMONICA'}
          </button>
          <p style={{ marginTop: '25px', fontSize: '0.65rem', opacity: 0.5, letterSpacing: '1px' }}>HARMONICA BLUE © 2026</p>
        </div>
      </div>
    </main>
  );
}

export default function SharedView() { return <Suspense><ViewContent /></Suspense>; }
