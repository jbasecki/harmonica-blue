'use client';
import React, { useState, useRef, useEffect } from 'react';

export interface SanctuaryProps {
  initialData?: {
    toName: string;
    fromName: string;
    text: string;
    bgIndex: number;
    youtubeUrl: string;
  };
}

export function DiscoverySanctuary({ initialData }: SanctuaryProps) {
  const [toName, setToName] = useState(initialData?.toName || 'Mark');
  const [fromName, setFromName] = useState(initialData?.fromName || 'Krystyna');
  const [text, setText] = useState(initialData?.text || 'create your content and transform it into a harmonica of tiles (when ready)');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || '');
  
  const [isReceiver] = useState(!!initialData);
  const [showDashboard, setShowDashboard] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const cursiveFont = "'Great Vibes', cursive";

  // RESTORED FOCUS LOGIC: Pause background if music plays
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && youtubeUrl) videoRef.current.pause();
      else videoRef.current.play();
    }
  }, [isPlaying, youtubeUrl]);

  // HARMONICA ENGINE: Labeled Tiles
  const getTilesForWord = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return [];
    return clean.length === 1 ? [clean[0]] : [clean[0], clean[clean.length - 1]]; 
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
      
      {/* BACKGROUND VIDEO: Controlled by 10 buttons */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video 
          ref={videoRef} 
          key={bgIndex} 
          autoPlay 
          muted 
          loop 
          playsInline 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isPlaying ? 0.3 : 0.7 }} 
          src={`${bucketUrl}/${bgIndex + 1}.mp4`} 
        />
      </div>

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* HEADER AREA: Restore original name placement */}
        <div style={{ marginTop: '15vh', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: cursiveFont, fontSize: '2.5rem' }}>{toName}</span>
            <div title="Visual name form" style={{ width: '18px', height: '18px', border: '0.6px solid #D4AF37', borderRadius: '50%', fontSize: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'help' }}>i</div>
          </div>
          {isReceiver && <p style={{ fontSize: '0.6rem', opacity: 0.6, letterSpacing: '4px' }}>GIFT FROM {fromName.toUpperCase()}</p>}
        </div>

        {/* HARMONICA TILES (LABELED) */}
        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
           {text.split(' ').slice(-4).map((word, idx) => (
             <div key={idx} style={{ display: 'flex', gap: '6px' }}>
               {getTilesForWord(word).map((ltr, i) => (
                 <div key={i} style={{ textAlign: 'center' }}>
                   <img src={`${bucketUrl}/${ltr}5.png`} style={{ width: '40px', border: '0.3px solid #D4AF37', borderRadius: '4px' }} alt="" />
                   <div style={{ fontSize: '0.4rem', marginTop: '4px', opacity: 0.5 }}>{ltr}</div>
                 </div>
               ))}
             </div>
           ))}
        </div>

        {/* GLASS VESSEL: Restored and Margin-Fixed */}
        {showDashboard && (
          <div style={{ 
            marginTop: 'auto', marginBottom: '10vh', 
            width: '85%', maxWidth: '850px', height: '400px',
            background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '40px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px'
          }}>
            
            {/* WRITING AREA: Centered with Internal Margins */}
            <textarea 
              disabled={isReceiver}
              value={text} 
              onChange={(e) => setText(e.target.value)}
              style={{ 
                width: '100%', flex: 1, background: 'transparent', border: 'none', 
                textAlign: 'center', fontSize: '1.6rem', fontFamily: cursiveFont, 
                color: '#D4AF37', outline: 'none', resize: 'none', 
                padding: '20px', boxSizing: 'border-box' // FIXED MARGINS
              }} 
            />

            {/* STASH BUTTON */}
            {!isReceiver && (
              <button onClick={handleStashAndSend} style={{ background: '#D4AF37', color: '#000', padding: '12px 60px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px' }}>
                {isSaving ? 'STASHING...' : 'STASH & SEND'}
              </button>
            )}

            {isReceiver && (
               <button onClick={() => window.location.href = `/?to=${encodeURIComponent(fromName)}&from=${encodeURIComponent(toName)}`} style={{ background: '#D4AF37', color: '#000', padding: '12px 40px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                 REPLY TO {fromName.toUpperCase()}
               </button>
            )}
          </div>
        )}

        {/* 10 BACKGROUND SELECTORS (SENDER CONTROL) */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '3vh', display: 'flex', gap: '10px' }}>
            {[...Array(10)].map((_, i) => (
              <button key={i} onClick={() => setBgIndex(i)} style={{ width: '25px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: 'none' }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
