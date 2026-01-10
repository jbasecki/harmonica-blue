'use client';
import React, { useState, Suspense } from 'react';

// 1. DUAL FONTS: Formal vs. Modern
const CURSIVE_OPTIONS = [
  "'Dancing Script', cursive", // Formal
  "'Great Vibes', cursive"      // Modern
];

const BG_CREDITS = [
  "BBC: African Savannah", "National Geographic: Deep Ocean", "Discovery: Arctic Tundra",
  "BBC: Amazon Rainforest", "Author: Alpine Peaks", "Discovery: Desert Dunes",
  "National Geographic: Coral Reefs", "BBC: Redwoods", "Author: Storm Clouds",
  "Discovery: Serengeti", "National Geographic: Galaxy", "Author: Misty Forest",
  "BBC: Great Barrier Reef", "Discovery: Volcanic Flow", "Author: Night Sky",
  "National Geographic: Tundra", "BBC: Waterfall", "Discovery: Coastal Cliffs",
  "Author: Wild Grasslands"
];

function DiscoverySanctuary() {
  const [toName, setToName] = useState('');
  const [bgIndex, setBgIndex] = useState(13); // Button 14
  const [fontChoice, setFontChoice] = useState(0); // Toggles between fonts
  
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // ALPHABET LOGIC: First and Penultimate
  const getReceiverArt = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B']; 
    if (clean.length === 1) return [clean[0], clean[0]];
    const penultimate = clean.length > 2 ? clean[clean.length - 2] : clean[1];
    return [clean[0], penultimate];
  };

  const tiles = getReceiverArt(toName);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* BACKGROUND: Matches your actual bucket filenames */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video 
          key={bgIndex} autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
          src={`${bucketUrl}/${bgIndex + 1}.mp4`} // Fetching "14.mp4"
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85))' }} />
      </div>

      {/* GALLERY FRAME
