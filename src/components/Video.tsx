/* eslint-disable react-hooks/rules-of-hooks */
import Hls from "hls.js";
import React, { useEffect, useRef, useState } from "react";

const RaikiPlayer = () => {
    const src = "https://vip.opstream17.com/20240725/15651_857a3e54/index.m3u8";
    const useVideo = useRef<HTMLVideoElement | null>(null);
    const [IsProgress, setIsProgress] = useState<number>(0);
    const [Playing, setPlaying] = useState<boolean>(false);
    const useProgress = useRef<HTMLProgressElement | null>(null);
    const [CanPlay, setCanPlay] = useState<boolean>(false);

    const useHls = () => {
        const support = Hls.isSupported();
        const hls = new Hls();
        if (support && useVideo.current) {
            hls.loadSource(src);
            hls.attachMedia(useVideo.current);
        }
    };
    const TimeUpdate = () => {
        if (useVideo.current && CanPlay) {
            const currentTime = useVideo.current.currentTime;
            const durTime = useVideo.current.duration;
            const played = (currentTime / durTime) * 100;
            setIsProgress(played);
        }
    };
    const onPlaying = () => {
        if (useVideo.current) {
            if (Playing) {
                useVideo.current.pause();
                setPlaying(false);
            } else {
                useVideo.current.play();
                setPlaying(true);
            }
        }
    };
    const DragProgressVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (useVideo.current) {
            const durTime = useVideo.current.duration;
            const timeDrag = (Number(e.target.value) * durTime) / 100;
            useVideo.current.currentTime = +timeDrag;
            setIsProgress(Number(e.target.value));
        }
    };
    const TimeLapse = (event: string) => {
        if (useVideo.current) {
            if (event === "plus") {
                useVideo.current.currentTime = useVideo.current.currentTime + 10;
            }
            if (event === "delete") {
                useVideo.current.currentTime = useVideo.current.currentTime - 10;
            }
        }
    };
    useEffect(() => {
        useHls();
    }, []);
    useEffect(() => {
        TimeUpdate();
    }, [CanPlay]);
    return (
        <div className="w-[800px] relative flex justify-center items-center h-auto">
            <video
                ref={useVideo}
                className="w-full"
                onTimeUpdate={TimeUpdate}
                onCanPlay={() => {
                    setCanPlay(true);
                }}
            />
            <div className="absolute top-0 left-0 w-full h-full cursor-pointer flex justify-center flex-wrap items-end bg-[rbga(0,0,0)]">
                <div className="bottom-5 w-full flex flex-col justify-center items-center">
                    <input
                        type="range"
                        className=" w-[98%] z-10 rounded-none h-10 transition-transform progress-input"
                        value={Number.isNaN(IsProgress) ? 0 : IsProgress}
                        max={100}
                        min={0}
                        onChange={DragProgressVideo}
                    />
                    <div className="flex w-full pl-1 pb-2">
                        <button
                            className="size-6 z-10 mr-2 text-white transition-transform"
                            onClick={() => {
                                TimeLapse("delete");
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button
                            className="size-6 z-10 mr-2 text-white transition-transform"
                            onClick={onPlaying}
                        >
                            {Playing ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                        <button
                            className="size-6 z-10 mr-2 text-white transition-transform"
                            onClick={() => {
                                TimeLapse("plus");
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RaikiPlayer;
