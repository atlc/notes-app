import { useState, useEffect } from 'react';

interface SizeObj {
    width?: number | string | undefined;
    height?: number | string | undefined;
}

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<SizeObj>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}