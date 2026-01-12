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
  const [toName, setToName] = useState(initialData?.toName || 'Mark');
  const [fromName, setFromName] = useState(initialData?.fromName || '');
  const [text, setText] = useState(initialData?.text || 'create your content and transform it into a harmonica of tiles (when ready)');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [isReceiver] = useState(!!initialData);
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || '');
  
  const [showDashboard, setShowDashboard] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const cursiveFont = "'Great Vibes', cursive";

  // LOGIC FOR LABELED HARMONICA TILES
  const getTilesForWord = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return [];
    return [clean[0], clean[clean.length - 1]]; 
  };

  const handleStashAndSend = async () => {
    setIsSaving(true);
    // This sends the data to your 'vibe' table in Postgres
    const giftId = Math.random().toString(36).substring(2, 10);
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
        
        {/* GLASS VESSEL WITH MARGINS & SCROLL */}
        {showDashboard && (
          <div style={{ 
            marginTop: '20vh', marginBottom: '10vh', 
            width: '85%', maxWidth: '850px', height: '500px',
            background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(25px)', WebkitBackdropFilter: 'blur(25px)',
            borderRadius: '40px', padding: '40px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            overflowY: 'auto', scrollbarWidth: 'thin'
          }}>
            
            {/* VIDEO PLAYER (NOW VISIBLE) */}
            {isPlaying && currentVideoId && (
              <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '20px', borderRadius: '20px', overflow: 'hidden', border: '0.5px solid #D4AF37' }}>
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`} allow="autoplay" frameBorder="0" />
              </div>
            )}

            {/* WRITING AREA WITH INTERNAL MARGINS */}
            <textarea 
              disabled={isReceiver}
              value={text} 
              onChange={(e) => setText(e.target.value)}
              style={{ 
                width: '100%', flex: 1, background: 'transparent', border: 'none', 
                textAlign: 'center', fontSize: '1.6rem', fontFamily: cursiveFont, 
                color: '#D4AF37', outline: 'none', resize: 'none', padding: '20px' // MARGINS ADDED HERE
              }} 
            />

            {/* LABELED HARMONICA TILES */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
               {text.split(' ').slice(-3).map((word, idx) => (
                 <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                   {getTilesForWord(word).map((ltr, i) => (
                     <div key={i} style={{ textAlign: 'center' }}>
                       <img src={`${bucketUrl}/${ltr}5.png`} style={{ width: '45px', border: '0.3px solid #D4AF37', borderRadius: '4px' }} alt="" />
                       <div style={{ fontSize: '0.5rem', marginTop: '4px', opacity: 0.6 }}>{ltr}</div>
                     </div>
                   ))}
                 </div>
               ))}
            </div>

            {shareableLink && (
              <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(212, 175, 55, 0.1)', border: '0.5px solid #D4AF37', borderRadius: '10px', fontSize: '0.7rem' }}>
                GIFT READY: {shareableLink}
              </div>
            )}
            
            <button onClick={handleStashAndSend} style={{ marginTop: '25px', background: '#D4AF37', color: '#000', padding: '15px 60px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px' }}>
              {isSaving ? 'STASHING...' : 'STASH & SEND'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
