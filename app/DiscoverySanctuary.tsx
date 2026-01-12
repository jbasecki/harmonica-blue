'use client';
import React, { useState, useRef } from 'react';

interface SanctuaryProps {
  initialData?: {
    toName: string;
    fromName: string;
    text: string;
    bgIndex: number;
    youtubeUrl: string;
  };
}

// Quotes structure - you can replace this with a fetch from your bucket
const QUOTES = {
  Birthday: [
    "May your day be filled with joy and light.",
    "Another year wiser, another year stronger. Happy Birthday!",
    "Cheers to the beautiful journey ahead of you.",
    "Wishing you a day as special as you are.",
    "May this year bring you closer to your dreams."
  ],
  Bible: [
    "The Lord is my shepherd; I shall not want. - Psalm 23:1",
    "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go. - Joshua 1:9",
    "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. - 1 Corinthians 13:4",
    "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11",
    "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5"
  ],
  Popular: [
    "Be yourself; everyone else is already taken. - Oscar Wilde",
    "In the end, we only regret the chances we didn't take.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Happiness is not something ready made. It comes from your own actions. - Dalai Lama",
    "Life is what happens when you're busy making other plans. - John Lennon"
  ]
};

export function DiscoverySanctuary({ initialData }: SanctuaryProps) {
  // Core state
  const [toName, setToName] = useState(initialData?.toName || 'Mark');
  const [fromName, setFromName] = useState(initialData?.fromName || '');
  const [text, setText] = useState(initialData?.text || 'create your content here and if desired transform your words into harmonica of tiles (by clicking)');
  const [bgIndex, setBgIndex] = useState(initialData?.bgIndex ?? 0);
  const [isReceiver] = useState(!!initialData);
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || '');
  
  // UI state
  const [showDashboard, setShowDashboard] = useState(true);
  const [quoteCat, setQuoteCat] = useState<null | keyof typeof QUOTES>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const cursiveFont = "'Great Vibes', cursive";

  // Get tiles for a word: first letter + second-to-last letter
  const getTilesForWord = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return [];
    if (clean.length === 1) return [clean[0]];
    const firstLetter = clean[0];
    const secondToLast = clean[clean.length - 2];
    return [firstLetter, secondToLast];
  };

  // Get tiles for the receiver's name (shown at top)
  const getNameTiles = (name: string) => {
    const clean = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (clean.length === 0) return ['H', 'B'];
    if (clean.length === 1) return [clean[0], clean[0]];
    return [clean[0], clean[clean.length - 2] || clean[0]];
  };

  // Toggle word selection for tile display
  const toggleWordSelection = (word: string) => {
    if (isReceiver) return; // Can't select in receiver mode
    
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  // Extract YouTube ID
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Generate unique ID for gift
  const generateGiftId = () => {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  };

  // Handle STASH & SEND
  const handleStashAndSend = async () => {
    if (!toName.trim() || !fromName.trim() || !text.trim()) {
      alert('Please fill in all fields: TO, FROM, and your message!');
      return;
    }

    setIsSaving(true);

    try {
      const giftId = generateGiftId();
      
      const response = await fetch('/api/save-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: giftId,
          toName,
          fromName,
          message: text,
          bgIndex,
          youtubeUrl,
        }),
      });

      if (!response.ok) throw new Error('Failed to save gift');

      const link = `${window.location.origin}/gift/${giftId}`;
      setShareableLink(link);
      setShowSuccess(true);

    } catch (error) {
      console.error('Error saving gift:', error);
      alert('Oops! Something went wrong. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    alert('Link copied! Share it with your recipient 🎁');
  };

  // Insert selected quote into message
  const selectQuote = (quote: string) => {
    setText(quote);
    setQuoteCat(null);
  };

  const nameTiles = getNameTiles(toName);
  const currentVideoId = getYoutubeId(youtubeUrl);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', color: '#D4AF37', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Video */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <video 
          ref={videoRef} 
          key={bgIndex} 
          autoPlay 
          muted={!isPlaying} 
          loop 
          playsInline 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} 
          src={`${bucketUrl}/${bgIndex + 1}.mp4`} 
        />
      </div>

      {/* Header */}
      <div style={{ position: 'absolute', top: '5vh', left: '0', width: '100%', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.2rem', letterSpacing: '18px', margin: 0, fontWeight: 300 }}>HARMONICA</h1>
        <button 
          onClick={() => setShowDashboard(!showDashboard)} 
          style={{ 
            position: 'absolute', 
            right: '5vw', 
            background: 'none', 
            border: '0.5px solid #D4AF37', 
            color: '#D4AF37', 
            borderRadius: '50%', 
            width: '45px', 
            height: '45px', 
            fontSize: '0.5rem', 
            cursor: 'pointer' 
          }}
        >
          CLOSE
        </button>
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Receiver Name & Tiles at Top */}
        <div style={{ marginTop: '16vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          {/* Name Tiles */}
          <div style={{ display: 'flex', gap: '15px' }}>
            {nameTiles.map((letter, i) => (
              <img 
                key={i} 
                src={`${bucketUrl}/${letter}5.png`} 
                style={{ width: '65px', border: '0.5px solid #D4AF37', borderRadius: '4px' }} 
                alt=""
              />
            ))}
          </div>
          
          {/* Name with Info Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontFamily: cursiveFont, fontSize: '2rem', color: '#D4AF37' }}>
              {toName}
            </div>
            <div 
              title="Your name is shown in an abstract visual form of tiles"
              style={{ 
                width: '18px', 
                height: '18px', 
                border: '0.6px solid #D4AF37', 
                borderRadius: '50%', 
                fontSize: '0.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'help', 
                opacity: 0.6 
              }}
            >
              i
            </div>
          </div>
          
          {/* From Name (receiver mode only) */}
          {isReceiver && fromName && (
            <div style={{ fontFamily: cursiveFont, fontSize: '1.2rem', color: '#D4AF37', opacity: 0.7, marginTop: '5px' }}>
              from {fromName}
            </div>
          )}
        </div>

        {/* Selected Words as Tiles */}
        {selectedWords.length > 0 && (
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {selectedWords.map((word, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '4px' }}>
                {getTilesForWord(word).map((letter, i) => (
                  <img 
                    key={i} 
                    src={`${bucketUrl}/${letter}5.png`} 
                    style={{ width: '45px', border: '0.5px solid #D4AF37', borderRadius: '3px' }} 
                    alt=""
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Glass Vessel */}
        {showDashboard && (
          <div style={{ 
            marginTop: 'auto', 
            marginBottom: '12vh', 
            width: '85%', 
            maxWidth: '900px', 
            minHeight: '400px',
            background: 'rgba(255, 255, 255, 0.08)', 
            backdropFilter: 'blur(20px)', 
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '50px', 
            padding: '40px 30px', 
            border: '0.6px solid rgba(212, 175, 55, 0.25)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            
            {/* Success Screen */}
            {showSuccess ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%' }}>
                <div style={{ fontSize: '1.5rem', fontFamily: cursiveFont, color: '#D4AF37' }}>
                  ✨ Gift Created! ✨
                </div>
                <div style={{ 
                  background: 'rgba(0,0,0,0.5)', 
                  padding: '20px', 
                  borderRadius: '15px', 
                  border: '0.5px solid #D4AF37',
                  width: '90%'
                }}>
                  <p style={{ fontSize: '0.6rem', opacity: 0.7, margin: '0 0 10px 0' }}>Share this link:</p>
                  <p style={{ fontSize: '0.7rem', color: '#D4AF37', wordBreak: 'break-all', margin: '0 0 15px 0' }}>
                    {shareableLink}
                  </p>
                  <button 
                    onClick={copyToClipboard}
                    style={{ 
                      background: '#D4AF37', 
                      color: '#000', 
                      padding: '12px 40px', 
                      borderRadius: '25px', 
                      fontSize: '0.7rem', 
                      border: 'none', 
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      letterSpacing: '1px'
                    }}
                  >
                    COPY LINK
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Message Area with Clickable Words */}
                <div style={{ width: '100%', textAlign: 'center' }}>
                  {text.split(' ').map((word, idx) => (
                    <span
                      key={idx}
                      onClick={() => toggleWordSelection(word)}
                      style={{ 
                        fontSize: '1.3rem', 
                        fontFamily: cursiveFont, 
                        color: selectedWords.includes(word) ? '#FFD700' : '#D4AF37',
                        cursor: isReceiver ? 'default' : 'pointer',
                        textDecoration: selectedWords.includes(word) ? 'underline' : 'none',
                        margin: '0 5px'
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>

                {/* Dashboard - Only in Sender Mode */}
                {!isReceiver && (
                  <div style={{ width: '100%', marginTop: '30px' }}>
                    
                    {/* Quote Categories */}
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px' }}>
                      {Object.keys(QUOTES).map((cat) => (
                        <button 
                          key={cat} 
                          onClick={() => setQuoteCat(quoteCat === cat ? null : cat as keyof typeof QUOTES)} 
                          style={{ 
                            background: quoteCat === cat ? '#D4AF37' : 'none', 
                            border: '0.5px solid #D4AF37', 
                            color: quoteCat === cat ? '#000' : '#D4AF37', 
                            fontSize: '0.6rem', 
                            padding: '8px 20px', 
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                      <button 
                        onClick={() => setText('')} 
                        style={{ 
                          background: 'none', 
                          border: '0.5px solid #666', 
                          color: '#D4AF37', 
                          fontSize: '0.6rem', 
                          padding: '8px 20px', 
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Clear
                      </button>
                    </div>

                    {/* Quote Selection */}
                    {quoteCat && (
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '15px' }}>
                        {QUOTES[quoteCat].map((quote, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => selectQuote(quote)} 
                            style={{ 
                              fontSize: '0.6rem', 
                              color: '#D4AF37', 
                              background: 'rgba(0,0,0,0.6)', 
                              border: '0.3px solid #D4AF37', 
                              padding: '8px 15px',
                              borderRadius: '5px',
                              cursor: 'pointer'
                            }}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Background Selector */}
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                      {[...Array(10)].map((_, i) => (
                        <button 
                          key={i} 
                          onClick={() => setBgIndex(i)}
                          style={{ 
                            width: '35px', 
                            height: '30px', 
                            background: bgIndex === i ? '#D4AF37' : 'rgba(0,0,0,0.5)', 
                            border: '0.5px solid #D4AF37', 
                            color: bgIndex === i ? '#000' : '#D4AF37', 
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            fontWeight: bgIndex === i ? 'bold' : 'normal'
                          }}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    {/* Bottom Row: Player, Names, Button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
                      
                      {/* Music Player */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '180px' }}>
                        <div 
                          onClick={() => { if(currentVideoId) setIsPlaying(!isPlaying); }}
                          style={{ 
                            background: 'rgba(0,0,0,0.5)', 
                            padding: '10px', 
                            borderRadius: '8px', 
                            border: '0.5px solid #D4AF37', 
                            cursor: currentVideoId ? 'pointer' : 'default',
                            textAlign: 'center'
                          }}
                        >
                          <p style={{ fontSize: '0.4rem', letterSpacing: '1px', opacity: 0.6, margin: '0 0 5px 0' }}>VIDEO</p>
                          <div style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
                            {isPlaying ? 'PAUSE' : '▶ PLAY'}
                          </div>
                        </div>
                        <input 
                          placeholder="Paste YouTube Link"
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            borderBottom: '0.3px solid #D4AF37', 
                            color: '#D4AF37', 
                            fontSize: '0.5rem', 
                            padding: '5px', 
                            outline: 'none',
                            width: '100%'
                          }}
                        />
                      </div>

                      {/* Center - STASH & SEND */}
                      <button 
                        onClick={handleStashAndSend}
                        disabled={isSaving}
                        style={{ 
                          background: isSaving ? '#999' : '#D4AF37', 
                          color: '#000', 
                          padding: '15px 50px', 
                          borderRadius: '30px', 
                          fontWeight: 'bold', 
                          fontSize: '0.8rem', 
                          border: 'none', 
                          cursor: isSaving ? 'not-allowed' : 'pointer', 
                          letterSpacing: '2px',
                          flexShrink: 0
                        }}
                      >
                        {isSaving ? 'SAVING...' : 'STASH & SEND'}
                      </button>

                      {/* Names */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end', minWidth: '120px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.5rem', opacity: 0.6 }}>TO:</span>
                          <input 
                            value={toName} 
                            onChange={(e) => setToName(e.target.value)}
                            style={{ 
                              background: 'transparent', 
                              border: 'none', 
                              borderBottom: '0.5px solid #D4AF37', 
                              color: '#D4AF37', 
                              fontSize: '0.8rem',
                              fontFamily: cursiveFont,
                              padding: '2px 5px',
                              outline: 'none',
                              width: '90px',
                              textAlign: 'right'
                            }}
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.5rem', opacity: 0.6 }}>FROM:</span>
                          <input 
                            value={fromName} 
                            onChange={(e) => setFromName(e.target.value)}
                            placeholder="Krystyna"
                            style={{ 
                              background: 'transparent', 
                              border: 'none', 
                              borderBottom: '0.5px solid #D4AF37', 
                              color: '#D4AF37', 
                              fontSize: '0.8rem',
                              fontFamily: cursiveFont,
                              padding: '2px 5px',
                              outline: 'none',
                              width: '90px',
                              textAlign: 'right'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Hidden YouTube Player */}
        {isPlaying && currentVideoId && (
          <div style={{ display: 'none' }}>
            <iframe 
              width="1" 
              height="1" 
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`} 
              allow="autoplay"
            />
          </div>
        )}
      </div>
    </main>
  );
}
