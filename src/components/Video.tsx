/* eslint-disable react-hooks/rules-of-hooks */
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

const RaikiPlayer = () => {
    const src = "https://vip.opstream17.com/20240725/15651_857a3e54/index.m3u8";
    const useVideo = useRef<HTMLVideoElement | null>(null);
    const [IsProgress, setIsProgress] = useState<number>(0);
    const useHls = () => {
        const support = Hls.isSupported();
        const hls = new Hls({
            debug: true,
        });
        if (support && useVideo.current) {
            hls.loadSource(src);
            hls.attachMedia(useVideo.current);
        }
    };
    const TimeUpdate = () => {
        if (useVideo.current) {
            const currentTime = useVideo.current?.currentTime;
            const durTime = useVideo.current?.duration;
            const loaded = (currentTime / durTime) * 100;
            setIsProgress(loaded);
        }
    };
    useEffect(() => {
        useHls();
    }, []);
    return (
        <div className="w-[500px] relative flex justify-center items-center h-auto">
            <video
                ref={useVideo}
                controls
                className="w-full"
                onTimeUpdate={TimeUpdate}
                autoPlay
            />
            <div className="absolute top-0 left-0 w-full h-full cursor-pointer">
            <progress
                className="progress progress-accent w-[480px] z-10 top-30"
                value={IsProgress}
                max="100"
            />
            </div>
        </div>
    );
};
export default RaikiPlayer;
