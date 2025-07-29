import { useRef, useState, useEffect } from "react";
import "./VideoPlayerWithChapters.css";
import Hls from "hls.js";
import "@fontsource/rubik";
import { useHlsPlayer } from "../hooks/useHlsPlayer";
import { useVolumeControl } from "../hooks/useVolumeControl";
import { useFullscreen } from "../hooks/useFullscreen";
import ControlsBar from "./ControlsBar";
import ProgressBarWithChapters from "./ProgressBarWithChapters";
import VideoElement from "./VideoElement";

const VideoPlayerWithChapters = ({ data }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    const {
        availableQualities,
        selectedQuality,
        showQualityMenu,
        setShowQualityMenu,
        setQuality,
        hlsRef,
    } = useHlsPlayer(videoRef, data.hlsPlaylistUrl);

    const {
        volume,
        isMuted,
        showVolume,
        handleVolumeChange,
        handleMouseEnter,
        handleMouseLeave,
    } = useVolumeControl(videoRef);

    const {
        isFullscreen,
        toggleFullscreen,
    } = useFullscreen(containerRef);


    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [hoverTime, setHoverTime] = useState(null);
    const [hoverChapter, setHoverChapter] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);

    const duration = videoDuration || data.videoLength;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => setVideoDuration(video.duration);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }, []);

    useEffect(() => {
        if (!videoRef.current || !data.hlsPlaylistUrl) return;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hlsRef.current = hls;

            hls.loadSource(data.hlsPlaylistUrl);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                const qualities = data.levels.map((level, index) => ({
                    index,
                    height: level.height,
                    label: `${level.height}p`,
                }));

                availableQualities([{ index: -1, label: "Auto" }, ...qualities]);
            });

            return () => hls.destroy();
        } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            videoRef.current.src = data.hlsPlaylistUrl;
        }
    }, [data.hlsPlaylistUrl]);

    const handlePlayPause = () => {
        if (!videoRef.current) return;

        isPlaying ? videoRef.current.pause() : videoRef.current.play();


        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleProgressHover = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const time = percent * duration;
        setHoverTime(time);

        const chapter = data.chapters.find(
            (ch) => time >= ch.start && time <= ch.end
        );
        setHoverChapter(chapter);
    };

    const handleProgressClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;

        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleMouseLeaveProgress = () => {
        setHoverTime(null);
        setHoverChapter(null);
    };

    const handleMouseLeaveVolume = () => {
        handleMouseLeave();
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "00:00";

        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        const pad = (n) => String(n).padStart(2, "0");

        return hours > 0
            ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
            : `${pad(minutes)}:${pad(seconds)}`;
    };

    return (
        <div className="video-player-wrapper">
            <div className="video-container" ref={containerRef}>
                <VideoElement
                    videoRef={videoRef}
                    src={data.hlsPlaylistUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onClick={handlePlayPause}
                    muted={isMuted}
                />

                <div className="video-controls-overlay">
                    <ProgressBarWithChapters
                        chapters={data.chapters}
                        duration={duration}
                        currentTime={currentTime}
                        hoverTime={hoverTime}
                        hoverChapter={hoverChapter}
                        onMouseMove={handleProgressHover}
                        onMouseLeave={handleMouseLeaveProgress}
                        onClick={handleProgressClick}
                        formatTime={formatTime}
                    />

                    <ControlsBar
                        isPlaying={isPlaying}
                        handlePlayPause={handlePlayPause}
                        volume={volume}
                        isMuted={isMuted}
                        showVolume={showVolume}
                        handleVolumeChange={handleVolumeChange}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeaveVolume={handleMouseLeaveVolume}
                        currentTime={currentTime}
                        duration={duration}
                        formatTime={formatTime}
                        showQualityMenu={showQualityMenu}
                        setShowQualityMenu={setShowQualityMenu}
                        availableQualities={availableQualities}
                        selectedQuality={selectedQuality}
                        setQuality={setQuality}
                        isFullscreen={isFullscreen}
                        toggleFullscreen={toggleFullscreen}
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerWithChapters;
