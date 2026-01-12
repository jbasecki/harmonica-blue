'use client';
import React, { useState, Suspense, useEffect, useRef } from 'react';

// FIXES VERCEL BUILD ERROR
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
  const [showDashboard, setShowDashboard] = useState(true); // Cinematic Mode Toggle
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || '');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const elegantScript = "'Great Vibes', cursive"; // Matches your wedding font screenshot

  // Hides dashboard to show full-screen dancing video
  const toggleCinematic = () => setShowDashboard(!showDashboard);

  const getArtForWord = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return [];
    return [clean[0], clean[clean.length - 1]]; // Start and end tiles of the word
  };

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* FULL BACKGROUND VIDEO */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video ref={videoRef} key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
      </div>

      {/* TOP HEADER & CLOSE BUTTON */}
      <div style={{ position: 'absolute', top: '5vh', left: '0', width: '100%', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.2rem', letterSpacing: '18px', margin: 0 }}>HARMONICA</h1>
        <button onClick={toggleCinematic} style={{ position: 'absolute', right: '5vw', background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', borderRadius: '50%', padding: '10px', fontSize: '0.6rem', cursor: 'pointer' }}>
          {showDashboard ? 'CLOSE' : 'OPEN'}
        </button>
      </div>

      {showDashboard && (
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* INTERACTIVE NAME & (I) INFO */}
          <div style={{ marginBottom: '5vh', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
              <div style={{ fontFamily: elegantScript, fontSize: '2.5rem' }}>{toName}</div>
              <div title="...your name in visual form" style={{ width: '20px', height: '20px', border: '0.6px solid #D4AF37', borderRadius: '50%', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'help', opacity: 0.7 }}>I</div>
            </div>
          </div>

          {/* GLASS WRITING VESSEL */}
          <div style={{ 
            width: '80%', maxWidth: '600px', minHeight: '300px',
            background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(15px)',
            borderRadius: '40px', padding: '30px', border: '0.5px solid rgba(212, 175, 55, 0.3)'
          }}>
             <textarea 
               value={text} 
               onChange={(e) => setText(e.target.value)}
               style={{ width: '100%', height: '150px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.3rem', fontFamily: elegantScript, color: '#D4AF37', outline: 'none', resize: 'none' }} 
             />
             
             {/* Word-to-Tile Harmonica Display */}
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                {text.split(' ').slice(-3).map((word, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '5px' }}>
                    {getArtForWord(word).map((ltr, i) => (
                      <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '30px', opacity: 0.9, borderRadius: '2px' }} alt="" />
                    ))}
                  </div>
                ))}
             </div>
          </div>

          {/* BG SELECTION PILLS */}
          <div style={{ marginTop: '5vh', display: 'flex', gap: '8px' }}>
            {[...Array(10)].map((_, i) => (
              <button key={i} onClick={() => setBgIndex(i)} style={{ width: '25px', height: '25px', borderRadius: '50%', border: '0.5px solid #D4AF37', background: bgIndex === i ? '#D4AF37' : 'none' }} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default function Home() { return <Suspense fallback={null}><DiscoverySanctuary /></Suspense> }
