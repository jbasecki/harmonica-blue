'use client';
import React, { useState, Suspense, useEffect, useRef } from 'react';

const BG_CREDITS = ["BBC: Savannah", "NatGeo: Ocean", "Discovery: Tundra", "BBC: Rainforest", "Alpine Peaks", "Desert Dunes", "Coral Reefs", "Redwoods", "Storm Clouds", "Serengeti"];

const QUOTES = {
  Birthday: ["May your day be filled with light.", "Another year of wisdom.", "Cheers to the journey ahead."],
  Bible: ["The Lord is my shepherd.", "Be strong and courageous.", "Love is patient, love is kind."],
  Popular: ["Quiet the mind, the soul will speak.", "Collect moments, not things.", "The sun will rise and we will try again."]
};

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
        
        {/* TILES & SIGNATURE */}
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
          {isReceiver && <p style={{ fontSize: '0.5rem', opacity: 0.6, marginTop: '-5px' }}>from: {fromName}</p
