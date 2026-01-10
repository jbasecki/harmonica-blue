'use client';
import React, { useState, Suspense } from 'react';

const BG_CREDITS = [
  "BBC: African Savannah", "National Geographic: Deep Ocean", "Discovery: Arctic Tundra",
  "BBC: Amazon Rainforest", "Author: Alpine Peaks", "Discovery: Desert Dunes",
  "National Geographic: Coral Reefs", "BBC: Redwoods", "Author: Storm Clouds",
  "Discovery: Serengeti", "National Geographic: Galaxy", "Author: Misty Forest",
  "BBC: Great Barrier Reef", "Discovery: Volcanic Flow", "Author: Night Sky",
  "National Geographic: Tundra", "BBC: Waterfall", "Discovery: Coastal Cliffs",
  "Author: Wild Grasslands"
];

const QUOTES = {
  Birthday: ["May your day be filled with light.", "Another year of wisdom and grace.", "Cheers to the journey ahead."],
  Bible: ["The Lord is my shepherd; I shall not want.", "Be strong and courageous.", "Love is patient, love is kind."],
  Popular: ["Be the change you wish to see.", "Stay hungry, stay foolish.", "The best is yet to come."]
};

function DiscoverySanctuary() {
  const [toName, setToName] = useState('Mark');
  const [text, setText] = useState('');
  const [bgIndex, setBgIndex] = useState(17);
  const [fontChoice, setFontChoice] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
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
      
      {/* BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
          src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.85))' }} />
      </div>

      {/* GALLERY LABELS */}
      <div style={{ position: 'absolute', top: '3vh', left: '4vw', zIndex: 3 }}>
        <p style={{ fontSize: '0.35rem', fontStyle: 'italic', opacity: 0.4 }}>Visual by {BG_CREDITS[bgIndex]}</p>
      </div>

      {/* CENTER: ART, INFO [I], AND SIGNATURE */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: '5vh 6vw', boxSizing: 'border-box' }}>
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '30px', border: '0.3px solid #D4AF37', borderRadius: '2px' }} alt="Art" />
             ))}
             {/* [I] EXPLANATION BUTTON */}
             <div onClick={() => setShowInfo(!showInfo)} style={{ cursor: 'pointer', fontSize: '0.6rem', border: '0.5px solid #D4AF37', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>I</div>
          </div>

          {showInfo && (
            <p style={{ fontSize: '0.4rem', maxWidth: '200px', textAlign: 'center', opacity: 0.8, fontStyle: 'italic' }}>
              Your name translated into abstract tiles to be imagined in a visual manner.
            </p>
          )}

          <div onClick={() => setFontChoice(fontChoice === 0 ? 1 : 0)} style={{ fontFamily: fonts[fontChoice], fontSize: '1.2rem', color: '#D4AF37', cursor: 'pointer' }}>
            {toName}
          </div>
        </div>

        {/* DASHBOARD: QUOTE SELECTOR */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ width: '160px' }}>
             <p style={{ fontSize: '0.3rem', opacity: 0.5 }}>GIFTED MELODY</p>
             <input placeholder="Paste Link..." style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '0.3px solid #333', color: '#D4AF37', fontSize: '0.6rem' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <textarea placeholder="Write your greeting..." value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', height: '35px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '0.85rem', color: '#D4AF37', resize: 'none' }} />
            
            <div style={{ display: 'flex', gap: '10px' }}>
               <button onClick={() => setQuoteCat('Birthday')} style={{ background: 'none', border: '0.3px solid #D4AF37', color: '#D4AF37', fontSize: '0.4rem', padding: '2px 5px' }}>Birthday</button>
               <button onClick={() => setQuoteCat('Bible')} style={{ background: 'none', border: '0.3px solid #D4AF37', color: '#D4AF37', fontSize: '0.4rem', padding: '2px 5px' }}>Bible</button>
               <button onClick={() => setQuoteCat('Popular')} style={{ background: 'none', border: '0.3px solid #D4AF37', color: '#D4AF37', fontSize: '0.4rem', padding: '2px 5px' }}>Popular</button>
               <button onClick={() => setText('')} style={{ background: 'none', border: '0.3px solid #555', color: '#D4AF37', fontSize: '0.4rem', padding: '2px 5px' }}>Skip</button>
            </div>

            {quoteCat && (
              <div style={{ display: 'flex', gap: '5px' }}>
                {QUOTES[quoteCat].map((q, idx) => (
                  <button key={idx} onClick={() => { setText(q); setQuoteCat(null); }} style={{ fontSize: '0.35rem', color: '#D4AF37', background: 'rgba(0,0,0,0.5)', border: '0.1px solid #D4AF37' }}>Quote {idx + 1}</button>
                ))}
              </div>
            )}

            <button style={{ background: '#D4AF37', color: '#000', padding: '6px 22px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.5rem' }}>STASH & SEND</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <p style={{ fontSize: '0.3rem', opacity: 0.4 }}>TO:</p>
            <input placeholder="NAME" value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '80px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.6rem', textAlign: 'right' }} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense><DiscoverySanctuary /></Suspense>; }
