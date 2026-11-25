import React from "react";

/**
 * Custom Illustrated Orbit Markers for Celestial Waypoints
 * Each destination sector has its own bespoke illustrated planetary body,
 * orbital ring systems, technical reticles, and animated satellites.
 */

// 1. Sector 01: Projects (Volcanic World / Magma Rifts / Industrial Rings)
export function CommercialOrbitMarker({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`orbit-marker-wrapper commercial-marker${isActive ? " is-active" : ""}`}>
      <svg
        className="orbit-marker-svg"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="comGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff5722" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#ff3d00" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ff1744" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="volcanicPlanet" cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#ff8a50" />
            <stop offset="35%" stopColor="#d84315" />
            <stop offset="70%" stopColor="#4e1609" />
            <stop offset="100%" stopColor="#1a0603" />
          </radialGradient>
          <linearGradient id="volcanicRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffab91" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#ff7043" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#bf360c" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff8a65" stopOpacity="0.8" />
          </linearGradient>
          <filter id="comBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient atmospheric heat haze */}
        <circle cx="42" cy="42" r="34" fill="url(#comGlow)" className="orbit-glow-aura" />

        {/* Outer tactical targeting reticle with cardinal ticks */}
        <g className="orbit-reticle orbit-spin-slow">
          <circle cx="42" cy="42" r="38" stroke="rgba(255, 112, 67, 0.35)" strokeWidth="1" strokeDasharray="3 7" />
          <line x1="42" y1="2" x2="42" y2="7" stroke="#ff7043" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="42" y1="77" x2="42" y2="82" stroke="#ff7043" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="42" x2="7" y2="42" stroke="#ff7043" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="77" y1="42" x2="82" y2="42" stroke="#ff7043" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Back half of tilted planetary ring */}
        <g transform="rotate(-24 42 42)">
          <path
            d="M 6 42 A 36 12 0 0 1 78 42"
            stroke="url(#volcanicRing)"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Volcanic planet sphere */}
        <circle cx="42" cy="42" r="16.5" fill="url(#volcanicPlanet)" stroke="#ff7043" strokeWidth="0.8" />

        {/* Glowing molten lava fissures / rifts across the surface */}
        <path
          d="M 32 36 Q 37 38, 42 35 T 51 40"
          stroke="#ffab40"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
          filter="url(#comBloom)"
        />
        <path
          d="M 35 44 Q 40 43, 44 47 T 50 49"
          stroke="#ff6e40"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Hotspot magma caldera */}
        <circle cx="36" cy="38" r="2.8" fill="#ffe57f" filter="url(#comBloom)" />
        <circle cx="36" cy="38" r="1.2" fill="#ffffff" />

        {/* Specular sunlight crescent highlight */}
        <path
          d="M 28 35 A 15.5 15.5 0 0 1 45 27.5 A 16.5 16.5 0 0 0 28 35 Z"
          fill="rgba(255, 255, 255, 0.45)"
        />

        {/* Front half of tilted planetary ring (overlapping planet for 3D depth) */}
        <g transform="rotate(-24 42 42)">
          <path
            d="M 78 42 A 36 12 0 0 1 6 42"
            stroke="url(#volcanicRing)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Orbiting mining drone / moonlet */}
          <circle cx="70" cy="42" r="2.5" fill="#ffffff" filter="url(#comBloom)" />
          <circle cx="70" cy="42" r="1.2" fill="#ffd180" />
        </g>
      </svg>
    </div>
  );
}

export const ProjectsOrbitMarker = CommercialOrbitMarker;

