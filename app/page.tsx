'use client';
import React, { useState, Suspense } from 'react';

const BG_CREDITS = ["BBC: Savannah", "NatGeo: Ocean", "Discovery: Tundra", "BBC: Rainforest", "Alpine Peaks", "Desert Dunes", "Coral Reefs", "Redwoods", "Storm Clouds", "Serengeti", "Galaxy", "Misty Forest", "Great Barrier Reef", "Volcanic Flow", "Night Sky", "NatGeo: Tundra", "Waterfall", "Coastal Cliffs", "Grasslands"];

const QUOTES = {
  Birthday: ["May your day be filled with light.", "Another year of wisdom.", "Cheers to the journey ahead."],
  Bible: ["The Lord is my shepherd.", "Be strong and courageous.", "Love is patient, love is kind."],
  Popular: ["Quiet the mind, the soul will speak.", "Collect moments, not things.", "The sun will rise and we will try again."]
};

function DiscoverySanctuary() {
  const [toName, setToName] = useState('Mark');
  const [text, setText] = useState('Be strong and courageous.');
  const [bgIndex, setBgIndex] = useState(17);
  const [isReceiver, setIsReceiver] = useState(false);
  const [quoteCat, setQuoteCat] = useState<null | keyof typeof QUOTES>(null);

  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const traditionalCursive = "'Great Vibes', cursive"; 

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
        <video key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.15)' }} />
      </div>

      {/* 2. CENTERED HEADER - FULL SCALE */}
      <div style={{ position: 'absolute', top: '5vh', left: '0', width: '100%', zIndex: 3, textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.6rem', letterSpacing: '20px', margin: 0, fontWeight: 300, color: '#D4AF37', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>HARMONICA</h1>
      </div>
      
      <div onClick={() => setIsReceiver(!isReceiver)} style={{ position: 'absolute', top: '5vh', right: '6vw', zIndex: 10, cursor: 'pointer', textAlign: 'right' }}>
        <p style={{ fontSize: '0.45rem', letterSpacing: '2px', opacity: 0.9 }}>{isReceiver ? 'REPLY' : 'CLOSE'}</p>
        <p style={{ fontSize: '0.35rem', fontStyle: 'italic', opacity: 0.4 }}>{BG_CREDITS[bgIndex]}</p>
      </div>

      {/* 3. CENTER COLUMN ENGINE */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* SIGNATURE: Tiles & Small Traditional Name */}
        <div style={{ marginTop: '16vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <div style={{ display: 'flex', gap: '12px' }}>
               {tiles.map((ltr, i) => (
                 <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '55px', border: '0.6px solid #D4AF37', borderRadius: '4px' }} alt="Art" />
               ))}
             </div>
             {/* [I] INFO ICON */}
             <div 
               title="Your name was translated into abstract tiles to be imagined in a visual manner."
               style={{ width: '18px', height: '18px', border: '0.8px solid #D4AF37', borderRadius: '50%', fontSize: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'help', opacity: 0.6 }}
             >I</div>
          </div>
          <div style={{ fontFamily: traditionalCursive, fontSize: '1.4rem', color: '#D4AF37', letterSpacing: '1px' }}>
            {toName}
          </div>
        </div>

        {/* 4. THE GLASS VESSEL - LOWER THIRD ANCHOR */}
        <div style={{ 
          marginTop: 'auto', 
          marginBottom: '12vh',
          width: '85%', 
          maxWidth: '650px', 
          minHeight: '320px',
          background: 'rgba(255, 255, 255, 0.08)', 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '50px',
          padding: '45px 35px',
          border: '0.6px solid rgba(212, 175, 55, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          {/* GREETING TEXT - Traditional & Elegant */}
          <textarea 
            disabled={isReceiver}
            value={text} 
            onChange={(e) => setText(e.target.value)}
            style={{ 
              width: '100%', 
              height: '80px', 
              background: 'transparent', 
              border: 'none', 
              textAlign: 'center', 
              fontSize: '1.25rem', 
              fontFamily: traditionalCursive, 
              color: '#D4AF37', 
              outline: 'none', 
              resize: 'none',
              lineHeight: '1.6'
            }} 
          />

          {!isReceiver && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px', width: '100%' }}>
              
              {/* QUOTE DASHBOARD - Full Size but Bottom-Anchored */}
              <div style={{ display: 'flex', gap: '10px' }}>
                 {Object.keys(QUOTES).map((cat) => (
                   <button key={cat} onClick={() => setQuoteCat(cat as keyof typeof QUOTES)} style={{ background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.55rem', padding: '6px 18px', borderRadius: '4px' }}>{cat}</button>
                 ))}
                 <button onClick={() => setText('')} style={{ background: 'none', border: '0.5px solid #666', color: '#D4AF37', fontSize: '0.55rem', padding: '6px 18px', borderRadius: '4px' }}>Clear</button>
              </div>

              {quoteCat && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  {QUOTES[quoteCat].map((q, idx) => (
                    <button key={idx} onClick={() => { setText(q); setQuoteCat(null); }} style={{ fontSize: '0.55rem', color: '#D4AF37', background: 'rgba(0,0,0,0.6)', border: '0.4px solid #D4AF37', width: '28px', height: '28px' }}>{idx + 1}</button>
                  ))}
                </div>
              )}

              {/* BACKGROUND SELECTION */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '8px' }}>
                {[...Array(19)].map((_, i) => (
                  <button key={i} onClick={() => setBgIndex(i)} style={{ width: '24px', height: '22px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.5px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.5rem' }}>{i + 1}</button>
                ))}
              </div>

              <button style={{ background: '#D4AF37', color: '#000', padding: '14px 65px', borderRadius: '35px', fontWeight: 'bold', fontSize: '0.75rem', border: 'none', cursor: 'pointer', letterSpacing: '2px' }}>STASH & SEND</button>
            </div>
          )}
        </div>

        {/* 5. LOWER CONTROLS */}
        <div style={{ position: 'absolute', bottom: '4vh', left: '6vw', right: '6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ width: '180px', background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '10px', border: '0.5px solid #D4AF37', cursor: 'pointer' }}>
             <p style={{ fontSize: '0.35rem', letterSpacing: '1px', opacity: 0.6 }}>GIFTED MELODY</p>
             <div style={{ height: '22px', border: '0.5px solid #D4AF37', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>PLAY</div>
          </div>

          {!isReceiver && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <p style={{ fontSize: '0.5rem', opacity: 0.4 }}>TO:</p>
              <input value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '100px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.9rem', textAlign: 'right', outline: 'none', borderBottom: '0.5px solid rgba(212, 175, 55, 0.3)' }} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense fallback={null}><DiscoverySanctuary /></Suspense> }
