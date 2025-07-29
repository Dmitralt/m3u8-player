import {
    FaPlay,
    FaPause,
    FaVolumeMute,
    FaVolumeUp,
    FaCog,
    FaExpand,
    FaCompress,
} from "react-icons/fa";
const ControlsBar = ({
    isPlaying,
    handlePlayPause,
    volume,
    isMuted,
    showVolume,
    handleVolumeChange,
    handleMouseEnter,
    handleMouseLeaveVolume,
    currentTime,
    duration,
    formatTime,
    showQualityMenu,
    setShowQualityMenu,
    availableQualities,
    selectedQuality,
    setQuality,
    isFullscreen,
    toggleFullscreen,
}) => {
    return (
        <div className="controls-bar">
            <div className="controls-left">
                <button onClick={handlePlayPause}>
                    {isPlaying ? (
                        <FaPause color="white" size={20} />
                    ) : (
                        <FaPlay color="white" size={20} />
                    )}
                </button>

                <div
                    className={`volume-control-wrapper ${showVolume ? "volume-open" : ""}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeaveVolume}
                >
                    <button className="volume-icon">
                        {isMuted || volume === 0 ? (
                            <FaVolumeMute color="white" size={20} />
                        ) : (
                            <FaVolumeUp color="white" size={20} />
                        )}
                    </button>

                    {showVolume && (
                        <div className="volume-slider-container">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                            />
                        </div>
                    )}
                </div>

                <div className="time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>

            <div className="controls-right">
                <div
                    className="quality-selector-wrapper"
                    onMouseLeave={() => setShowQualityMenu(false)}
                >
                    <button
                        className="gear-button"
                        onClick={() => setShowQualityMenu((prev) => !prev)}
                    >
                        <FaCog color="white" size={20} />
                    </button>

                    {showQualityMenu && (
                        <select
                            className="quality-dropdown"
                            onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                            value={selectedQuality}
                        >
                            {availableQualities.map((q) => (
                                <option key={q.index} value={q.index}>
                                    {q.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>


                <button onClick={toggleFullscreen}>
                    {isFullscreen ? (
                        <FaCompress color="white" size={20} />
                    ) : (
                        <FaExpand color="white" size={20} />
                    )}
                </button>


                <div className="placeholder-box" />
            </div>
        </div>
    );
};

export default ControlsBar;
