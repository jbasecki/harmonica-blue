'use client';
import React, { useState, Suspense, useMemo } from 'react';

const BG_CREDITS = ["Savannah", "Ocean", "Tundra", "Rainforest", "Alpine", "Dunes", "Reefs", "Redwoods", "Clouds", "Serengeti"];

const QUOTES = {
  Birthday: ["May your day be filled with light.", "Another year of wisdom.", "Cheers to the journey ahead."],
  Bible: ["The Lord is my shepherd.", "Be strong and courageous.", "Love is patient, love is kind."],
  Popular: ["Quiet the mind, the soul will speak.", "Collect moments, not things.", "The sun will rise and we will try again."]
};

function DiscoverySanctuary() {
  const [toName, setToName] = useState('Mark');
  const [text, setText] = useState('Be strong and courageous.');
  const [bgIndex, setBgIndex] = useState(0);
  const [isReceiver, setIsReceiver] = useState(false);
  const [quoteCat, setQuoteCat] = useState<null | keyof typeof QUOTES>(null);

  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const traditionalCursive = "'Great Vibes', cursive";

  const tiles = useMemo(() => {
    const clean = toName.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    const penultimate = clean.length > 2 ? clean[clean.length - 2] : clean[1] || clean[0];
    return [clean[0], penultimate];
  }, [toName]);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4))' }} />
      </div>

      {/* 2. LOGO */}
      <div style={{ position: 'absolute', top: '3vh', left: '0', width: '100%', zIndex: 3, textAlign: 'center' }}>
        <h1 style={{ fontSize: '0.9rem', letterSpacing: '14px', margin: 0, fontWeight: 300, opacity: 0.7 }}>H A R M O N I C A</h1>
      </div>

      {/* 3. CENTER PIECE */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16vh' }}>
        
        {/* TILES & NAME - THE "MARK" SIGNATURE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '6px' }}>
          <div style={{ display: 'flex', gap: '3px', marginBottom: '1px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '18px', border: '0.2px solid rgba(212, 175, 55, 0.4)', borderRadius: '1px' }} alt="Art" />
             ))}
          </div>
          {/* ULTRA-SMALL NAME LABEL */}
          <div style={{ fontFamily: traditionalCursive, fontSize: '0.55rem', color: '#D4AF37', fontWeight: 300, opacity: 0.8 }}>
            {toName}
          </div>
        </div>

        {/* FROSTED "BOWY-FASHION" OVERLAY */}
        <div style={{ 
          width: '85%', 
          maxWidth: '340px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          backdropFilter: 'blur(22px)', 
          WebkitBackdropFilter: 'blur(22px)',
          borderRadius: '12px',
          padding: '12px 15px',
          border: '0.1px solid rgba(212, 175, 55, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <textarea 
            disabled={isReceiver}
            value={text} 
            onChange={(e) => setText(e.target.value)}
            style={{ 
              width: '100%', 
              height: '50px', 
              background: 'transparent', 
              border: 'none', 
              textAlign: 'center', 
              fontSize: '0.55rem', 
              fontFamily: traditionalCursive, 
              color: '#D4AF37', 
              lineHeight: '1.8',
              outline: 'none', 
              resize: 'none',
              opacity: 0.7
            }} 
          />

          {!isReceiver && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
              
              {/* 10 SLOTS ONLY */}
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(10)].map((_, i) => (
                  <button key={i} onClick={() => setBgIndex(i)} style={{ width: '12px', height: '12px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.2px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.25rem' }}>{i + 1}</button>
                ))}
              </div>

              {/* CATS */}
              <div style={{ display: 'flex', gap: '4px' }}>
                 {Object.keys(QUOTES).map((cat) => (
                   <button key={cat} onClick={() => setQuoteCat(cat as keyof typeof QUOTES)} style={{ background: 'none', border: '0.2px solid rgba(212, 175, 55, 0.3)', color: '#D4AF37', fontSize: '0.25rem', padding: '1px 4px' }}>{cat}</button>
                 ))}
              </div>

              <button style={{ background: 'rgba(212, 175, 55, 0.8)', color: '#000', padding: '4px 15px', borderRadius: '8px', fontSize: '0.4rem', border: 'none', cursor: 'pointer', marginTop: '4px' }}>STASH & SEND</button>
            </div>
          )}
        </div>
      </div>

      {/* 4. FOOTER */}
      <div style={{ position: 'absolute', bottom: '4vh', left: '6vw', right: '6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ width: '110px', background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '4px', border: '0.2px solid rgba(212, 175, 55, 0.2)' }}>
           <p style={{ fontSize: '0.25rem', letterSpacing: '1px', opacity: 0.5 }}>GIFTED MELODY</p>
           <div style={{ height: '15px', border: '0.2px solid rgba(212, 175, 55, 0.3)', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.35rem' }}>PLAY</div>
        </div>

        {!isReceiver && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <p style={{ fontSize: '0.3rem', opacity: 0.3 }}>TO:</p>
            <input value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '50px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.5rem', textAlign: 'right', outline: 'none' }} />
          </div>
        )}
      </div>
    </main>
  );
}

export default function Home() { 
  return (
    <Suspense fallback={<div />}>
      <DiscoverySanctuary />
    </Suspense>
  );
}
