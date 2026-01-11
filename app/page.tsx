'use client';
import React, { useState, Suspense, useEffect, useRef } from 'react';

const BG_CREDITS = ["BBC: Savannah", "NatGeo: Ocean", "Discovery: Tundra", "BBC: Rainforest", "Alpine Peaks", "Desert Dunes", "Coral Reefs", "Redwoods", "Storm Clouds", "Serengeti"];

function DiscoverySanctuary() {
  const [toName, setToName] = useState('Mark');
  const [fromName, setFromName] = useState('Krystyna');
  const [text, setText] = useState('Thank You!');
  const [bgIndex, setBgIndex] = useState(0);
  const [isReceiver, setIsReceiver] = useState(false);
  
  // PLAYER & EXPANSION LOGIC
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null); // Ref for Nature Background
  const audioRef = useRef<HTMLAudioElement>(null); // Ref for Piano MP3

  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const traditionalCursive = "'Great Vibes', cursive"; 

  // SYNC LOGIC: Pause Backgrounds when Video Plays
  useEffect(() => {
    if (isExpanded && isPlaying) {
      videoRef.current?.pause(); // Stop nature visual
      if (audioRef.current) audioRef.current.pause(); // Stop piano audio
    } else {
      videoRef.current?.play(); // Resume nature visual
      if (!isPlaying && audioRef.current) audioRef.current.play(); // Resume piano if no YouTube
    }
  }, [isExpanded, isPlaying]);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const currentVideoId = getYoutubeId(youtubeUrl);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* BACKGROUND PIANO MP3 - Paste your link in src */}
      <audio ref={audioRef} loop src={`${bucketUrl}/your-piano-track.mp3`} />

      {/* 1. CINEMATIC BACKGROUND - Controlled by videoRef */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video 
          ref={videoRef}
          key={bgIndex} 
          autoPlay 
          muted 
          loop 
          playsInline 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} 
          src={`${bucketUrl}/${bgIndex + 1}.mp4`} 
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }} />
      </div>

      {/* 2. HEADER */}
      <div style={{ position: 'absolute', top: '5vh', left: '0', width: '100%', zIndex: 3, textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.4rem', letterSpacing: '18px', margin: 0, fontWeight: 300, color: '#D4AF37' }}>HARMONICA</h1>
      </div>

      {/* 3. SIGNATURE AREA */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginTop: '16vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
             {/* Art Tiles Logic Here */}
          </div>
          <div style={{ fontFamily: traditionalCursive, fontSize: '1.6rem', color: '#D4AF37' }}>{toName}</div>
          {isReceiver && <p style={{ fontSize: '0.5rem', opacity: 0.6, marginTop: '-5px' }}>from: {fromName}</p>}
        </div>

        {/* 4. THE GLASS VESSEL */}
        <div style={{ 
          marginTop: 'auto', marginBottom: '12vh', 
          width: '85%', maxWidth: '620px', minHeight: '340px',
          background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '50px', padding: '40px 30px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          {isExpanded && currentVideoId ? (
            <div style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/9', border: '0.5px solid #D4AF37' }}>
               <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`} allow="autoplay" frameBorder="0"></iframe>
            </div>
          ) : (
            <textarea 
              disabled={isReceiver} value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', height: '100px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.2rem', fontFamily: traditionalCursive, color: '#D4AF37', outline: 'none', resize: 'none' }} 
            />
          )}

          {isExpanded && (
             <button onClick={() => { setIsExpanded(false); setIsPlaying(false); }} style={{ marginTop: '15px', background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.5rem', padding: '5px 20px', borderRadius: '20px' }}>RETURN TO MESSAGE</button>
          )}
        </div>

        {/* 5. FOOTER PLAYER */}
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
          </div>
          {/* Sender/Receiver labels in footer */}
          <div style={{ textAlign: 'right', fontSize: '0.7rem', opacity: 0.8 }}>
             <p>{fromName}</p>
             <p>{toName}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense fallback={null}><DiscoverySanctuary /></Suspense> }
