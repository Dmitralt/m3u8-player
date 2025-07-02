import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export const useHlsPlayer = (videoRef, hlsUrl) => {
    const hlsRef = useRef(null);
    const [availableQualities, setAvailableQualities] = useState([]);
    const [selectedQuality, setSelectedQuality] = useState("-1");
    const [showQualityMenu, setShowQualityMenu] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !hlsUrl) return;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hlsRef.current = hls;

            hls.loadSource(hlsUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
                const qualities = data.levels.map((level, index) => ({
                    index,
                    height: level.height,
                    label: `${level.height}p`,
                }));
                setAvailableQualities([{ index: -1, label: "Auto" }, ...qualities]);
            });

            return () => hls.destroy();

        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = hlsUrl;
        }
    }, [hlsUrl]);

    const setQuality = (index) => {
        setSelectedQuality(index);
        if (hlsRef.current) {
            hlsRef.current.currentLevel = index;
        }
        setShowQualityMenu(false);
    };

    return {
        availableQualities,
        selectedQuality,
        setSelectedQuality,
        showQualityMenu,
        setShowQualityMenu,
        setQuality,
        hlsRef,
    };
};
