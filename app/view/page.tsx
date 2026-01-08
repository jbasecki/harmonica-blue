'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ViewContent() {
  const searchParams = useSearchParams();
  
  // Data from the URL
  const ytId = searchParams.get('v') || 'ko70cExuzZM'; 
  const msg = searchParams.get('m') || 'Thinking of you.';
  const artist = searchParams.get('a') || 'Unknown Artist';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // The "5-for-1" Credit Logic
  const credits = parseInt(searchParams.get('credits') || '0');
  const nextCredits = credits > 0 ? credits - 1 : 0;

  // Logic to generate the same abstracts the sender saw
  const getAbstracts = (input: string) => {
    const clean = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B'];
    const first = clean[0];
    const penult = clean.length > 1 ? clean[clean.length - 2] : first;
    return [first, penult];
  };

  const abstracts = getAbstracts(msg);

  return (
    <main style={{ display: 'flex', height: '100vh', background: '#000', color: '#D4AF37', fontFamily: 'serif' }}>
      
      {/* LEFT: CINEMATIC SPACE */}
      <div style={{ flex: 1.5, position: 'relative', borderRight: '1px solid #333' }}>
        <iframe 
          width="100%" height="100%" 
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&controls=0&mute=0&loop=1&playlist=${ytId}`} 
          frameBorder="0" allow="autoplay" 
        />
        <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.7)', padding: '10px', fontSize: '0.8rem', textAlign: 'center' }}>
          HARMONICA BLUE | CINEMATIC SANCTUARY
        </div>
      </div>

      {/* RIGHT: MESSAGE CONSOLE */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* TOP: ARTIST PROMOTION */}
        <div style={{ textAlign: 'right', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '10px' }}>
          <p style={{ fontSize: '0.7rem', margin: 0 }}>artist / promotion</p>
          <p style={{ fontWeight: 'bold' }}>{artist.toUpperCase()}</p>
        </div>

        {/* MIDDLE: THE STASHED COGNITION */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30