// 2. Sector 02: Personal Projects (Biosphere / Neural AI / Hex Data Lattice)
export function PersonalOrbitMarker({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`orbit-marker-wrapper personal-marker${isActive ? " is-active" : ""}`}>
      <svg
        className="orbit-marker-svg"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="bioGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#059669" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bioPlanet" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="35%" stopColor="#10b981" />
            <stop offset="70%" stopColor="#064e3b" />
            <stop offset="100%" stopColor="#022c22" />
          </radialGradient>
          <filter id="bioBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient biospheric halo */}
        <circle cx="42" cy="42" r="34" fill="url(#bioGlow)" className="orbit-glow-aura" />

        {/* Hexagonal sensor reticle */}
        <polygon
          points="42,5 74,23 74,61 42,79 10,61 10,23"
          stroke="rgba(52, 211, 153, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 6"
          fill="none"
          className="orbit-spin-slow"
        />

        {/* Interlocking gyroscopic orbital trajectory 1 */}
        <g transform="rotate(32 42 42)" className="orbit-spin-reverse">
          <ellipse
            cx="42"
            cy="42"
            rx="35"
            ry="13"
            stroke="rgba(78, 222, 163, 0.55)"
            strokeWidth="1.2"
            strokeDasharray="5 5"
          />
          <circle cx="77" cy="42" r="2.2" fill="#a7f3d0" filter="url(#bioBloom)" />
        </g>

        {/* Interlocking gyroscopic orbital trajectory 2 */}
        <g transform="rotate(-38 42 42)" className="orbit-spin-slow">
          <ellipse
            cx="42"
            cy="42"
            rx="35"
            ry="13"
            stroke="rgba(52, 211, 153, 0.45)"
            strokeWidth="1.2"
          />
          <circle cx="7" cy="42" r="2.2" fill="#6ee7b7" filter="url(#bioBloom)" />
        </g>

        {/* Biosphere planet core */}
        <circle cx="42" cy="42" r="16.5" fill="url(#bioPlanet)" stroke="#34d399" strokeWidth="0.8" />

        {/* Organic landmass / neural continent silhouettes */}
        <path
          d="M 33 34 C 36 31, 41 33, 44 31 C 47 29, 50 32, 48 37 C 45 40, 39 37, 36 41 Z"
          fill="#34d399"
          opacity="0.85"
        />
        <path
          d="M 38 43 C 41 41, 46 42, 48 46 C 45 49, 39 48, 38 43 Z"
          fill="#34d399"
          opacity="0.75"
        />

        {/* Central neural AI beacon node */}
        <circle cx="42" cy="42" r="3.2" fill="#ffffff" filter="url(#bioBloom)" />
        <circle cx="42" cy="42" r="1.5" fill="#10b981" />

        {/* Specular highlight */}
        <path
          d="M 28 35 A 15.5 15.5 0 0 1 45 27.5 A 16.5 16.5 0 0 0 28 35 Z"
          fill="rgba(255, 255, 255, 0.5)"
        />
      </svg>
    </div>
  );
}

// 3. Sector 03: Experience & Education (Solar Chronometer / Astrolabe / Golden Meridian)
export function ExperienceOrbitMarker({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`orbit-marker-wrapper experience-marker${isActive ? " is-active" : ""}`}>
      <svg
        className="orbit-marker-svg"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="expGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#d97706" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="solarPlanet" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#291204" />
          </radialGradient>
          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0.85" />
          </linearGradient>
          <filter id="expBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient solar corona */}
        <circle cx="42" cy="42" r="34" fill="url(#expGlow)" className="orbit-glow-aura" />

        {/* Astrolabe degree dial with 12 radial calibration ticks */}
        <g className="orbit-reticle orbit-spin-slow">
          <circle cx="42" cy="42" r="38" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="42" cy="42" r="35" stroke="rgba(251, 191, 36, 0.2)" strokeWidth="0.8" />
          {/* Precision quadrant ticks */}
          <rect x="41" y="2" width="2" height="5" fill="#fbbf24" rx="1" />
          <rect x="41" y="77" width="2" height="5" fill="#fbbf24" rx="1" />
          <rect x="2" y="41" width="5" height="2" fill="#fbbf24" rx="1" />
          <rect x="77" y="41" width="5" height="2" fill="#fbbf24" rx="1" />
        </g>

        {/* Tilted celestial meridian ring */}
        <g transform="rotate(18 42 42)" className="orbit-spin-reverse">
          <ellipse
            cx="42"
            cy="42"
            rx="34"
            ry="11"
            stroke="url(#goldRing)"
            strokeWidth="1.8"
            strokeDasharray="18 4 6 4"
          />
          <circle cx="76" cy="42" r="2.4" fill="#ffffff" filter="url(#expBloom)" />
        </g>

        {/* Golden desert / solar chronometer world */}
        <circle cx="42" cy="42" r="16.5" fill="url(#solarPlanet)" stroke="#fbbf24" strokeWidth="0.8" />

        {/* Geographic latitude / meridian grid lines */}
        <ellipse cx="42" cy="42" rx="16.5" ry="6" stroke="rgba(254, 240, 138, 0.4)" strokeWidth="0.8" fill="none" />
        <line x1="42" y1="25.5" x2="42" y2="58.5" stroke="rgba(254, 240, 138, 0.4)" strokeWidth="0.8" />

        {/* Central 4-point solar knowledge starburst */}
        <polygon
          points="42,34 44,40 50,42 44,44 42,50 40,44 34,42 40,40"
          fill="#ffffff"
          filter="url(#expBloom)"
        />
        <circle cx="42" cy="42" r="1.8" fill="#f59e0b" />

        {/* Specular highlight */}
        <path
          d="M 28 35 A 15.5 15.5 0 0 1 45 27.5 A 16.5 16.5 0 0 0 28 35 Z"
          fill="rgba(255, 255, 255, 0.55)"
        />
      </svg>
    </div>
  );
}

