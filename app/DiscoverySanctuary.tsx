'use client';
import React, { useState, useRef } from 'react';

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
  // CORE DATA
  const [toName, setToName] = useState(initialData?.toName || 'Mark');
  const [fromName, setFromName] = useState(initialData?.fromName || 'Krystyna');
  const [text, setText] = useState(initialData?.text || 'create your content and transform it into a harmonica of tiles (when ready)');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || '');
  
  // UI & STATE
  const [isReceiver] = useState(!!initialData);
  const [showDashboard, setShowDashboard] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const cursiveFont = "'Great Vibes', cursive";

  // HARMONICA ENGINE: Maps first/last letters with gold labels
  const getTilesForWord = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return [];
    return clean.length === 1 ? [clean[0]] : [clean[0], clean[clean.length - 1]]; 
  };

  const handleReply = () => {
    // Swaps names for the reply
    const originalSender = fromName;
    const originalReceiver = toName;
    window.location.href = `/?to=${encodeURIComponent(originalSender)}&from=${encodeURIComponent(originalReceiver)}`;
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
      
      {/* Cinematic Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video ref={videoRef} key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* HEADER */}
        <div style={{ marginTop: '5vh', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.2rem', letterSpacing: '18px', margin: 0, fontWeight: 300 }}>HARMONICA</h1>
          {isReceiver && <p style={{ fontSize: '0.6rem', opacity: 0.6 }}>A GIFT FROM {fromName.toUpperCase()}</p>}
        </div>

        {/* GLASS VESSEL */}
        {showDashboard && (
          <div style={{ 
            marginTop: 'auto', marginBottom: '8vh', 
            width: '88%', maxWidth: '850px', height: '600px',
            background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '40px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            overflowY: 'auto', scrollbarWidth: 'thin', padding: '30px'
          }}>
            
            {/* VIDEO WINDOW */}
            {currentVideoId && (
              <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '25px', borderRadius: '20px', overflow: 'hidden', border: '0.5px solid #D4AF37' }}>
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=${isReceiver ? 1 : 0}`} allow="autoplay" frameBorder="0" />
              </div>
            )}

            {/* MESSAGE AREA */}
            <textarea 
              disabled={isReceiver}
              value={text} 
              onChange={(e) => setText(e.target.value)}
              style={{ 
                width: '100%', flex: 1, background: 'transparent', border: 'none', 
                textAlign: 'center', fontSize: '1.8rem', fontFamily: cursiveFont, 
                color: '#D4AF37', outline: 'none', resize: 'none', padding: '10px 20px'
              }} 
            />

            {/* LABELED HARMONICA TILES */}
            <div style={{ display: 'flex', gap: '20px', margin: '30px 0', flexWrap: 'wrap', justifyContent: 'center' }}>
               {text.split(' ').slice(-4).map((word, idx) => (
                 <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                   {getTilesForWord(word).map((ltr, i) => (
                     <div key={i} style={{ textAlign: 'center' }}>
                       <img src={`${bucketUrl}/${ltr}5.png`} style={{ width: '42px', border: '0.3px solid #D4AF37', borderRadius: '4px' }} alt="" />
                       <div style={{ fontSize: '0.45rem', marginTop: '5px', opacity: 0.5, letterSpacing: '1px' }}>{ltr}</div>
                     </div>
                   ))}
                 </div>
               ))}
            </div>

            {/* ACTIONS */}
            <div style={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'center' }}>
              {isReceiver ? (
                <button onClick={handleReply} style={{ background: '#D4AF37', color: '#000', padding: '12px 40px', borderRadius: '25px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                  REPLY TO {fromName.toUpperCase()}
                </button>
              ) : (
                <button onClick={handleStashAndSend} style={{ background: '#D4AF37', color: '#000', padding: '15px 60px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px' }}>
                  {isSaving ? 'STASHING...' : 'STASH & SEND'}
                </button>
              )}
            </div>

            {shareableLink && (
              <div style={{ marginTop: '20px', color: '#D4AF37', fontSize: '0.65rem', textAlign: 'center', borderTop: '0.5px solid #333', paddingTop: '15px', width: '100%' }}>
                GIFT LINK: <span style={{ textDecoration: 'underline' }}>{shareableLink}</span>
              </div>
            )}
          </div>
        )}

        {/* CONTROLS (Sender Only) */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '2vh', display: 'flex', gap: '10px' }}>
            {[...Array(10)].map((_, i) => (
              <button key={i} onClick={() => setBgIndex(i)} style={{ width: '25px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: 'none' }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
