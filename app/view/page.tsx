'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ViewContent() {
  const searchParams = useSearchParams();
  const ytId = searchParams.get('v') || 'TvnYmWpD_T8'; // The shared video
  const msg = searchParams.get('m') || 'Thinking of you.'; // The shared message
  const artist = searchParams.get('a') || 'Unknown Artist'; // The promotion
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ display: 'flex', height: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif' }}>
      
      {/* LEFT: CINEMATIC SPACE */}
      <div style={{ flex: 1.5, position: 'relative', borderRight: '1px solid #333' }}>
        <iframe 
          width="100%" height="100%" 
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&controls=0&mute=0`} 
          frameBorder="0" allow="autoplay" 
        />
        <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.7)', padding: '10px', fontSize: '0.8rem', textAlign: 'center' }}>
          VIDEO CHOICES / SUBJECT MENU
        </div>
      </div>

      {/* RIGHT: MESSAGE CONSOLE */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* TOP: ARTIST PROMOTION */}
        <div style={{ textAlign: 'right', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '10px' }}>
          <p style={{ fontSize: '0.7rem', margin: 0 }}>artist / promotion</p>
          <p style={{ fontWeight: 'bold' }}>{artist.toUpperCase()}</p>
        </div>

        {/* MIDDLE: THE STASHED COGNITION */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
            {/* Generating Abstracts automatically from message logic */}
            <img src={`${bucketUrl}/H5.png`} style={{ width: '40px', height: '60px', border: '1px solid #D4AF37' }} />
            <img src={`${bucketUrl}/B5.png`} style={{ width: '40px', height: '60px', border: '1px solid #D4AF37' }} />
          </div>
          <p style={{ fontSize: '1.8rem', fontStyle: 'italic', lineHeight: '1.4' }}>"{msg}"</p>
        </div>

        {/* BOTTOM: THE REPLY LOOP */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => window.location.href = '/'} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '15px 40px', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer' }}>
            REPLY WITH A HARMONICA
          </button>
          <p style={{ marginTop: '20px', fontSize: '0.6rem', opacity: 0.5 }}>HARMONICA BLUE © 2026</p>
        </div>
      </div>
    </main>
  );
}

export default function SharedView() { return <Suspense><ViewContent /></Suspense>; }
