import { useEffect, useRef } from "react";
import "./HeroVideo.scss";

export default function HeroVideo({ fullBleed = false, src = "/videos/hero-clip.mp4" }) {
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
  }, [src]);

  return (
    <div className={`hero-video-wrap${fullBleed ? " hero-video-wrap--full" : ""}`} aria-hidden>
      <video
        ref={videoRef}
        className="hero-video"
        src={src}
        key={src}
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
