'use client';
import React, { useState, Suspense, useEffect, useRef } from 'react';

const BG_CREDITS = ["BBC: Savannah", "NatGeo: Ocean", "Discovery: Tundra", "BBC: Rainforest", "Alpine Peaks", "Desert Dunes", "Coral Reefs", "Redwoods", "Storm Clouds", "Serengeti"];

const QUOTES = {
  Birthday: ["May your day be filled with light.", "Another year of wisdom.", "Cheers to the journey ahead."],
  Bible: ["The Lord is my shepherd.", "Be strong and courageous.", "Love is patient, love is kind."],
  Popular: ["Quiet the mind, the soul will speak.", "Collect moments, not things.", "The sun will rise and we will try again."]
};

function DiscoverySanctuary() {
  const [toName, setToName] = useState('Mark');
  const [fromName, setFromName] = useState('Krystyna');
  const [text, setText] = useState('Thank You!');
  const [bgIndex, setBgIndex] = useState(0);
  const [isReceiver, setIsReceiver] = useState(false);
  const [quoteCat, setQuoteCat] = useState<null | keyof typeof QUOTES>(null);
  
  // PLAYER & EXPANSION LOGIC
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // New state for video view
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const traditionalCursive = "'Great Vibes', cursive"; 

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const tiles = getReceiverArt(toName);
  const currentVideoId = getYoutubeId(youtubeUrl);

  // Helper for tiles
  function getReceiverArt(name: string) {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    const penultimate = clean.length > 2 ? clean[clean.length - 2] : clean[1] || clean[0];
    return [clean[0], penultimate];
  }

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }} />
      </div>

      {/* 2. HEADER */}
      <div style={{ position: 'absolute', top: '5vh', left: '0', width: '100%', zIndex: 3, textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.4rem', letterSpacing: '18px', margin: 0, fontWeight: 300, color: '#D4AF37' }}>HARMONICA</h1>
      </div>
      
      <div onClick={() => setIsReceiver(!isReceiver)} style={{ position: 'absolute', top: '5vh', right: '6vw', zIndex: 10, cursor: 'pointer', textAlign: 'right' }}>
        <p style={{ fontSize: '0.45rem', letterSpacing: '2px', opacity: 0.9 }}>{isReceiver ? 'REPLY' : 'CLOSE'}</p>
        <p style={{ fontSize: '0.35rem', fontStyle: 'italic', opacity: 0.4 }}>{BG_CREDITS[bgIndex]}</p>
      </div>

      {/* 3. CENTER COLUMN ENGINE */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* SIGNATURE: Tiles centered, [I] by name */}
        <div style={{ marginTop: '16vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
             {tiles.map((ltr, i) => (
               <img key={i} src={`${bucketUrl}/${ltr}5.png`} style={{ width: '65px', border: '0.5px solid #D4AF37', borderRadius: '4px' }} alt="Art" />
             ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontFamily: traditionalCursive, fontSize: '1.6rem', color: '#D4AF37' }}>{toName}</div>
            <div title="Translated into abstract tiles." style={{ width: '16px', height: '16px', border: '0.6px solid #D4AF37', borderRadius: '50%', fontSize: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'help', opacity: 0.5 }}>I</div>
          </div>
          {isReceiver && fromName && <p style={{ fontSize: '0.5rem', opacity: 0.6, marginTop: '-5px' }}>from: {fromName}</p>}
        </div>

        {/* 4. THE GLASS VESSEL - Now handles Expansion */}
        <div style={{ 
          marginTop: 'auto', marginBottom: '12vh', 
          width: '85%', maxWidth: '620px', minHeight: '340px',
          background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '50px', padding: '40px 30px', border: '0.6px solid rgba(212, 175, 55, 0.25)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          
          {isExpanded && currentVideoId ? (
            /* EXPANDED VIDEO VIEW */
            <div style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/9', border: '0.5px solid #D4AF37' }}>
               <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`} allow="autoplay" frameBorder="0"></iframe>
            </div>
          ) : (
            /* DEFAULT CURSIVE TEXT VIEW */
            <textarea 
              disabled={isReceiver} value={text} onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', height: '100px', background: 'transparent', border: 'none', textAlign: 'center', fontSize: '1.2rem', fontFamily: traditionalCursive, color: '#D4AF37', outline: 'none', resize: 'none' }} 
            />
          )}

          {!isReceiver && !isExpanded && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', width: '100%', marginTop: '20px' }}>
               {/* Selection Tables anchored at bottom */}
               <div style={{ display: 'flex', gap: '10px' }}>
                 {Object.keys(QUOTES).map((cat) => (
                   <button key={cat} onClick={() => setQuoteCat(cat as keyof typeof QUOTES)} style={{ background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.5rem', padding: '5px 15px', borderRadius: '4px' }}>{cat}</button>
                 ))}
                 <button onClick={() => setText('')} style={{ background: 'none', border: '0.5px solid #666', color: '#D4AF37', fontSize: '0.5rem', padding: '5px 15px', borderRadius: '4px' }}>Clear</button>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '6px' }}>
                {[...Array(10)].map((_, i) => (
                  <button key={i} onClick={() => setBgIndex(i)} style={{ width: '22px', height: '20px', background: bgIndex === i ? '#D4AF37' : 'none', border: '0.4px solid #D4AF37', color: bgIndex === i ? '#000' : '#D4AF37', fontSize: '0.5rem' }}>{i + 1}</button>
                ))}
              </div>
              <button style={{ background: '#D4AF37', color: '#000', padding: '12px 60px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.7rem', border: 'none' }}>STASH & SEND</button>
            </div>
          )}

          {isExpanded && (
             <button onClick={() => setIsExpanded(false)} style={{ marginTop: '15px', background: 'none', border: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.5rem', padding: '5px 20px', borderRadius: '20px' }}>RETURN TO MESSAGE</button>
          )}
        </div>

        {/* 5. FOOTER PLAYER */}
        <div style={{ position: 'absolute', bottom: '4vh', left: '6vw', right: '6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
                <button 
                  onClick={() => { if(currentVideoId) setIsPlaying(!isPlaying); }}
                  style={{ flex: 2, background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '10px', border: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.6rem' }}
                >
                   {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                </button>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  style={{ flex: 1, background: 'rgba(0,0,0,0.5)', borderRadius: '10px', border: '0.5px solid #D4AF37', color: '#D4AF37', fontSize: '0.4rem' }}
                >
                   {isExpanded ? 'CLOSE' : 'VIDEO'}
                </button>
            </div>
            {!isReceiver && (
              <input placeholder="YouTube Link" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.4rem', borderBottom: '0.3px solid #D4AF37', outline: 'none' }} />
            )}
          </div>
          
          {/* SENDER/RECEIVER INPUTS */}
          {!isReceiver && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.4rem', opacity: 0.4 }}>FROM:</span>
                <input value={fromName} onChange={(e) => setFromName(e.target.value)} style={{ width: '80px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.8rem', textAlign: 'right', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.4rem', opacity: 0.4 }}>TO:</span>
                <input value={toName} onChange={(e) => setToName(e.target.value)} style={{ width: '80px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '0.8rem', textAlign: 'right', outline: 'none' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Home() { return <Suspense fallback={null}><DiscoverySanctuary /></Suspense> }
