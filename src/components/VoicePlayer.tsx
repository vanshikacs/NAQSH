'use client';

import { useState, useEffect } from 'react';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';

interface VoicePlayerProps {
  text: string;
  artisanName: string;
}

export default function VoicePlayer({ text, artisanName }: VoicePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setIsAvailable(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const play = () => {
    if (!isAvailable) return;

    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.85;
    u.pitch = 1.0;
    u.lang = 'en-IN';

    u.onend = () => {
      setIsPlaying(false);
      setUtterance(null);
    };

    u.onerror = () => {
      setIsPlaying(false);
      setUtterance(null);
    };

    setUtterance(u);
    setIsPlaying(true);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setUtterance(null);
  };

  if (!isAvailable) {
    return (
      <div className="flex items-center gap-2 text-xs text-ink-muted font-body">
        <VolumeX size={14} aria-hidden="true" />
        <span>Voice story unavailable in this browser</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={isPlaying ? stop : play}
        className="flex items-center gap-2 px-4 py-2 border border-rose text-wine font-body text-sm rounded hover:bg-rose/5 transition-colors font-medium"
        aria-label={isPlaying ? `Stop listening to ${artisanName}'s story` : `Listen to ${artisanName}'s story`}
      >
        {isPlaying ? (
          <>
            <Square size={13} aria-hidden="true" /> Stop
          </>
        ) : (
          <>
            <Play size={13} aria-hidden="true" /> Listen
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1.5 text-xs text-wine font-body">
          <Volume2 size={13} className="naqsh-pulse" aria-hidden="true" />
          <span>Playing...</span>
        </div>
      )}

      <p className="text-xs text-ink-muted font-body" style={{ fontSize: '10px' }}>
        Voice synthesis · Browser audio
      </p>
    </div>
  );
}
