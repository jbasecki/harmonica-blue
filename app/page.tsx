'use client';
import React, { useState, Suspense, useMemo } from 'react';

// Make sure to add this to your globals.css or layout:
// @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

const BG_CREDITS = ["African Savannah", "Deep Ocean", "Arctic Tundra", "Amazon Rainforest", "Alpine Peaks", "Desert Dunes", "Coral Reefs", "Redwoods", "Storm Clouds", "Serengeti"];

const QUOTES = {
  Birthday: ["May your day be filled with light.", "Another year of wisdom.", "Cheers to the journey ahead."],
  Bible: ["The Lord is my shepherd.", "Be strong and courageous.", "Love is patient, love is kind."],
  Popular: ["Quiet the mind, the soul will speak.", "Collect moments, not things.", "The sun will rise and we will try again."]
};

function DiscoverySanctuary() {
  const [toName, setToName] = useState('Mark');
  const [text, setText] = useState('Be strong and courageous.');
  const [bgIndex, setBgIndex] = useState(0);
  const [isReceiver, setIsReceiver] = useState(false);
  const [quoteCat, setQuoteCat] = useState<null | keyof typeof QUOTES>(null);

  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const traditionalCursive = "'Great Vibes', cursive";

  // useMemo prevents "jumping" by only recalculating art when the name changes
  const tiles = useMemo(() => {
    const clean = toName.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    const penultimate = clean.length > 2 ? clean[clean.length - 2] : clean[1] || clean[0];
    return [clean[0], penultimate];
  }, [toName]);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* 1. BACKGROUND VIDEO */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video key={bgIndex} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} src={`${bucketUrl}/${bgIndex + 1}.mp4`} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4))' }} />
      </div>

      {/* 2. LOGO */}
      <div style={{ position: 'absolute', top: '3vh', left: '0', width: '100%', zIndex: 3, textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.1
