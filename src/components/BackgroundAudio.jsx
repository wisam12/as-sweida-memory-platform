
import React, { useEffect, useRef, useState } from "react";

const audioFiles = [
  "/audio/audio1.mp3",
  "/audio/audio2.mp3",
  "/audio/audio3.mp3",
  "/audio/hamoud_alhanawi.mp3"
];

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [manuallyMuted, setManuallyMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const playRandom = () => {
    const file = audioFiles[Math.floor(Math.random() * audioFiles.length)];
    setCurrentTrack(file);
    if (audioRef.current && !manuallyMuted) {
      audioRef.current.src = file;
      audioRef.current.play().catch(() => {});
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    playRandom();

    const handlePlay = (e) => {
      if (e.target.tagName === "VIDEO") stopAudio();
    };

    const handleVideoStop = (e) => {
      if (e.target.tagName === "VIDEO" && !manuallyMuted) playRandom();
    };

    const handleTrackEnd = () => {
      if (!manuallyMuted) {
        playRandom();
      }
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", handleTrackEnd);
    }

    document.addEventListener("play", handlePlay, true);
    document.addEventListener("pause", handleVideoStop, true);
    document.addEventListener("ended", handleVideoStop, true);

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleTrackEnd);
      }
      document.removeEventListener("play", handlePlay, true);
      document.removeEventListener("pause", handleVideoStop, true);
      document.removeEventListener("ended", handleVideoStop, true);
    };
  }, [manuallyMuted]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setManuallyMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <audio ref={audioRef} />
      <button onClick={toggleMute}>
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
