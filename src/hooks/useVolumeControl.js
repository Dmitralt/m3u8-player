import { useState, useRef } from "react";

export const useVolumeControl = (videoRef) => {
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const volumeTimeoutRef = useRef(null);

    const handleVolumeChange = (e) => {
        const vol = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = vol;
        }
        setVolume(vol);
        setIsMuted(vol === 0);
    };

    const handleMouseEnter = () => {
        clearTimeout(volumeTimeoutRef.current);
        setShowVolume(true);
    };

    const handleMouseLeave = () => {
        volumeTimeoutRef.current = setTimeout(() => {
            setShowVolume(false);
        }, 200);
    };

    return {
        volume,
        isMuted,
        showVolume,
        handleVolumeChange,
        handleMouseEnter,
        handleMouseLeave,
        volumeTimeoutRef,
    };
};
