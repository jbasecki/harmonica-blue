'use client';
import React, { useState, useRef } from 'react';

// THIS IS THE ONLY ADDITION: It tells Vercel that the "initialData" 
// package from the Mailman is expected and allowed.
interface SanctuaryProps {
  initialData?: {
    toName: string;
    fromName: string;
    text: string;
    bgIndex: number;
    youtubeUrl: string;
  };
}

export function DiscoverySanctuary({ initialData }: SanctuaryProps) {
  // Use the "Variant B" logic you love
  const [toName, setToName] = useState(initialData?.toName || 'Mark');
  const [fromName, setFromName] = useState(initialData?.fromName || '');
  const [text, setText] = useState(initialData?.text || 'create your content here...');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || '');
  
  const [showDashboard, setShowDashboard] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const cursiveFont = "'Great Vibes', cursive";

  // SURGICAL FIX: padding: '30px' and boxSizing: 'border-box' keeps text inside.
  const glassVesselStyle: React.CSSProperties = {
    marginTop: 'auto', marginBottom: '12vh', 
    width: '85%', maxWidth: '900px', minHeight: '400px',
    background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)',
    borderRadius: '50px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '30px', boxSizing: 'border-box' // THE MARGIN FIX
  };

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      <video key={bgIndex} autoPlay muted loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, zIndex: 1 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
      
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginTop: '16vh', fontFamily: cursiveFont, fontSize: '2.5rem' }}>{toName}</div>

        {showDashboard && (
          <div style={glassVesselStyle}>
            <textarea 
              value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', flex: 1, background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.5rem', fontFamily: cursiveFont, color: '#D4AF37', outline: 'none', resize: 'none' }} 
            />
            <button onClick={() => setShowDashboard(false)} style={{ background: '#D4AF37', color: '#000', padding: '10px 40px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>STASH & SEND</button>
          </div>
        )}
      </div>
    </main>
  );
}
