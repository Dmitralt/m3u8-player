import { useEffect, useState } from "react";

export const useFullscreen = (elementRef) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const fsElement = document.fullscreenElement;
            setIsFullscreen(!!fsElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () =>
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const enterFullscreen = () => {
        const el = elementRef.current;
        if (el && el.requestFullscreen) {
            el.requestFullscreen();
        }
    };

    return { isFullscreen, enterFullscreen };
};
