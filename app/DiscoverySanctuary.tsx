'use client';
import React, { useState, useRef, useEffect } from 'react';

// THIS FIXES THE HANDSHAKE ERROR: It tells Vercel that the "initialData" 
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

const QUOTES = {
  Birthday: ["May your day be filled with joy and light.", "Another year wiser.", "Cheers to the journey."],
  Bible: ["The Lord is my shepherd. - Psalm 23", "Be strong and courageous. - Joshua 1:9"],
  Popular: ["Be yourself; everyone else is taken.", "Regret the chances you didn't take."]
};

export function DiscoverySanctuary({ initialData }: SanctuaryProps) {
  const [toName, setToName] = useState(initialData?.toName || 'Mark');
  const [fromName, setFromName] = useState(initialData?.fromName || 'Krystyna');
  const [text, setText] = useState(initialData?.text || 'create your content here...');
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

  // PROPORTIONAL TILES LOGIC: Restored first/last letter harmonica effect
  const getTiles = (input: string) => {
    const clean = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length < 1) return ['H', 'B'];
    return clean.length === 1 ? [clean[0], clean[0]] : [clean[0], clean[clean.length - 2] || clean[0]];
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

  const currentVideoId = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video ref={videoRef} key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginTop: '5vh' }}>
          <h1 style={{ fontSize: '1.2rem', letterSpacing: '18px', margin: 0, fontWeight: 300 }}>HARMONICA</h1>
          <button onClick={() => setShowDashboard(!showDashboard)} style={{ position: 'absolute', right: '5vw', background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', borderRadius: '50%', width: '45px', height: '45px', fontSize: '0.5rem', cursor: 'pointer' }}>{showDashboard ? 'CLOSE' : 'OPEN'}</button>
        </div>

        {/* RESTORED: TOP NAMES & TILES */}
        <div style={{ marginTop: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            {getTiles(toName).map((ltr, i) => (
              <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '60px', border: '0.3px solid #D4AF37', borderRadius: '4px' }} alt="" />
            ))}
          </div>
          <span style={{ fontFamily: cursiveFont, fontSize: '2.5rem' }}>{toName}</span>
        </div>

        {/* GLASS VESSEL: RESTORED PROPORTIONS & FIXED MARGINS */}
        {showDashboard && (
          <div style={{ 
            marginTop: 'auto', marginBottom: '8vh', 
            width: '88%', maxWidth: '850px', height: '580px',
            background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(30px)',
            borderRadius: '40px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
            display: 'flex', flexDirection: 'column', padding: '40px', boxSizing: 'border-box', overflowY: 'auto'
          }}>
            <textarea 
              disabled={isReceiver} value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', flex: 1, background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.8rem', fontFamily: cursiveFont, color: '#D4AF37', outline: 'none', resize: 'none', padding: '20px', boxSizing: 'border-box' }} 
            />
            {!isReceiver && (
              <button onClick={handleStashAndSend} style={{ alignSelf: 'center', background: '#D4AF37', color: '#000', padding: '15px 50px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>STASH & SEND</button>
            )}
            {isReceiver && (
               <button onClick={() => window.location.href=`/?to=${fromName}&from=${toName}`} style={{ alignSelf: 'center', background: '#D4AF37', color: '#000', padding: '12px 40px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>REPLY TO {fromName.toUpperCase()}</button>
            )}
          </div>
        )}

        {/* RESTORED: 10 BG SELECTORS */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '2vh', display: 'flex', gap: '10px' }}>
            {[...Array(10)].map((_, i) => <button key={i} onClick={() => setBgIndex(i)} style={{ width: '25px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: 'none', cursor: 'pointer' }} />)}
          </div>
        )}
      </div>
    </main>
  );
}
