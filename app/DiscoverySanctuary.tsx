'use client';
import React, { useState, useRef, useEffect } from 'react';

// THIS IS THE ONLY ADDITION: It allows Variant B to work with Vercel again.
interface SanctuaryProps {
  initialData?: {
    toName: string;
    fromName: string;
    text: string;
    bgIndex: number;
    youtubeUrl: string;
  };
}

// RESTORED: Your original quotes exactly as they were in Variant B
const QUOTES = {
  Birthday: [
    "May your day be filled with joy and light.",
    "Another year wiser, another year stronger. Happy Birthday!",
    "Cheers to the beautiful journey ahead of you."
  ],
  Bible: [
    "The Lord is my shepherd; I shall not want. - Psalm 23:1",
    "Be strong and courageous. - Joshua 1:9"
  ],
  Popular: [
    "Be yourself; everyone else is already taken. - Oscar Wilde",
    "In the end, we only regret the chances we didn't take."
  ]
};

export function DiscoverySanctuary({ initialData }: SanctuaryProps) {
  // RESTORED: All original state and logic from your perfect backup
  const [toName, setToName] = useState(initialData?.toName || 'Mark');
  const [fromName, setFromName] = useState(initialData?.fromName || 'Krystyna');
  const [text, setText] = useState(initialData?.text || 'create your content here and transform it into a harmonica of tiles');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || '');
  const [isReceiver] = useState(!!initialData);
  const [showDashboard, setShowDashboard] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const [quoteCat, setQuoteCat] = useState<null | keyof typeof QUOTES>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const cursiveFont = "'Great Vibes', cursive";

  // LOGIC: Restored tiles for the name at the top
  const getNameTiles = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B'];
    return [clean[0], clean[clean.length - 2] || clean[0]];
  };

  const handleStashAndSend = async () => {
    setIsSaving(true);
    const giftId = Math.random().toString(36).substring(2, 12);
    try {
      const res = await fetch('/api/stash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: giftId, toName, fromName, message: text, bgIndex, youtubeUrl }),
      });
      if (res.ok) setShareableLink(`${window.location.origin}/gift/${giftId}`);
    } catch (e) { console.error(e); }
    setIsSaving(false);
  };

  const nameTiles = getNameTiles(toName);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* RESTORED: Background Video with manual selector control */}
      <video ref={videoRef} key={bgIndex} autoPlay muted loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, zIndex: 1 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* RESTORED: Names and Tiles at the TOP */}
        <div style={{ marginTop: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            {nameTiles.map((ltr, i) => (
              <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '60px', border: '0.3px solid #D4AF37', borderRadius: '4px' }} alt="" />
            ))}
          </div>
          <div style={{ fontFamily: cursiveFont, fontSize: '2.5rem' }}>{toName}</div>
        </div>

        {/* RESTORED: Glass Vessel with Fixed Internal Margins */}
        {showDashboard && (
          <div style={{ 
            marginTop: 'auto', marginBottom: '12vh', 
            width: '85%', maxWidth: '900px', height: '420px',
            background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)',
            borderRadius: '50px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
            display: 'flex', flexDirection: 'column', padding: '40px', // FIXED MARGINS
            boxSizing: 'border-box', overflowY: 'auto'
          }}>
            <textarea 
              disabled={isReceiver} value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', flex: 1, background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.6rem', fontFamily: cursiveFont, color: '#D4AF37', outline: 'none', resize: 'none', padding: '10px' }} 
            />
            
            {/* RESTORED: DASHBOARD CONTROLS */}
            {!isReceiver && (
              <div style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleStashAndSend} style={{ background: '#D4AF37', color: '#000', padding: '15px 60px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px' }}>
                  {isSaving ? 'STASHING...' : 'STASH & SEND'}
                </button>
              </div>
            )}

            {isReceiver && (
               <button onClick={() => window.location.href=`/?to=${encodeURIComponent(fromName)}&from=${encodeURIComponent(toName)}`} style={{ background: '#D4AF37', color: '#000', padding: '12px 40px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                 REPLY TO {fromName.toUpperCase()}
               </button>
            )}
          </div>
        )}

        {/* RESTORED: 10 background selectors at the very bottom */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '3vh', display: 'flex', gap: '10px' }}>
            {[...Array(10)].map((_, i) => (
              <button key={i} onClick={() => setBgIndex(i)} style={{ width: '25px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: 'none', cursor: 'pointer' }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
