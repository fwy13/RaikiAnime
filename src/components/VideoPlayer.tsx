import { APITypes, usePlyr } from "plyr-react";
import "plyr-react/dist/plyr.css";
import Hls from "hls.js";
import { MutableRefObject, useEffect, useRef } from "react";

const hlsSource =
    "https://vip.opstream17.com/20240725/15651_857a3e54/index.m3u8";

const useHls = (src: string) => {
    const hls = useRef<Hls>(new Hls());
    useEffect(() => {
        hls.current.loadSource(src);
        hls.current.attachMedia(document.querySelector(".plyr-react")!);
    });
    return { options: null };
};

const RaikiAnimePlayer = () => {
    const plyrRef = useRef<APITypes | null>(null);
    const useVideo = usePlyr(plyrRef, {
        ...useHls(hlsSource),
    }) as MutableRefObject<HTMLVideoElement>;
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            console.log(e.code);
        }
        if (e.code === "ArrowRight") {
            plyrRef.current?.plyr.forward(5)
        }
        if (e.code === "ArrowLeft" && plyrRef.current) {
            plyrRef.current.plyr.currentTime =- 5
        }
    });
    const supported = Hls.isSupported();
    return (
        <>
            {supported ? (
                <video
                    ref={useVideo}
                    className="plyr-react plyr"
                    crossOrigin="anonymous"
                ></video>
            ) : (
                <span>HLS is not supported in your browse.</span>
            )}
        </>
    );
};

export default RaikiAnimePlayer;
