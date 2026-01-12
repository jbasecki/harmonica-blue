'use client';
import React, { useState, Suspense, useEffect, useRef } from 'react';

// FIXES THE BUILD ERROR: "Unlocks" the Sanctuary to receive database gifts
interface SanctuaryProps {
  initialData?: {
    toName: string;
    fromName: string;
    text: string;
    bgIndex: number;
    youtubeUrl: string;
    isReceiver: boolean;
  };
}

function DiscoverySanctuary({ initialData }: SanctuaryProps) {
  const [toName, setToName] = useState(initialData?.toName || 'Mark');
  const [text, setText] = useState(initialData?.text || 'create your content and transform it into a harmonica of tiles (when ready)');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [isReceiver] = useState(initialData?.isReceiver || false);
  const [showVessel, setShowVessel] = useState(true); // Toggle for cinematic dancing mode
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const vintageCursive = "'Great Vibes', cursive"; // Copperplate Wedding Script font

  // ALPHABET LOGIC: Creates the "Harmonica" visual from text
  const getArtForWord = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return [];
    // Returns first and last letter for a visual "bookend" tile effect
    return [clean[0], clean[clean.length - 1]]; 
  };

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* CINEMATIC DANCING BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video ref={videoRef} key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
      </div>

      {/* HEADER & CINEMATIC TOGGLE */}
      <div style={{ position: 'absolute', top: '5vh', left: '0', width: '100%', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.2rem', letterSpacing: '18px', margin: 0, fontWeight: 300 }}>HARMONICA</h1>
        <button onClick={() => setShowVessel(!showVessel)} style={{ position: 'absolute', right: '5vw', background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', borderRadius: '50%', width: '45px', height: '45px', fontSize: '0.5rem', cursor: 'pointer' }}>
          {showVessel ? 'CLOSE' : 'OPEN'}
        </button>
      </div>

      {showVessel && (
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* VISUAL NAME & (I) TOOLTIP */}
          <div style={{ marginTop: '16vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontFamily: vintageCursive, fontSize: '2.5rem' }}>{toName}</div>
              <div title="...your name in visual form" style={{ width: '18px', height: '18px', border: '0.6px solid #D4AF37', borderRadius: '50%', fontSize: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'help', opacity: 0.6 }}>I</div>
            </div>
          </div>

          {/* GLASS WRITING VESSEL */}
          <div style={{ 
            marginTop: 'auto', marginBottom: '15vh', 
            width: '85%', maxWidth: '650px', minHeight: '350px',
            background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '50px', padding: '40px 30px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <textarea 
              disabled={isReceiver} value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', height: '100px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.4rem', fontFamily: vintageCursive, color: '#D4AF37', outline: 'none', resize: 'none' }} 
            />

            {/* THE HARMONICA: Words morph into art tiles */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
               {text.split(' ').slice(-3).map((word, idx) => (
                 <div key={idx} style={{ display: 'flex', gap: '4px' }}>
                   {getArtForWord(word).map((ltr, i) => (
                     <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '40px', border: '0.3px solid #D4AF37', borderRadius: '2px' }} alt="" />
                   ))}
                 </div>
               ))}
            </div>

            {!isReceiver && (
               <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                {[...Array(10)].map((_, i) => (
                  <button key={i} onClick={() => setBgIndex(i)} style={{ width: '25px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: 'none' }} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default function Home() { return <Suspense fallback={null}><DiscoverySanctuary /></Suspense> }
