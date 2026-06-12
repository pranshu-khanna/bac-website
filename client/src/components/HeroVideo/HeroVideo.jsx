import { useEffect, useRef } from "react";
import "./HeroVideo.scss";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;

    const play = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
    }

    return () => video.removeEventListener("canplay", play);
  }, []);

  return (
    <div className="hero-video-wrap" aria-hidden>
      <video
        ref={videoRef}
        className="hero-video"
        src="/videos/hero-clip.mp4"
        autoPlay
        playsInline
        loop
        muted
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
