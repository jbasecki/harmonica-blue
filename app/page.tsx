'use client';
import React, { useState, Suspense, useMemo } from 'react';

const BG_CREDITS = ["African Savannah", "Deep Ocean", "Arctic Tundra", "Amazon Rainforest", "Alpine Peaks", "Desert Dunes", "Coral Reefs", "Redwoods", "Storm Clouds", "Serengeti"];

const QUOTES = {
  Birthday: ["May your day be filled with light.", "Another year of wisdom.", "Cheers to the journey ahead."],
  Bible: ["The Lord is my shepherd.", "Be strong and courageous.", "Love is patient, love is kind."],
  Popular: ["Quiet the mind, the soul will speak.", "Collect moments, not things.", "The sun will rise and we will try again."]
};

function DiscoverySanctuary() {
  const [toName, setToName] = useState('Mark');
  const [text, setText] = useState('Be strong and courageous.');
  const [bgIndex, setBgIndex] = useState(13); // Volcanic/Sunset vibe
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
        <video key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4))' }} />
      </div>

      {/* 2. LOGO - SPACED ELEGANTLY */}
      <div style={{ position: 'absolute', top: '4vh', left: '0', width: '100%', zIndex: 3, textAlign: 'center' }}>
        <h1 style={{ fontSize: '1rem', letterSpacing: '14px', margin: 0, fontWeight: 300, opacity: 0.8 }}>H A R M O N I C A</h1>
      </div>

      {/* 3. CENTER PIECE - LOWERED FOR BALANCE */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '22vh' }}>
        
        {/* TILES & NAME SIGNATURE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '2px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '20px', border: '0.2px solid rgba(212, 175, 55, 0.4)', borderRadius: '1px' }} alt="Art" />
             ))}
          </div>
          {/* SLIGHTLY BUMPED SIZE FOR READABILITY */}
          <div style={{ fontFamily: traditionalCursive, fontSize: '0.7rem', color: '#D4AF37', fontWeight: 300, opacity: 0.9 }}>
            {toName}
          </div>
        </div>

        {/* FROSTED OVERLAY */}
        <div style={{ 
          width: '85%', 
          maxWidth: '380px', 
          background: 'rgba(255, 255, 255, 0.04)', 
          backdropFilter: 'blur(20px)', 
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '15px',
          padding: '20px',
          border: '0.1px solid rgba(212, 175, 55, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <textarea 
            disabled={isReceiver}
            value={text} 
            onChange={(e) => setText(e.target.value)}
            style={{ 
              width: '100%', 
              height: '60px', 
              background: 'transparent', 
              border: 'none', 
              textAlign: 'center', 
              fontSize: '0.65rem', 
              fontFamily: traditionalCursive, 
              color: '#D4AF37', 
              lineHeight: '1.8',
              outline: 'none', 
              resize: 'none',
              opacity: 0.8
            }} 
          />

          {!isReceiver && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
              
              {/* 10 SELECTION SLOTS */}
              <div style={{ display: 'flex', gap: '3px' }}>
                {[...Array(10)].map((_, i) => (
                  <button key={i} onClick={() => setBgIndex(i)} style={{ width: '14px', height: '14px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.2px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.3rem' }}>{i + 1}</button>
                ))}
              </div>

              {/* QUOTE CATEGORIES */}
              <div style={{ display: 'flex', gap: '6px' }}>
                 {Object.keys(QUOTES).map((cat) => (
                   <button key={cat} onClick={() => setQuoteCat(cat as keyof typeof QUOTES)} style={{ background: 'none', border: '0.2px solid rgba(212, 175, 55, 0.4)', color: '#D4AF37', fontSize: '0.3rem', padding: '2px 6px' }}>{cat}</button>
                 ))}
              </div>

              <button style={{ background: 'rgba(212, 175, 55, 0.8)', color: '#000', padding: '6px 25px', borderRadius: '20px', fontSize: '0.45rem', border: 'none', cursor: 'pointer', marginTop: '8px' }}>STASH & SEND</button>
            </div>
          )}
        </div>
      </div>

      {/* 4. LOWER BAR */}
      <div style={{ position: 'absolute', bottom: '5vh', left: '6vw', right: '6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ width: '130px', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px', border: '0.2px solid rgba(212, 175, 55, 0.2)' }}>
           <p style={{ fontSize: '0.3rem', letterSpacing: '1px', opacity: 0.5 }}>GIFTED MELODY</p>
           <div style={{ height: '18px', border: '0.2px solid rgba(212, 175, 55, 0.3)', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.4rem' }}>PLAY</div>
        </div>

        {!isReceiver && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <p style={{ fontSize: '0.35rem', opacity: 0.4 }}>TO:</p>
            <input value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '60px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.6rem', textAlign: 'right', outline: 'none' }} />
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
