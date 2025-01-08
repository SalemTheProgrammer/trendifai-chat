"use client";

import { useEffect, useRef } from "react";

// Declare YouTube IFrame API types
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars?: {
            autoplay?: number;
            loop?: number;
            controls?: number;
            showinfo?: number;
            rel?: number;
            enablejsapi?: number;
            modestbranding?: number;
            mute?: number;
            playlist?: string;
          };
          events?: {
            onReady?: (event: { target: any }) => void;
          };
        }
      ) => void;
    };
  }
}

interface YouTubeVideoProps {
  videoId: string;
}

export function YouTubeVideo({ videoId }: YouTubeVideoProps) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1,
          modestbranding: 1,
          mute: 1,
          playlist: videoId
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          }
        }
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div id="youtube-player" className="absolute top-0 left-0 w-full h-full" />
  );
}