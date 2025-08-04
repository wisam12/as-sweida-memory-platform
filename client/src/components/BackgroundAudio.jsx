import React, { useEffect, useRef, useState } from "react";

const audioFiles = [
    "/audio/audio1.mp3",
    "/audio/audio2.mp3",
    "/audio/audio3.mp3",
    "/audio/audio4.mp3",
    "/audio/audio5.mp3",
    "/audio/audio6.mp3"
];

export default function BackgroundAudio() {
    const audioRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true); // Start muted by default
    const [manuallyMuted, setManuallyMuted] = useState(true); // Track if the user manually muted
    const [currentTrack, setCurrentTrack] = useState(null);

    // Plays a random track from the list
    const playRandom = () => {
        const file = audioFiles[Math.floor(Math.random() * audioFiles.length)];
        setCurrentTrack(file);
        if (audioRef.current) {
            audioRef.current.src = file;
            audioRef.current.play().catch(() => { }); // Suppress autoplay errors
        }
    };

    // Stops and resets the audio
    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    useEffect(() => {
        // Handle when a video starts playing – stop background audio
        const handlePlay = (e) => {
            if (e.target.tagName === "VIDEO") stopAudio();
        };

        // When a video pauses/ends – resume background audio if not muted
        const handleVideoStop = (e) => {
            if (e.target.tagName === "VIDEO" && !manuallyMuted) playRandom();
        };

        // When audio track ends, play the next random one
        const handleTrackEnd = () => {
            if (!manuallyMuted) {
                playRandom();
            }
        };

        const audio = audioRef.current;
        if (audio) {
            audio.muted = isMuted; // Ensure audio is muted on mount
            audio.addEventListener("ended", handleTrackEnd);
        }

        // Attach listeners to control playback in relation to video elements
        document.addEventListener("play", handlePlay, true);
        document.addEventListener("pause", handleVideoStop, true);
        document.addEventListener("ended", handleVideoStop, true);

        // Cleanup listeners on unmount
        return () => {
            if (audio) {
                audio.removeEventListener("ended", handleTrackEnd);
            }
            document.removeEventListener("play", handlePlay, true);
            document.removeEventListener("pause", handleVideoStop, true);
            document.removeEventListener("ended", handleVideoStop, true);
        };
    }, [manuallyMuted, isMuted]);

    // Toggles mute/unmute state
    const toggleMute = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        setManuallyMuted(newMuted);
        if (audioRef.current) {
            audioRef.current.muted = newMuted;
        }

        // Start playing audio only when unmuted and nothing has played yet
        if (!newMuted && !currentTrack) {
            playRandom();
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
