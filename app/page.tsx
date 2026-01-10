'use client';
import React, { useState, Suspense } from 'react';

const BG_CREDITS = ["BBC: African Savannah", "National Geographic: Deep Ocean", "Discovery: Arctic Tundra", "BBC: Amazon Rainforest", "Author: Alpine Peaks", "Discovery: Desert Dunes", "National Geographic: Coral Reefs", "BBC: Redwoods", "Author: Storm Clouds", "Discovery: Serengeti", "National Geographic: Galaxy", "Author: Misty Forest", "BBC: Great Barrier Reef", "Discovery: Volcanic Flow", "Author: Night Sky", "National Geographic: Tundra", "BBC: Waterfall", "Discovery: Coastal Cliffs", "Author: Wild Grasslands"];

const QUOTES = {
  Birthday: ["May your day be filled with light.", "Another year of wisdom.", "Cheers to the journey ahead."],
  Bible: ["The Lord is my shepherd.", "Be strong and courageous.", "Love is patient, love is kind."],
  Popular: ["Quiet the mind, the soul will speak.", "Collect moments, not things.", "The sun will rise and we will try again."]
};

function DiscoverySanctuary() {
  const [toName, setToName] = useState('Mark');
  const [text, setText] = useState('Be strong and courageous.');
  const [bgIndex, setBgIndex] = useState(17);
  const [fontChoice, setFontChoice] = useState(0);
  const [isReceiver, setIsReceiver] = useState(false); // SET TO FALSE TO EDIT
  const [isPlayerEnlarged, setIsPlayerEnlarged] = useState(false);
  const [quoteCat, setQuoteCat] = useState<null | keyof typeof QUOTES>(null);

  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const fonts = ["'Dancing Script', cursive", "'Great Vibes', cursive"];

  const getReceiverArt = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    const penultimate = clean.length > 2 ? clean[clean.length - 2] : clean[1] || clean[0];
    return [clean[0], penultimate];
  };

  const tiles = getReceiverArt(toName);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8))' }} />
      </div>

      {/* 2. TOP BRANDING */}
      <div style={{ position: 'absolute', top: '4vh', left: '6vw', zIndex: 3, display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ width: '25px', height: '15px', border: '1.5px solid #D4AF37' }}></div>
        <h1 style={{ fontSize: '1.2rem', letterSpacing: '8px', margin: 0, fontWeight: 'lighter' }}>HARMONICA</h1>
      </div>
      
      <div onClick={() => setIsReceiver(!isReceiver)} style={{ position: 'absolute', top: '4vh', right: '6vw', zIndex: 10, cursor: 'pointer', textAlign: 'right' }}>
        <p style={{ fontSize: '0.45rem', letterSpacing: '2px', opacity: 0.8, marginBottom: '2px' }}>{isReceiver ? 'REPLY' : 'CLOSE'}</p>
        <p style={{ fontSize: '0.35rem', fontStyle: 'italic', opacity: 0.4 }}>Visual by {BG_CREDITS[bgIndex]}</p>
      </div>

      {/* 3. CENTER COLUMN ALIGNMENT */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12vh 0 5vh', boxSizing: 'border-box' }}>
        
        <div style={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
          
          <div style={{ display: 'flex', gap: '10px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '35px', border: '0.5px solid #D4AF37', borderRadius: '3px' }} alt="Art" />
             ))}
          </div>

          <div onClick={() => setFontChoice(fontChoice === 0 ? 1 : 0)} style={{ fontFamily: fonts[fontChoice], fontSize: '2.2rem', cursor: 'pointer' }}>
            {toName}
          </div>

          <textarea 
            disabled={isReceiver}
            value={text} onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '120px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '2rem', fontFamily: fonts[fontChoice], color: '#D4AF37', outline: 'none', resize: 'none' }} 
          />

          {/* DASHBOARD ELEMENTS (Only shows if NOT isReceiver) */}
          {!isReceiver && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                 {Object.keys(QUOTES).map((cat) => (
                   <button key={cat} onClick={() => setQuoteCat(cat as keyof typeof QUOTES)} style={{ background: 'none', border: '0.3px solid #D4AF37', color: '#D4AF37', fontSize: '0.45rem', padding: '3px 8px' }}>{cat}</button>
                 ))}
                 <button onClick={() => setText('')} style={{ background: 'none', border: '0.3px solid #555', color: '#D4AF37', fontSize: '0.45rem', padding: '3px 8px' }}>Skip</button>
              </div>

              {quoteCat && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  {QUOTES[quoteCat].map((q, idx) => (
                    <button key={idx} onClick={() => { setText(q); setQuoteCat(null); }} style={{ fontSize: '0.4rem', color: '#D4AF37', background: 'rgba(0,0,0,0.4)', border: '0.2px solid #D4AF37', padding: '2px 6px' }}>{idx + 1}</button>
                  ))}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px' }}>
                {[...Array(19)].map((_, i) => (
                  <button key={i} onClick={() => setBgIndex(i)} style={{ width: '18px', height: '16px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.3px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.4rem' }}>{i + 1}</button>
                ))}
              </div>

              <button style={{ background: '#D4AF37', color: '#000', padding: '10px 45px', borderRadius: '25px', fontWeight: 'bold', fontSize: '0.7rem', border: 'none', cursor: 'pointer' }}>STASH & SEND</button>
            </div>
          )}
        </div>

        {/* 4. LOWER HORIZON (Music & Name Input) */}
        <div style={{ position: 'absolute', bottom: '5vh', left: '6vw', right: '6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div 
            onClick={() => setIsPlayerEnlarged(!isPlayerEnlarged)}
            style={{ width: isPlayerEnlarged ? '320px' : '200px', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '8px', border: '0.5px solid #D4AF37', cursor: 'pointer', transition: 'width 0.3s' }}
          >
             <p style={{ fontSize: '0.4rem', letterSpacing: '1px', opacity: 0.6 }}>{isPlayerEnlarged ? 'ENLARGED PLAYER' : 'GIFTED MELODY'}</p>
             <div style={{ height: '25px', border: '0.5px solid #D4AF37', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>PLAY</div>
          </div>

          {!isReceiver && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <p style={{ fontSize: '0.45rem', opacity: 0.4 }}>TO:</p>
              <input value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '100px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.8rem', textAlign: 'right', outline: 'none' }} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense><DiscoverySanctuary /></Suspense>; }
