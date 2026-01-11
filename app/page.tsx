'use client';
import React, { useState, Suspense, useEffect, useRef } from 'react';

const BG_CREDITS = ["BBC: Savannah", "NatGeo: Ocean", "Discovery: Tundra", "BBC: Rainforest", "Alpine Peaks", "Desert Dunes", "Coral Reefs", "Redwoods", "Storm Clouds", "Serengeti"];

const QUOTES = {
  Birthday: ["May your day be filled with light.", "Another year of wisdom.", "Cheers to the journey ahead."],
  Bible: ["The Lord is my shepherd.", "Be strong and courageous.", "Love is patient, love is kind."],
  Popular: ["Quiet the mind, the soul will speak.", "Collect moments, not things.", "The sun will rise and we will try again."]
};

// 1. THIS INTERFACE DEFINITION IS WHAT FIXES THE "INITIALDATA" TYPE ERROR
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

// 2. THE COMPONENT NOW USES THE INTERFACE ABOVE TO ACCEPT DATABASE DATA
function DiscoverySanctuary({ initialData }: SanctuaryProps) {
  const [toName, setToName] = useState(initialData?.toName || 'Mark');
  const [fromName, setFromName] = useState(initialData?.fromName || 'Krystyna');
  const [text, setText] = useState(initialData?.text || 'Thank You!');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [isReceiver] = useState(initialData?.isReceiver || false);
  const [quoteCat, setQuoteCat] = useState<null | keyof typeof QUOTES>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || '');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const traditionalCursive = "'Great Vibes', cursive"; 

  useEffect(() => {
    if (isExpanded && isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [isExpanded, isPlaying]);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const currentVideoId = getYoutubeId(youtubeUrl);

  const getReceiverArt = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    const penultimate = clean.length > 2 ? clean[clean.length - 2] : clean[1] || clean[0];
    return [clean[0], penultimate];
  };

  const tiles = getReceiverArt(toName);

  const handleStashAndSend = async () => {
    const giftData = { toName, fromName, message: text, bgIndex, youtubeUrl };
    try {
      const res = await fetch('/api/stash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(giftData),
      });
      const data = await res.json();
      if (data.id) {
        const shareLink = `${window.location.origin}/gift/${data.id}`;
        alert(`Stashed! Link: ${shareLink}`);
      }
    } catch (err) {
      console.error("Stash failed", err);
    }
  };

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* CINEMATIC BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video ref={videoRef} key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }} />
      </div>

      {/* HEADER */}
      <div style={{ position: 'absolute', top: '5vh', left: '0', width: '100%', zIndex: 3, textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.4rem', letterSpacing: '18px', margin: 0, fontWeight: 300 }}>HARMONICA</h1>
      </div>

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* TILES & SIGNATURE (Centered as per image_2386ee.jpg) */}
        <div style={{ marginTop: '16vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '65px', border: '0.5px solid #D4AF37', borderRadius: '4px' }} alt="Art" />
             ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontFamily: traditionalCursive, fontSize: '1.6rem' }}>{toName}</div>
            <div title="Name translated to tiles." style={{ width: '16px', height: '16px', border: '0.6px solid #D4AF37', borderRadius: '50%', fontSize: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'help', opacity: 0.5 }}>I</div>
          </div>
          {isReceiver && <p style={{ fontSize: '0.5rem', opacity: 0.6, marginTop: '-5px' }}>from: {fromName}</p>}
        </div>

        {/* GLASS VESSEL (image_22934c.jpg) */}
        <div style={{ 
          marginTop: 'auto', marginBottom: '12vh', 
          width: '85%', maxWidth: '620px', minHeight: '340px',
          background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '50px', padding: '40px 30px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'
        }}>
          {isExpanded && currentVideoId ? (
            <div style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/9', border: '0.5px solid #D4AF37' }}>
               <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`} allow="autoplay" frameBorder="0"></iframe>
            </div>
          ) : (
            <textarea 
              disabled={isReceiver} value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', height: '60px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.2rem', fontFamily: traditionalCursive, color: '#D4AF37', outline: 'none', resize: 'none' }} 
            />
          )}

          {!isReceiver && !isExpanded && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', width: '100%' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                 {Object.keys(QUOTES).map((cat) => (
                   <button key={cat} onClick={() => setQuoteCat(cat as keyof typeof QUOTES)} style={{ background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.5rem', padding: '5px 15px', borderRadius: '4px' }}>{cat}</button>
                 ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '6px' }}>
                {[...Array(10)].map((_, i) => (
                  <button key={i} onClick={() => setBgIndex(i)} style={{ width: '22px', height: '20px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.4px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.5rem' }}>{i + 1}</button>
                ))}
              </div>
              <button onClick={handleStashAndSend} style={{ background: '#D4AF37', color: '#000', padding: '12px 60px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.7rem', border: 'none', cursor: 'pointer' }}>STASH & SEND</button>
            </div>
          )}

          {isExpanded && (
             <button onClick={() => { setIsExpanded(false); setIsPlaying(false); }} style={{ marginTop: '15px', background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.5rem', padding: '5px 20px', borderRadius: '20px' }}>RETURN TO MESSAGE</button>
          )}
        </div>

        {/* FOOTER PLAYER (image_22934c.jpg) */}
        <div style={{ position: 'absolute', bottom: '4vh', left: '6vw', right: '6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={() => { if(currentVideoId) setIsPlaying(!isPlaying); }} style={{ flex: 2, background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '10px', border: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.6rem' }}>
                   {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                </button>
                <button onClick={() => setIsExpanded(!isExpanded)} style={{ flex: 1, background: 'rgba(0,0,0,0.5)', borderRadius: '10px', border: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.4rem' }}>
                   {isExpanded ? 'CLOSE' : 'VIDEO'}
                </button>
            </div>
            {!isReceiver && (
              <input placeholder="YouTube Link" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.4rem', borderBottom: '0.3px solid #D4AF37', outline: 'none' }} />
            )}
          </div>
          {!isReceiver && (
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <input value={fromName} onChange={(e) => setFromName(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.8rem', textAlign: 'right' }} />
              <input value={toName} onChange={(e) => setToName(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.8rem', textAlign: 'right' }} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// 3. FINAL EXPORT WITH SUSPENSE FOR VERCEL STABILITY
export default function Home() { return <Suspense fallback={null}><DiscoverySanctuary /></Suspense> }