// 4. Sector 04: About (Oceanic World / Gas Giant Ice Rings / Sonar Waves)
export function AboutOrbitMarker({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`orbit-marker-wrapper about-marker${isActive ? " is-active" : ""}`}>
      <svg
        className="orbit-marker-svg"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="aboutGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#1d4ed8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="oceanPlanet" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="35%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0a1329" />
          </radialGradient>
          <linearGradient id="iceRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#60a5fa" stopOpacity="0.6" />
            <stop offset="75%" stopColor="#1d4ed8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.85" />
          </linearGradient>
          <filter id="aboutBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient oceanic glow */}
        <circle cx="42" cy="42" r="34" fill="url(#aboutGlow)" className="orbit-glow-aura" />

        {/* Concentric sonar / wave ripple radar reticle */}
        <g className="orbit-reticle orbit-spin-slow">
          <circle cx="42" cy="42" r="38" stroke="rgba(96, 165, 250, 0.35)" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="42" cy="42" r="32" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="0.8" />
          {/* Compass 8-point crosshairs */}
          <line x1="42" y1="2" x2="42" y2="6" stroke="#60a5fa" strokeWidth="1.2" />
          <line x1="42" y1="78" x2="42" y2="82" stroke="#60a5fa" strokeWidth="1.2" />
          <line x1="2" y1="42" x2="6" y2="42" stroke="#60a5fa" strokeWidth="1.2" />
          <line x1="78" y1="42" x2="82" y2="42" stroke="#60a5fa" strokeWidth="1.2" />
        </g>

        {/* Back half of wide majestic ice rings */}
        <g transform="rotate(-20 42 42)">
          <path
            d="M 5 42 A 37 11 0 0 1 79 42"
            stroke="url(#iceRing)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M 9 42 A 33 9 0 0 1 75 42"
            stroke="rgba(191, 219, 254, 0.4)"
            strokeWidth="1.2"
            opacity="0.5"
          />
        </g>

        {/* Ocean world sphere */}
        <circle cx="42" cy="42" r="16.5" fill="url(#oceanPlanet)" stroke="#60a5fa" strokeWidth="0.8" />

        {/* Swirling storm vortex / atmospheric cloud bands */}
        <ellipse
          cx="46"
          cy="40"
          rx="5"
          ry="3"
          fill="#1e40af"
          opacity="0.85"
        />
        <path
          d="M 30 36 C 36 34, 44 38, 52 35"
          stroke="rgba(191, 219, 254, 0.6)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 33 46 C 38 48, 45 44, 53 47"
          stroke="rgba(191, 219, 254, 0.5)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* Deep core curiosity beacon */}
        <circle cx="42" cy="42" r="3" fill="#ffffff" filter="url(#aboutBloom)" />
        <circle cx="42" cy="42" r="1.4" fill="#3b82f6" />

        {/* Specular highlight */}
        <path
          d="M 28 35 A 15.5 15.5 0 0 1 45 27.5 A 16.5 16.5 0 0 0 28 35 Z"
          fill="rgba(255, 255, 255, 0.55)"
        />

        {/* Front half of ice rings */}
        <g transform="rotate(-20 42 42)">
          <path
            d="M 79 42 A 37 11 0 0 1 5 42"
            stroke="url(#iceRing)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 75 42 A 33 9 0 0 1 9 42"
            stroke="rgba(224, 242, 254, 0.7)"
            strokeWidth="1"
          />
          {/* Orbiting icy moon */}
          <circle cx="16" cy="42" r="2.2" fill="#ffffff" filter="url(#aboutBloom)" />
        </g>
      </svg>
    </div>
  );
}

