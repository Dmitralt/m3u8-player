const VideoElement = ({
    videoRef,
    src,
    onTimeUpdate,
    onClick,
    muted,
}) => {
    return (
        <video
            ref={videoRef}
            src={src}
            onTimeUpdate={onTimeUpdate}
            onClick={onClick}
            muted={muted}
            controls={false}
        />
    );
};

export default VideoElement;
