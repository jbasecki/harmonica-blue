'use client';
import React, { useState, useRef, useEffect } from 'react';

const QUOTES = {
  Birthday: ["May your day be filled with joy and light.", "Another year wiser, another year stronger.", "Cheers to the beautiful journey ahead."],
  Bible: ["The Lord is my shepherd. - Psalm 23", "Be strong and courageous. - Joshua 1:9", "Love is patient, love is kind. - 1 Cor 13"],
  Popular: ["Be yourself; everyone else is taken.", "In the end, we only regret the chances we didn't take.", "The best time to plant a tree was 20 years ago."]
};

export interface SanctuaryProps {
  initialData?: { toName: string; fromName: string; text: string; bgIndex: number; youtubeUrl: string; };
}

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

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && youtubeUrl) videoRef.current.pause();
      else videoRef.current.play();
    }
  }, [isPlaying, youtubeUrl]);

  const getTilesForWord = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length < 1) return [];
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
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video ref={videoRef} key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isPlaying ? 0.3 : 0.7 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginTop: '5vh', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.2rem', letterSpacing: '18px', margin: 0, fontWeight: 300 }}>HARMONICA</h1>
          <button onClick={() => setShowDashboard(!showDashboard)} style={{ position: 'absolute', right: '5vw', background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', borderRadius: '50%', width: '45px', height: '45px', fontSize: '0.5rem', cursor: 'pointer' }}>{showDashboard ? 'CLOSE' : 'OPEN'}</button>
        </div>

        {/* RESTORED TOP NAMES & TILES */}
        <div style={{ marginTop: '10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: cursiveFont, fontSize: '2.5rem' }}>{toName}</span>
            <div title="Visual name form" style={{ width: '18px', height: '18px', border: '0.6px solid #D4AF37', borderRadius: '50%', fontSize: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'help' }}>i</div>
          </div>
          {isReceiver && <p style={{ fontSize: '0.6rem', opacity: 0.6, letterSpacing: '4px' }}>GIFT FROM {fromName.toUpperCase()}</p>}
        </div>

        {/* GLASS VESSEL WITH SCROLLBAR */}
        {showDashboard && (
          <div style={{ 
            marginTop: 'auto', marginBottom: '8vh', 
            width: '90%', maxWidth: '850px', height: '580px',
            background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '40px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', 
            overflowY: 'auto', scrollbarWidth: 'thin' // ADDED SCROLLBAR
          }}>
            
            <textarea 
              disabled={isReceiver} value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', flex: 1, background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.8rem', fontFamily: cursiveFont, color: '#D4AF37', outline: 'none', resize: 'none', padding: '25px', boxSizing: 'border-box' }} 
            />

            {/* HARMONICA DISPLAY WITH GOLD LABELS */}
            <div style={{ display: 'flex', gap: '15px', margin: '20px 0', flexWrap: 'wrap', justifyContent: 'center' }}>
               {text.split(' ').slice(-4).map((word, idx) => (
                 <div key={idx} style={{ display: 'flex', gap: '6px' }}>
                   {getTilesForWord(word).map((ltr, i) => (
                     <div key={i} style={{ textAlign: 'center' }}>
                       <img src={`${bucketUrl}/${ltr}5.png`} style={{ width: '38px', border: '0.3px solid #D4AF37', borderRadius: '4px' }} alt="" />
                       <div style={{ fontSize: '0.4rem', marginTop: '4px', opacity: 0.5, fontWeight: 'bold' }}>{ltr}</div>
                     </div>
                   ))}
                 </div>
               ))}
            </div>

            {!isReceiver && (
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px' }}>
                  {Object.keys(QUOTES).map(cat => (
                    <button key={cat} onClick={() => setQuoteCat(cat as any)} style={{ background: quoteCat === cat ? '#D4AF37' : 'none', color: quoteCat === cat ? '#000' : '#D4AF37', border: '0.5px solid #D4AF37', fontSize: '0.6rem', padding: '5px 15px', borderRadius: '5px' }}>{cat}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ width: '30%' }}>
                    <div onClick={() => setIsPlaying(!isPlaying)} style={{ background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', border: '0.5px solid #D4AF37', cursor: 'pointer', textAlign: 'center', marginBottom: '10px', fontSize: '0.6rem' }}>{isPlaying ? 'PAUSE' : '▶ PLAY'}</div>
                    <input placeholder="YouTube Link" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} style={{ background: 'transparent', border: 'none', borderBottom: '0.3px solid #D4AF37', color: '#D4AF37', fontSize: '0.5rem', width: '100%', outline: 'none' }} />
                  </div>
                  <button onClick={handleStashAndSend} style={{ background: '#D4AF37', color: '#000', padding: '15px 50px', borderRadius: '30px', fontWeight: 'bold', border: 'none', fontSize: '0.7rem' }}>{isSaving ? 'SAVING...' : 'STASH & SEND'}</button>
                  <div style={{ width: '30%', textAlign: 'right' }}>
                    <input value={toName} onChange={e => setToName(e.target.value)} style={{ background: 'transparent', border: 'none', borderBottom: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.8rem', fontFamily: cursiveFont, width: '80%', outline: 'none', textAlign: 'right', marginBottom: '5px' }} />
                    <input value={fromName} onChange={e => setFromName(e.target.value)} placeholder="From:" style={{ background: 'transparent', border: 'none', borderBottom: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.8rem', fontFamily: cursiveFont, width: '80%', outline: 'none', textAlign: 'right' }} />
                  </div>
                </div>
              </div>
            )}
            
            {isReceiver && (
               <button onClick={() => window.location.href=`/?to=${encodeURIComponent(fromName)}&from=${encodeURIComponent(toName)}`} style={{ background: '#D4AF37', color: '#000', padding: '12px 40px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>REPLY TO {fromName.toUpperCase()}</button>
            )}

            {shareableLink && (
              <div style={{ marginTop: '20px', color: '#D4AF37', fontSize: '0.65rem', border: '0.5px solid #D4AF37', padding: '10px', borderRadius: '10px' }}>COPIABLE GIFT LINK: {shareableLink}</div>
            )}
          </div>
        )}

        {/* RESTORED MANUAL BG SELECTOR */}
        {!isReceiver && (
          <div style={{ position: 'absolute', bottom: '2vh', display: 'flex', gap: '10px' }}>
            {[...Array(10)].map((_, i) => <button key={i} onClick={() => setBgIndex(i)} style={{ width: '25px', height: '2px', background: bgIndex === i ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)', border: 'none', cursor: 'pointer' }} />)}
          </div>
        )}
      </div>

      {isPlaying && currentVideoId && <div style={{ display: 'none' }}><iframe src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`} allow="autoplay" /></div>}
    </main>
  );
}
