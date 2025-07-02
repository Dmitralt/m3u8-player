import React from "react";

const ProgressBarWithChapters = ({
    chapters,
    duration,
    currentTime,
    hoverTime,
    hoverChapter,
    onMouseMove,
    onMouseLeave,
    onClick,
    formatTime,
}) => {
    return (
        <div
            className="custom-progressbar"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            {chapters.map((ch, idx) => {
                if (ch.start < 0) ch.start = 0;
                if (ch.start > duration) ch.start = duration;

                if (ch.end < 0) ch.end = 0;
                if (ch.end > duration) ch.end = duration;

                if (ch.start < duration) {
                    const startPercent = (ch.start / duration) * 100;
                    const endPercent = (ch.end / duration) * 100;
                    const width = endPercent - startPercent;
                    const isCurrent = currentTime >= ch.start && currentTime <= ch.end;
                    const filledWidth = isCurrent
                        ? ((currentTime - ch.start) / (ch.end - ch.start)) * 100
                        : currentTime > ch.end
                            ? 100
                            : 0;

                    return (
                        <div
                            key={idx}
                            className="chapter-segment"
                            style={{
                                left: `${startPercent}%`,
                                width: `${width}%`,
                            }}
                        >
                            <div
                                className="chapter-progress-filled"
                                style={{ width: `${filledWidth}%` }}
                            />
                        </div>
                    );
                }
                return null;
            })}

            {hoverTime !== null && hoverChapter && (
                <>
                    <div
                        className="chapter-highlight"
                        style={{
                            left: `${(hoverChapter.start / duration) * 100}%`,
                            width: `${((hoverChapter.end - hoverChapter.start) / duration) * 100}%`,
                        }}
                    />
                    <div
                        className="tooltip"
                        style={{ left: `${(hoverTime / duration) * 100}%` }}
                    >
                        <div className="tooltip-content">
                            {hoverChapter.title}
                            <br />
                            <span>{formatTime(hoverTime)}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProgressBarWithChapters;
