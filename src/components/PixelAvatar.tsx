import React from "react";

interface PixelAvatarProps {
  className?: string;
  alt?: string;
  imageSrc?: string;
  scale?: number;
  faceX?: number;
  faceY?: number;
}

/**
 * PixelAvatar
 * Renders author portrait framed within a refined, slim pixel-art round border:
 * - Outer 1px black outline (#000000)
 * - Slim white pixel border (#ffffff)
 * - Inner 1px black outline (#000000)
 * - Perfectly centered head & shoulders (slightly zoomed out to show full face, hair, and shoulders)
 */
export default function PixelAvatar({
  className = "",
  alt = "Goutham Dev S",
  imageSrc = "/assets/MyPic/Friendly%20Portrait%20in%20Nature.png",
  scale = 0.94,
  faceX = 0.52,
  faceY = 0.425,
}: PixelAvatarProps) {
  // Source photo aspect ratio: 1199w x 1312h (1.09425)
  const imgAspect = 1312 / 1199;
  const w = 32 * scale;
  const h = w * imgAspect;
  // Center head & shoulders naturally in the 32x32 viewport
  const x = 16 - faceX * w;
  const y = 16 - faceY * h;

  return (
    <div
      className={`space-hero-avatar-wrapper ${className}`}
      title={alt}
      role="img"
      aria-label={alt}
    >
      <svg
        viewBox="0 0 32 32"
        className="pixel-avatar-svg"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="pixelAvatarClip">
            <rect x="11" y="3" width="10" height="1" />
            <rect x="9" y="4" width="14" height="1" />
            <rect x="8" y="5" width="16" height="1" />
            <rect x="7" y="6" width="18" height="1" />
            <rect x="6" y="7" width="20" height="1" />
            <rect x="5" y="8" width="22" height="1" />
            <rect x="4" y="9" width="24" height="1" />
            <rect x="4" y="10" width="24" height="1" />
            <rect x="3" y="11" width="26" height="1" />
            <rect x="3" y="12" width="26" height="1" />
            <rect x="3" y="13" width="26" height="1" />
            <rect x="3" y="14" width="26" height="1" />
            <rect x="3" y="15" width="26" height="1" />
            <rect x="3" y="16" width="26" height="1" />
            <rect x="3" y="17" width="26" height="1" />
            <rect x="3" y="18" width="26" height="1" />
            <rect x="3" y="19" width="26" height="1" />
            <rect x="3" y="20" width="26" height="1" />
            <rect x="4" y="21" width="24" height="1" />
            <rect x="4" y="22" width="24" height="1" />
            <rect x="5" y="23" width="22" height="1" />
            <rect x="6" y="24" width="20" height="1" />
            <rect x="7" y="25" width="18" height="1" />
            <rect x="8" y="26" width="16" height="1" />
            <rect x="9" y="27" width="14" height="1" />
            <rect x="11" y="28" width="10" height="1" />
          </clipPath>
        </defs>

        {/* User Portrait with centered head & shoulders (slightly zoomed out) */}
        <image
          href={imageSrc}
          x={x}
          y={y}
          width={w}
          height={h}
          clipPath="url(#pixelAvatarClip)"
        />

        {/* Inner Black Outline (1px separating photo from white border) */}
        <g className="pixel-border-inner-black">
          <rect x="11" y="3" width="10" height="1" fill="#000000" />
          <rect x="9" y="4" width="2" height="1" fill="#000000" />
          <rect x="21" y="4" width="2" height="1" fill="#000000" />
          <rect x="8" y="5" width="1" height="1" fill="#000000" />
          <rect x="23" y="5" width="1" height="1" fill="#000000" />
          <rect x="7" y="6" width="1" height="1" fill="#000000" />
          <rect x="24" y="6" width="1" height="1" fill="#000000" />
          <rect x="6" y="7" width="1" height="1" fill="#000000" />
          <rect x="25" y="7" width="1" height="1" fill="#000000" />
          <rect x="5" y="8" width="1" height="1" fill="#000000" />
          <rect x="26" y="8" width="1" height="1" fill="#000000" />
          <rect x="4" y="9" width="1" height="1" fill="#000000" />
          <rect x="27" y="9" width="1" height="1" fill="#000000" />
          <rect x="4" y="10" width="1" height="1" fill="#000000" />
          <rect x="27" y="10" width="1" height="1" fill="#000000" />
          <rect x="3" y="11" width="1" height="1" fill="#000000" />
          <rect x="28" y="11" width="1" height="1" fill="#000000" />
          <rect x="3" y="12" width="1" height="1" fill="#000000" />
          <rect x="28" y="12" width="1" height="1" fill="#000000" />
          <rect x="3" y="13" width="1" height="1" fill="#000000" />
          <rect x="28" y="13" width="1" height="1" fill="#000000" />
          <rect x="3" y="14" width="1" height="1" fill="#000000" />
          <rect x="28" y="14" width="1" height="1" fill="#000000" />
          <rect x="3" y="15" width="1" height="1" fill="#000000" />
          <rect x="28" y="15" width="1" height="1" fill="#000000" />
          <rect x="3" y="16" width="1" height="1" fill="#000000" />
          <rect x="28" y="16" width="1" height="1" fill="#000000" />
          <rect x="3" y="17" width="1" height="1" fill="#000000" />
          <rect x="28" y="17" width="1" height="1" fill="#000000" />
          <rect x="3" y="18" width="1" height="1" fill="#000000" />
          <rect x="28" y="18" width="1" height="1" fill="#000000" />
          <rect x="3" y="19" width="1" height="1" fill="#000000" />
          <rect x="28" y="19" width="1" height="1" fill="#000000" />
          <rect x="3" y="20" width="1" height="1" fill="#000000" />
          <rect x="28" y="20" width="1" height="1" fill="#000000" />
          <rect x="4" y="21" width="1" height="1" fill="#000000" />
          <rect x="27" y="21" width="1" height="1" fill="#000000" />
          <rect x="4" y="22" width="1" height="1" fill="#000000" />
          <rect x="27" y="22" width="1" height="1" fill="#000000" />
          <rect x="5" y="23" width="1" height="1" fill="#000000" />
          <rect x="26" y="23" width="1" height="1" fill="#000000" />
          <rect x="6" y="24" width="1" height="1" fill="#000000" />
          <rect x="25" y="24" width="1" height="1" fill="#000000" />
          <rect x="7" y="25" width="1" height="1" fill="#000000" />
          <rect x="24" y="25" width="1" height="1" fill="#000000" />
          <rect x="8" y="26" width="1" height="1" fill="#000000" />
          <rect x="23" y="26" width="1" height="1" fill="#000000" />
          <rect x="9" y="27" width="2" height="1" fill="#000000" />
          <rect x="21" y="27" width="2" height="1" fill="#000000" />
          <rect x="11" y="28" width="10" height="1" fill="#000000" />
        </g>

        {/* Slim White Border (refined width) */}
        <g className="pixel-border-white">
          <rect x="11" y="2" width="10" height="1" fill="#ffffff" />
          <rect x="9" y="3" width="2" height="1" fill="#ffffff" />
          <rect x="21" y="3" width="2" height="1" fill="#ffffff" />
          <rect x="7" y="4" width="2" height="1" fill="#ffffff" />
          <rect x="23" y="4" width="2" height="1" fill="#ffffff" />
          <rect x="6" y="5" width="2" height="1" fill="#ffffff" />
          <rect x="24" y="5" width="2" height="1" fill="#ffffff" />
          <rect x="5" y="6" width="2" height="1" fill="#ffffff" />
          <rect x="25" y="6" width="2" height="1" fill="#ffffff" />
          <rect x="4" y="7" width="2" height="1" fill="#ffffff" />
          <rect x="26" y="7" width="2" height="1" fill="#ffffff" />
          <rect x="4" y="8" width="1" height="1" fill="#ffffff" />
          <rect x="27" y="8" width="1" height="1" fill="#ffffff" />
          <rect x="3" y="9" width="1" height="1" fill="#ffffff" />
          <rect x="28" y="9" width="1" height="1" fill="#ffffff" />
          <rect x="3" y="10" width="1" height="1" fill="#ffffff" />
          <rect x="28" y="10" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="11" width="1" height="1" fill="#ffffff" />
          <rect x="29" y="11" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="12" width="1" height="1" fill="#ffffff" />
          <rect x="29" y="12" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="13" width="1" height="1" fill="#ffffff" />
          <rect x="29" y="13" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="14" width="1" height="1" fill="#ffffff" />
          <rect x="29" y="14" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="15" width="1" height="1" fill="#ffffff" />
          <rect x="29" y="15" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="16" width="1" height="1" fill="#ffffff" />
          <rect x="29" y="16" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="17" width="1" height="1" fill="#ffffff" />
          <rect x="29" y="17" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="18" width="1" height="1" fill="#ffffff" />
          <rect x="29" y="18" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="19" width="1" height="1" fill="#ffffff" />
          <rect x="29" y="19" width="1" height="1" fill="#ffffff" />
          <rect x="2" y="20" width="1" height="1" fill="#ffffff" />
          <rect x="29" y="20" width="1" height="1" fill="#ffffff" />
          <rect x="3" y="21" width="1" height="1" fill="#ffffff" />
          <rect x="28" y="21" width="1" height="1" fill="#ffffff" />
          <rect x="3" y="22" width="1" height="1" fill="#ffffff" />
          <rect x="28" y="22" width="1" height="1" fill="#ffffff" />
          <rect x="4" y="23" width="1" height="1" fill="#ffffff" />
          <rect x="27" y="23" width="1" height="1" fill="#ffffff" />
          <rect x="4" y="24" width="2" height="1" fill="#ffffff" />
          <rect x="26" y="24" width="2" height="1" fill="#ffffff" />
          <rect x="5" y="25" width="2" height="1" fill="#ffffff" />
          <rect x="25" y="25" width="2" height="1" fill="#ffffff" />
          <rect x="6" y="26" width="2" height="1" fill="#ffffff" />
          <rect x="24" y="26" width="2" height="1" fill="#ffffff" />
          <rect x="7" y="27" width="2" height="1" fill="#ffffff" />
          <rect x="23" y="27" width="2" height="1" fill="#ffffff" />
          <rect x="9" y="28" width="2" height="1" fill="#ffffff" />
          <rect x="21" y="28" width="2" height="1" fill="#ffffff" />
          <rect x="11" y="29" width="10" height="1" fill="#ffffff" />
        </g>

        {/* Outer Black Outline (1px outer sprite outline) */}
        <g className="pixel-border-outer-black">
          <rect x="11" y="1" width="10" height="1" fill="#000000" />
          <rect x="9" y="2" width="2" height="1" fill="#000000" />
          <rect x="21" y="2" width="2" height="1" fill="#000000" />
          <rect x="7" y="3" width="2" height="1" fill="#000000" />
          <rect x="23" y="3" width="2" height="1" fill="#000000" />
          <rect x="6" y="4" width="1" height="1" fill="#000000" />
          <rect x="25" y="4" width="1" height="1" fill="#000000" />
          <rect x="5" y="5" width="1" height="1" fill="#000000" />
          <rect x="26" y="5" width="1" height="1" fill="#000000" />
          <rect x="4" y="6" width="1" height="1" fill="#000000" />
          <rect x="27" y="6" width="1" height="1" fill="#000000" />
          <rect x="3" y="7" width="1" height="1" fill="#000000" />
          <rect x="28" y="7" width="1" height="1" fill="#000000" />
          <rect x="3" y="8" width="1" height="1" fill="#000000" />
          <rect x="28" y="8" width="1" height="1" fill="#000000" />
          <rect x="2" y="9" width="1" height="1" fill="#000000" />
          <rect x="29" y="9" width="1" height="1" fill="#000000" />
          <rect x="2" y="10" width="1" height="1" fill="#000000" />
          <rect x="29" y="10" width="1" height="1" fill="#000000" />
          <rect x="1" y="11" width="1" height="1" fill="#000000" />
          <rect x="30" y="11" width="1" height="1" fill="#000000" />
          <rect x="1" y="12" width="1" height="1" fill="#000000" />
          <rect x="30" y="12" width="1" height="1" fill="#000000" />
          <rect x="1" y="13" width="1" height="1" fill="#000000" />
          <rect x="30" y="13" width="1" height="1" fill="#000000" />
          <rect x="1" y="14" width="1" height="1" fill="#000000" />
          <rect x="30" y="14" width="1" height="1" fill="#000000" />
          <rect x="1" y="15" width="1" height="1" fill="#000000" />
          <rect x="30" y="15" width="1" height="1" fill="#000000" />
          <rect x="1" y="16" width="1" height="1" fill="#000000" />
          <rect x="30" y="16" width="1" height="1" fill="#000000" />
          <rect x="1" y="17" width="1" height="1" fill="#000000" />
          <rect x="30" y="17" width="1" height="1" fill="#000000" />
          <rect x="1" y="18" width="1" height="1" fill="#000000" />
          <rect x="30" y="18" width="1" height="1" fill="#000000" />
          <rect x="1" y="19" width="1" height="1" fill="#000000" />
          <rect x="30" y="19" width="1" height="1" fill="#000000" />
          <rect x="1" y="20" width="1" height="1" fill="#000000" />
          <rect x="30" y="20" width="1" height="1" fill="#000000" />
          <rect x="2" y="21" width="1" height="1" fill="#000000" />
          <rect x="29" y="21" width="1" height="1" fill="#000000" />
          <rect x="2" y="22" width="1" height="1" fill="#000000" />
          <rect x="29" y="22" width="1" height="1" fill="#000000" />
          <rect x="3" y="23" width="1" height="1" fill="#000000" />
          <rect x="28" y="23" width="1" height="1" fill="#000000" />
          <rect x="3" y="24" width="1" height="1" fill="#000000" />
          <rect x="28" y="24" width="1" height="1" fill="#000000" />
          <rect x="4" y="25" width="1" height="1" fill="#000000" />
          <rect x="27" y="25" width="1" height="1" fill="#000000" />
          <rect x="5" y="26" width="1" height="1" fill="#000000" />
          <rect x="26" y="26" width="1" height="1" fill="#000000" />
          <rect x="6" y="27" width="1" height="1" fill="#000000" />
          <rect x="25" y="27" width="1" height="1" fill="#000000" />
          <rect x="7" y="28" width="2" height="1" fill="#000000" />
          <rect x="23" y="28" width="2" height="1" fill="#000000" />
          <rect x="9" y="29" width="2" height="1" fill="#000000" />
          <rect x="21" y="29" width="2" height="1" fill="#000000" />
          <rect x="11" y="30" width="10" height="1" fill="#000000" />
        </g>
      </svg>
    </div>
  );
}