// 5. Sector 05: Contact (Polar Pulsar / Radio Telescope Arcs / Transmission Waves)
export function ContactOrbitMarker({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`orbit-marker-wrapper contact-marker${isActive ? " is-active" : ""}`}>
      <svg
        className="orbit-marker-svg"
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="contactGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="icePlanet" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#bfdbfe" />
            <stop offset="70%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <filter id="contactBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient cryo-pulsar corona */}
        <circle cx="42" cy="42" r="34" fill="url(#contactGlow)" className="orbit-glow-aura" />

        {/* Radiating electromagnetic transmission waves */}
        <g className="orbit-pulse-transmission">
          <path
            d="M 42 10 A 32 32 0 0 1 74 42"
            stroke="rgba(147, 197, 253, 0.45)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="4 6"
          />
          <path
            d="M 42 74 A 32 32 0 0 1 10 42"
            stroke="rgba(147, 197, 253, 0.45)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="4 6"
          />
          <path
            d="M 42 16 A 26 26 0 0 1 68 42"
            stroke="rgba(191, 219, 254, 0.35)"
            strokeWidth="1.2"
          />
          <path
            d="M 42 68 A 26 26 0 0 1 16 42"
            stroke="rgba(191, 219, 254, 0.35)"
            strokeWidth="1.2"
          />
        </g>

        {/* Tri-satellite relay network */}
        <g className="orbit-spin-slow">
          <circle cx="42" cy="42" r="37" stroke="rgba(191, 219, 254, 0.3)" strokeWidth="0.8" strokeDasharray="3 5" />
          {/* Satellite 1 */}
          <circle cx="42" cy="5" r="2.5" fill="#ffffff" filter="url(#contactBloom)" />
          {/* Satellite 2 (at 120°) */}
          <circle cx="74" cy="59" r="2.2" fill="#bfdbfe" />
          {/* Satellite 3 (at 240°) */}
          <circle cx="10" cy="59" r="2.2" fill="#bfdbfe" />
        </g>

        {/* Crystalline polar ice world */}
        <circle cx="42" cy="42" r="16.5" fill="url(#icePlanet)" stroke="#93c5fd" strokeWidth="0.8" />

        {/* Sharp crystalline facet geometry */}
        <polygon points="42,28 47,36 42,42 37,36" fill="rgba(255, 255, 255, 0.4)" />
        <polygon points="47,36 54,42 47,48 42,42" fill="rgba(224, 242, 254, 0.3)" />
        <polygon points="42,42 47,48 42,55 37,48" fill="rgba(191, 219, 254, 0.35)" />
        <polygon points="37,36 42,42 37,48 30,42" fill="rgba(255, 255, 255, 0.4)" />

        {/* Brilliant central 8-point pulsar transmitter star */}
        <g className="pulsar-beacon-star" filter="url(#contactBloom)">
          <polygon
            points="42,29 44,39 54,42 44,45 42,55 40,45 30,42 40,39"
            fill="#ffffff"
          />
          <polygon
            points="42,35 44,40 49,42 44,44 42,49 40,44 35,42 40,40"
            fill="#e0f2fe"
            transform="rotate(45 42 42)"
          />
          <circle cx="42" cy="42" r="2.2" fill="#ffffff" />
        </g>

        {/* Specular glint */}
        <circle cx="36" cy="35" r="2.5" fill="rgba(255, 255, 255, 0.85)" />
      </svg>
    </div>
  );
}

// 6. Launch Pad: Tactical Starship Docking Platform
export function LaunchPadOrbitMarker({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`orbit-marker-wrapper launchpad-marker${isActive ? " is-active" : ""}`}>
      <svg
        className="orbit-marker-svg"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="padGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#059669" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0" />
          </radialGradient>
          <filter id="padBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient emerald dock aura */}
        <circle cx="36" cy="36" r="30" fill="url(#padGlow)" className="orbit-glow-aura" />

        {/* Octagonal docking gantry platform */}
        <polygon
          points="24,8 48,8 64,24 64,48 48,64 24,64 8,48 8,24"
          fill="rgba(6, 24, 18, 0.88)"
          stroke="#4edea3"
          strokeWidth="1.4"
        />

        {/* Rotating calibration reticle ring */}
        <circle
          cx="36"
          cy="36"
          r="24"
          stroke="rgba(78, 222, 163, 0.45)"
          strokeWidth="1"
          strokeDasharray="3 5"
          className="orbit-spin-slow"
        />

        {/* Inward-pointing directional docking chevrons */}
        <g fill="#4edea3" opacity="0.85">
          <polygon points="36,12 32,16 40,16" />
          <polygon points="36,60 32,56 40,56" />
          <polygon points="12,36 16,32 16,40" />
          <polygon points="60,36 56,32 56,40" />
        </g>

        {/* Center magnetic docking core ring */}
        <circle
          cx="36"
          cy="36"
          r="10"
          fill="rgba(12, 38, 30, 0.95)"
          stroke="#4edea3"
          strokeWidth="1.5"
        />

        {/* Luminous beacon core */}
        <circle cx="36" cy="36" r="4" fill="#ffffff" filter="url(#padBloom)" />
        <circle cx="36" cy="36" r="2" fill="#4edea3" />
      </svg>
    </div>
  );
}

// Master Dispatcher Component
export default function OrbitMarker({
  destinationId,
  index,
  isActive = false,
}: {
  destinationId?: string;
  index: number;
  isActive?: boolean;
}) {
  if (index === -1) {
    return <LaunchPadOrbitMarker isActive={isActive} />;
  }

  const key = destinationId || index;

  switch (key) {
    case "about":
    case 0:
      return <AboutOrbitMarker isActive={isActive} />;
    case "projects":
    case "commercial":
    case 1:
      return <CommercialOrbitMarker isActive={isActive} />;
    case "experience":
    case 2:
      return <ExperienceOrbitMarker isActive={isActive} />;
    case "contact":
    case 3:
      return <ContactOrbitMarker isActive={isActive} />;
    case "personal":
      return <PersonalOrbitMarker isActive={isActive} />;
    default:
      return <AboutOrbitMarker isActive={isActive} />;
  }
}
