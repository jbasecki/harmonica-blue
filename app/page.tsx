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
  const [isReceiver, setIsReceiver] = useState(true);
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
      
      {/* 1. BACKGROUND VIDEO */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8))' }} />
      </div>

      {/* 2. TOP BRANDING */}
      <div style={{ position: 'absolute', top: '4vh', left: '6vw', zIndex: 3, display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ width: '25px', height: '15px', border: '1.5px solid #D4AF37' }}></div>
        <h1 style={{ fontSize: '1.2rem', letterSpacing: '8px', margin: 0, fontWeight: 'lighter' }}>HARMONICA</h1>
      </div>
      
      <div onClick={() => setIsReceiver(!isReceiver)} style={{ position: 'absolute', top: '4vh', right: '6vw', zIndex: 10, cursor: 'pointer', textAlign: 'right' }}>
        <p style={{ fontSize: '0.4rem', letterSpacing: '2px', opacity: 0.8, marginBottom: '2px' }}>{isReceiver ? 'REPLY' : 'CLOSE'}</p>
        <p style={{ fontSize: '0.35rem', fontStyle: 'italic', opacity: 0.4 }}>Visual by {BG_CREDITS[bgIndex]}</p>
      </div>

      {/* 3. CENTERED ALIGNMENT COLUMN */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12vh 0 5vh', boxSizing: 'border-box' }}>
        
        {/* CENTER COLUMN: Locked to 400px width for alignment */}
        <div style={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
          
          {/* ART TILES */}
          <div style={{ display: 'flex', gap: '10px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '35px', border: '0.5px solid #D4AF37', borderRadius: '3px' }} alt="Art" />
             ))}
          </div>

          {/* NAME */}
          <div onClick={() => setFontChoice(fontChoice === 0 ? 1 : 0)} style={{ fontFamily: fonts[fontChoice], fontSize: '1.8rem', cursor: 'pointer' }}>
            {toName}
          </div>

          {/* GREETING */}
          <textarea 
            disabled={isReceiver}
            value={text} onChange={(e) => setText(e.target.value)}
            style={{ 
              width: '100%', height: '120px', background: 'transparent', border: 'none', textAlign: 'center', 
              fontSize: '1.8rem', fontFamily: fonts[fontChoice], color: '#D4AF37', outline: 'none', resize: 'none' 
            }} 
          />

          {/* DASHBOARD ELEMENTS (Only in Creation Mode) */}
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
                  <button key={i} onClick={() => setBgIndex(i)} style={{ width: '16px', height: '14px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.3px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.35rem' }}>{i + 1}</button>
                ))}
              </div>

              <button style={{ background: '#D4AF37', color: '#000', padding: '8px 40px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.65rem', border: 'none' }}>STASH & SEND</button>
            </div>
          )}
        </div>

        {/* 4. LOWER HORIZON (Names & Music) */}
        <div style={{ position: 'absolute', bottom: '5vh', left: '6vw', right: '6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div 
            onClick={() => setIsPlayerEnlarged(!isPlayerEnlarged)}
            style={{ width: isPlayerEnlarged ? '300px' : '180px', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', border: '0.3px solid #D4AF37', cursor: 'pointer', transition: 'width 0.3s' }}
          >
             <p style={{ fontSize: '0.35rem', opacity: 0.5 }}>{isPlayerEnlarged ? 'ENLARGED PLAYER' : 'GIFTED MELODY'}</p>
             <div style={{ height: '20px', border: '0.5px solid #D4AF37', marginTop: '5px', textAlign: 'center', fontSize: '0.5rem' }}>PLAY</div>
          </div>

          {!isReceiver && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <p style={{ fontSize: '0.4rem', opacity: 0.4 }}>TO:</p>
              <input value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '90px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.7rem', textAlign: 'right', outline: 'none' }} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense><DiscoverySanctuary /></Suspense>; }
