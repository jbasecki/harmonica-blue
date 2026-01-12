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

const QUOTES = {
  Birthday: ["May your day be filled with joy and light.", "Another year wiser, another year stronger.", "Cheers to the journey ahead."],
  Bible: ["The Lord is my shepherd. - Psalm 23", "Be strong and courageous. - Joshua 1:9", "Love is patient, love is kind. - 1 Cor 13"],
  Popular: ["Be yourself; everyone else is taken.", "In the end, we only regret the chances we didn't take.", "The best time to plant a tree was 20 years ago."]
};

export function DiscoverySanctuary({ initialData }: SanctuaryProps) {
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

  // PROPORTIONAL TILES ENGINE
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
      
      {/* FULL BACKGROUND VIDEO */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video ref={videoRef} key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* TOP HEADER */}
        <div style={{ marginTop: '5vh', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.2rem', letterSpacing: '18px', margin: 0, fontWeight: 300 }}>HARMONICA</h1>
          <button onClick={() => setShowDashboard(!showDashboard)} style={{ position: 'absolute', right: '5vw', background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', borderRadius: '50%', width: '45px', height: '45px', fontSize: '0.5rem', cursor: 'pointer' }}>{showDashboard ? 'CLOSE' : 'OPEN'}</button>
        </div>

        {/* TOP TILES & NAME AREA (RESTORED PROPORTIONS) */}
        <div style={{ marginTop: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            {getTiles(toName).map((ltr, i) => (
              <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '60px', border: '0.3px solid #D4AF37', borderRadius: '4px' }} alt="" />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: cursiveFont, fontSize: '2.5rem' }}>{toName}</span>
            <div style={{ width: '18px', height: '18px', border: '0.6px solid #D4AF37', borderRadius: '50%', fontSize: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>i</div>
          </div>
        </div>

        {/* GLASS WRITING VESSEL (RESTORED LAYOUT & FIXED MARGINS) */}
        {showDashboard && (
          <div style={{ 
            marginTop: 'auto', marginBottom: '8vh', 
            width: '88%', maxWidth: '850px', height: '580px',
            background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '40px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
            display: 'flex', flexDirection: 'column', padding: '40px', overflowY: 'auto', boxSizing: 'border-box'
          }}>
            
            {/* WRITING AREA WITH INTERNAL MARGIN FIX */}
            <textarea 
              disabled={isReceiver} value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', flex: 1, background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.8rem', fontFamily: cursiveFont, color: '#D4AF37', outline: 'none', resize: 'none', padding: '25px', boxSizing: 'border-box', lineHeight: '1.5' }} 
            />

            {/* HARMONICA TILE DISPLAY (LABELED) */}
            <div style={{ display: 'flex', gap: '15px', margin: '20px 0', flexWrap: 'wrap', justifyContent: 'center' }}>
               {text.split(' ').slice(-4).map((word, idx) => (
                 <div key={idx} style={{ display: 'flex', gap: '6px' }}>
                   {getTiles(word).map((ltr, i) => (
                     <div key={i} style={{ textAlign: 'center' }}>
                       <img src={`${bucketUrl}/${ltr}5.png`} style={{ width: '38px', border: '0.3px solid #D4AF37', borderRadius: '4px' }} alt="" />
                       <div style={{ fontSize: '0.4rem', marginTop: '4px', opacity: 0.5 }}>{ltr}</div>
                     </div>
                   ))}
                 </div>
               ))}
            </div>

            {/* DASHBOARD CONTROLS */}
            {!isReceiver && (
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                  {Object.keys(QUOTES).map(cat => (
                    <button key={cat} onClick={() => setQuoteCat(cat as any)} style={{ background: 'none', color: '#D4AF37', border: '0.5px solid #D4AF37', fontSize: '0.6rem', padding: '6px 15px', borderRadius: '5px' }}>{cat}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ width: '30%' }}>
                    <div onClick={() => setIsPlaying(!isPlaying)} style={{ background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', border: '0.5px solid #D4AF37', cursor: 'pointer', textAlign: 'center', fontSize: '0.6rem', marginBottom: '10px' }}>{isPlaying ? 'PAUSE' : '▶ PLAY'}</div>
                    <input placeholder="YouTube Link" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} style={{ background: 'transparent', border: 'none', borderBottom: '0.3px solid #D4AF37', color: '#D4AF37', fontSize: '0.5rem', width: '100%', outline: 'none' }} />
                  </div>
                  <button onClick={handleStashAndSend} style={{ background: '#D4AF37', color: '#000', padding: '15px 50px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>STASH & SEND</button>
                  <div style={{ width: '30%', textAlign: 'right' }}>
                    <input value={toName} onChange={e => setToName(e.target.value)} style={{ background: 'transparent', border: 'none', borderBottom: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.8rem', fontFamily: cursiveFont, outline: 'none', textAlign: 'right', marginBottom: '5px', width: '90%' }} />
                    <input value={fromName} onChange={e => setFromName(e.target.value)} placeholder="From:" style={{ background: 'transparent', border: 'none', borderBottom: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.8rem', fontFamily: cursiveFont, outline: 'none', textAlign: 'right', width: '90%' }} />
                  </div>
                </div>
              </div>
            )}
            
            {isReceiver && (
               <button onClick={() => window.location.href=`/?to=${fromName}&from=${toName}`} style={{ alignSelf: 'center', background: '#D4AF37', color: '#000', padding: '12px 40px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>REPLY TO {fromName.toUpperCase()}</button>
            )}

            {shareableLink && (
              <div style={{ marginTop: '20px', color: '#D4AF37', fontSize: '0.65rem', border: '0.5px solid #D4AF37', padding: '10px', borderRadius: '10px' }}>COPIABLE GIFT LINK: {shareableLink}</div>
            )}
          </div>
        )}

        {/* MANUAL BACKGROUND SELECTOR (SENDER ONLY) */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '2vh', display: 'flex', gap: '10px' }}>
            {[...Array(10)].map((_, i) => <button key={i} onClick={() => setBgIndex(i)} style={{ width: '25px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: 'none', cursor: 'pointer' }} />)}
          </div>
        )}
      </div>

      {/* VIDEO PLAYER (HIDDEN) */}
      {isPlaying && currentVideoId && <div style={{ display: 'none' }}><iframe src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`} allow="autoplay" /></div>}
    </main>
  );
}
