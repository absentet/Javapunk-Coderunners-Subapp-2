import { useEffect, useRef, useState } from "react";

//For reading the saved settings

function getSaved(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch {
        return fallback;
    }
}

function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.warn("Could not save music settings");
    }
}

function MusicPlayer() {
    const audioRef = useRef(null);
    const [enabled, setEnabled] = useState(() => getSaved("musicEnabled", true));
    const [volume, setVolume] = useState(() => getSaved("musicVolume", 0.3));

    //Set and remember volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
        save("musicVolume", volume);
    }, [volume]);

    //Play or pause the music. Music starts upon interaction
    //if the browser blocks the autoplaying
    useEffect(() => {
        const audio = audioRef.current;
        save("musicEnabled", enabled);

        if (!audio)
            return;

        if (!enabled) {
            audio.pause();
            return;
        }

        const events = ["click", "keydown", "touchstart"];
        const startOnInteraction = (event) => {
            //prevents clicks on the musicplayers control to start music first (in case mute is clicked first)
            if (event.target.closest?.(".music-player"))
                return;
            
            audio.play().catch(() => {});
            events.forEach((e) => window.removeEventListener(e, startOnInteraction));
        };

        audio.play().catch(() => {
            events.forEach((e) => window.addEventListener(e, startOnInteraction));
        });

        return () => {
            events.forEach((e) => window.removeEventListener(e, startOnInteraction));
        };
    }, [enabled]);

    return (
        <div className="music-player">
            <audio ref={audioRef} src="/audio/retro-music.mp3" loop />
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEnabled((prev) => !prev)}
            >
                {enabled ? "Music on" : "Music off"}
            </button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                aria-label="Music volume"
            />
        </div>
    )
}

export default MusicPlayer;