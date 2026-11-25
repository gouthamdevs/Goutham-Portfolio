import React, { useRef, useEffect, useState, useCallback } from "react";
import EarthCanvas from "./EarthCanvas";

interface CockpitLaunchProps {
  onLaunchComplete: () => void;
}

type LaunchPhase =
  | "idle"
  | "activating"   // 0.0 - 1.5s
  | "igniting"     // 1.5 - 3.0s
  | "accelerating" // 3.0 - 5.0s
  | "hyperspace"   // 5.0 - 6.5s
  | "arriving"     // 6.5 - 7.5s
  | "arrived";

/**
 * Self-contained Retro 8-bit Web Audio Synthesizer
 * Uses native Web Audio API with zero external dependencies.
 * Fails safely/silently if audio is restricted by the browser.
 */
class CockpitAudio {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {}
  }

  playSystemActivation() {
    try {
      this.init();
      if (!this.ctx) return;
      // Boot chirp arpeggio: 520Hz -> 780Hz -> 1040Hz -> 1560Hz
      const freqs = [520, 780, 1040, 1560];
      freqs.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.04, this.ctx!.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + (i + 1) * 0.12);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + i * 0.12);
        osc.stop(this.ctx!.currentTime + (i + 1) * 0.12);
      });
    } catch {}
  }

  playIgnition() {
    try {
      this.init();
      if (!this.ctx) return;
      // Low-frequency engine rumble
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(50, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(85, this.ctx.currentTime + 1.5);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.065, this.ctx.currentTime + 0.7);
      gain.gain.linearRampToValueAtTime(0.045, this.ctx.currentTime + 1.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.5);
    } catch {}
  }

  playAcceleration() {
    try {
      this.init();
      if (!this.ctx) return;
      // Escalating warp drive whine
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(90, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 2.0);
      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.075, this.ctx.currentTime + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.0);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 2.0);
    } catch {}
  }

  playHyperspaceBurst() {
    try {
      this.init();
      if (!this.ctx) return;
      // Noise burst for warp detonation flash
      const bufferSize = this.ctx.sampleRate * 0.9;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.22));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);
      noise.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch {}
  }

  destroy() {
    try {
      if (this.ctx) {
        this.ctx.close();
        this.ctx = null;
      }
    } catch {}
  }
}

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  size: number;
  color: string;
}

interface DistantStar {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  freq: number;
  phase: number;
  color: string;
  hasSparkle: boolean;
}

interface DistantNebula {
  xPct: number;
  yPct: number;
  radiusPct: number;
  color1: string;
  color2: string;
}

export default function CockpitLaunch({ onLaunchComplete }: CockpitLaunchProps) {
  const [phase, setPhase] = useState<LaunchPhase>("idle");
  const [hasLaunched, setHasLaunched] = useState(false);
  const [monitorText, setMonitorText] = useState("AWAITING LAUNCH");
  const [monitorSub, setMonitorSub] = useState("WARP DRIVE: STANDBY");
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [cockpitOpacity, setCockpitOpacity] = useState(1);
  const [shakeIntensity, setShakeIntensity] = useState<"none" | "gentle" | "intense">("none");

  // Indicator LEDs state for sequenced illumination
  const [ledStage, setLedStage] = useState(0);
  const [warningBlink, setWarningBlink] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const audioRef = useRef<CockpitAudio | null>(null);

  const phaseRef = useRef<LaunchPhase>("idle");
  const launchStartTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const distantStarsRef = useRef<DistantStar[]>([]);
  const distantNebulaeRef = useRef<DistantNebula[]>([]);
  const tunnelRingsRef = useRef<number>(0);

  // Check for reduced motion preference
  const isReducedMotionRef = useRef(false);

  useEffect(() => {
    isReducedMotionRef.current =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    audioRef.current = new CockpitAudio();
    return () => {
      if (audioRef.current) audioRef.current.destroy();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Initialize stars pool and distant celestial deep space objects
  useEffect(() => {
    const stars: Star[] = [];
    const colors = ["#ffffff", "#ffffff", "#f0f7ff", "#93c5fd", "#67e8f9", "#fef08a"];
    for (let i = 0; i < 750; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 1600,
        z: Math.random() * 1500 + 1,
        prevZ: 1500,
        size: Math.random() < 0.25 ? 2 : 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    starsRef.current = stars;

    // Distant twinkling micro-stars
    const dStars: DistantStar[] = [];
    const dColors = ["#ffffff", "#ffffff", "#f0fdf4", "#e0f2fe", "#93c5fd", "#fed7aa", "#ddd6fe"];
    for (let i = 0; i < 350; i++) {
      dStars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() < 0.15 ? 2 : 1,
        baseAlpha: Math.random() * 0.65 + 0.35,
        freq: Math.random() * 2.5 + 0.8,
        phase: Math.random() * Math.PI * 2,
        color: dColors[Math.floor(Math.random() * dColors.length)],
        hasSparkle: Math.random() < 0.08,
      });
    }
    distantStarsRef.current = dStars;

    // Distant soft cosmic nebula dust clouds
    distantNebulaeRef.current = [
      {
        xPct: 0.28,
        yPct: 0.26,
        radiusPct: 0.24,
        color1: "rgba(56, 189, 248, 0.14)",
        color2: "rgba(99, 102, 241, 0)",
      },
      {
        xPct: 0.54,
        yPct: 0.32,
        radiusPct: 0.20,
        color1: "rgba(168, 85, 247, 0.10)",
        color2: "rgba(236, 72, 153, 0)",
      },
      {
        xPct: 0.78,
        yPct: 0.24,
        radiusPct: 0.26,
        color1: "rgba(245, 158, 11, 0.08)",
        color2: "rgba(16, 185, 129, 0)",
      },
    ];
  }, []);

  // Launch Trigger Handler
  const handleLaunch = useCallback(() => {
    if (hasLaunched || phaseRef.current !== "idle") return;

    setHasLaunched(true);
    phaseRef.current = "activating";
    setPhase("activating");
    launchStartTimeRef.current = performance.now();

    if (audioRef.current) {
      audioRef.current.playClick();
      audioRef.current.playSystemActivation();
    }
  }, [hasLaunched]);

  // Main Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = false;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const currentPhase = phaseRef.current;
      const startTime = launchStartTimeRef.current;
      const isReduced = isReducedMotionRef.current;

      // Calculate elapsed launch time
      let elapsed = 0;
      if (startTime !== null && currentPhase !== "idle") {
        elapsed = (time - startTime) / 1000;
      }

      // STATE MACHINE TIMELINE
      // Standard:
      // Phase 1 (0.0 - 1.5s): System Activation
      // Phase 2 (1.5 - 3.0s): Engine Ignition
      // Phase 3 (3.0 - 5.0s): Acceleration
      // Phase 4 (5.0 - 6.5s): Hyperspace Tunnel & Fade
      // Phase 5 (6.5 - 7.5s): Arrival & Flash Dissipation
      //
      // Reduced Motion:
      // Phase 1 (0.0 - 0.8s) -> Phase 2/3 (0.8 - 1.8s) -> Hyperspace Flash (1.8 - 2.5s)
      if (currentPhase !== "idle" && currentPhase !== "arrived") {
        if (!isReduced) {
          if (elapsed < 1.5) {
            if (phaseRef.current !== "activating") {
              phaseRef.current = "activating";
              setPhase("activating");
            }
          } else if (elapsed < 3.0) {
            if (phaseRef.current !== "igniting") {
              phaseRef.current = "igniting";
              setPhase("igniting");
              setShakeIntensity("gentle");
              if (audioRef.current) audioRef.current.playIgnition();
            }
          } else if (elapsed < 5.0) {
            if (phaseRef.current !== "accelerating") {
              phaseRef.current = "accelerating";
              setPhase("accelerating");
              setShakeIntensity("intense");
              if (audioRef.current) audioRef.current.playAcceleration();
            }
          } else if (elapsed < 6.5) {
            if (phaseRef.current !== "hyperspace") {
              phaseRef.current = "hyperspace";
              setPhase("hyperspace");
              setShakeIntensity("gentle");
              if (audioRef.current) audioRef.current.playHyperspaceBurst();
            }
          } else if (elapsed < 7.5) {
            if (phaseRef.current !== "arriving") {
              phaseRef.current = "arriving";
              setPhase("arriving");
              setShakeIntensity("none");
              // Signal completion right as hyperspace flash peaks
              onLaunchComplete();
            }
          } else {
            phaseRef.current = "arrived";
            setPhase("arrived");
          }
        } else {
          // Reduced motion timeline
          if (elapsed < 0.8) {
            if (phaseRef.current !== "activating") {
              phaseRef.current = "activating";
              setPhase("activating");
            }
          } else if (elapsed < 1.8) {
            if (phaseRef.current !== "accelerating") {
              phaseRef.current = "accelerating";
              setPhase("accelerating");
            }
          } else if (elapsed < 2.5) {
            if (phaseRef.current !== "arriving") {
              phaseRef.current = "arriving";
              setPhase("arriving");
              onLaunchComplete();
            }
          } else {
            phaseRef.current = "arrived";
            setPhase("arrived");
          }
        }
      }

      // Compute dynamic monitor telemetry & UI effects based on elapsed time
      if (currentPhase === "activating") {
        setLedStage(Math.floor((elapsed / 1.5) * 4) + 1);
        setWarningBlink(Math.sin(elapsed * 12) > 0);
        setMonitorText("WARP CORE ONLINE");
        setMonitorSub(`SYSTEMS: ${Math.min(100, Math.floor((elapsed / 1.5) * 100))}%`);
      } else if (currentPhase === "igniting") {
        setLedStage(4);
        setWarningBlink(false);
        setMonitorText("THRUST ENGAGED");
        setMonitorSub("ACCEL VECTOR: LOCK");
      } else if (currentPhase === "accelerating") {
        setLedStage(4);
        const warpVelocity = (0.75 + ((elapsed - 3.0) / 2.0) * 0.24).toFixed(2);
        setMonitorText("WARP ACCELERATION");
        setMonitorSub(`VELOCITY: ${warpVelocity} c`);
      } else if (currentPhase === "hyperspace") {
        setMonitorText(">> HYPERSPACE <<");
        setMonitorSub("TRANSIT IN PROGRESS");

        // Cockpit silhouette fade-out between 5.7s and 6.3s
        if (elapsed >= 5.6 && elapsed <= 6.4) {
          const fadeProgress = (elapsed - 5.6) / 0.8;
          setCockpitOpacity(Math.max(0, 1 - fadeProgress));
        } else if (elapsed > 6.4) {
          setCockpitOpacity(0);
        }

        // Flash ramp-up starting at 6.3s
        if (elapsed >= 6.3) {
          const flashProg = Math.min(1, (elapsed - 6.3) / 0.2);
          setFlashOpacity(flashProg);
        }
      } else if (currentPhase === "arriving") {
        setCockpitOpacity(0);
        // Flash decay over 1.0s (6.5s - 7.5s)
        const decayProg = Math.max(0, 1 - (elapsed - 6.5) / 1.0);
        setFlashOpacity(decayProg);
      }

      // DETERMINE VANISHING POINT
      // Precisely centered at the windshield opening of the cockpit
      const w = canvas.width;
      const h = canvas.height;
      let vanishX = w * 0.5;
      let vanishY = h * 0.41;

      if (imgRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          vanishX = rect.left + rect.width * 0.50;
          vanishY = rect.top + rect.height * 0.41;
        }
      }

      // CLEAR & RENDER CANVAS
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // 0. DRAW DEEP-SPACE CELESTIAL BACKGROUND (Nebulae, Distant Galaxy & Twinkling Deep Stars)
      const deepAlpha =
        currentPhase === "accelerating"
          ? Math.max(0, 1 - (elapsed - 3.0) / 1.2)
          : currentPhase === "hyperspace" || currentPhase === "arriving"
          ? 0
          : 1;

      if (deepAlpha > 0) {
        // A. Distant Cosmic Nebula Dust Clouds
        for (const neb of distantNebulaeRef.current) {
          const cx = neb.xPct * w;
          const cy = neb.yPct * h;
          const radius = neb.radiusPct * w;
          const grad = ctx.createRadialGradient(cx, cy, radius * 0.05, cx, cy, radius);
          grad.addColorStop(0, neb.color1);
          grad.addColorStop(1, neb.color2);
          ctx.save();
          ctx.globalAlpha = deepAlpha;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // B. Deep-Field Micro-Stars with Organic Twinkle
        for (const ds of distantStarsRef.current) {
          const sx = Math.floor(ds.x * w);
          const sy = Math.floor(ds.y * h);
          const tw = Math.sin(time * 0.0015 * ds.freq + ds.phase) * 0.45 + 0.55;
          const starAlpha = ds.baseAlpha * tw * deepAlpha;

          ctx.save();
          ctx.globalAlpha = starAlpha;
          ctx.fillStyle = ds.color;
          ctx.fillRect(sx, sy, ds.size, ds.size);

          // Optical 4-point cross diffraction spikes on bright alpha stars
          if (ds.hasSparkle && tw > 0.78) {
            ctx.strokeStyle = ds.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(sx - 3, sy + 0.5);
            ctx.lineTo(sx + ds.size + 3, sy + 0.5);
            ctx.moveTo(sx + 0.5, sy - 3);
            ctx.lineTo(sx + 0.5, sy + ds.size + 3);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // 1. STARFIELD SPEED CALCULATION
      let starSpeed = 0.25; // idle cosmic drift
      if (currentPhase === "activating") {
        starSpeed = 0.45;
      } else if (currentPhase === "igniting") {
        const p = (elapsed - 1.5) / 1.5;
        starSpeed = 0.5 + p * 8.0;
      } else if (currentPhase === "accelerating") {
        const p = (elapsed - 3.0) / 2.0;
        starSpeed = 8.0 + Math.pow(p, 1.8) * 65.0;
      } else if (currentPhase === "hyperspace") {
        starSpeed = 95.0;
      }

      // 2. DRAW STAR PARTICLES & STREAKS
      const stars = starsRef.current;
      const isStreaking = currentPhase === "accelerating" || currentPhase === "hyperspace";

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.prevZ = s.z;
        s.z -= starSpeed;

        if (s.z <= 1) {
          s.z = 1500;
          s.prevZ = 1500;
          s.x = (Math.random() - 0.5) * 2200;
          s.y = (Math.random() - 0.5) * 1600;
        }

        const k = 480 / s.z;
        const px = Math.floor(vanishX + s.x * k);
        const py = Math.floor(vanishY + s.y * k);

        // Discard stars outside the visible canvas
        if (px < -50 || px > w + 50 || py < -50 || py > h + 50) continue;

        if (!isStreaking) {
          // Crisp pixel dots
          ctx.fillStyle = s.color;
          const sz = s.z < 600 ? s.size : 1;
          ctx.fillRect(px, py, sz, sz);
        } else {
          // Pixelated radial speed streaks
          const prevK = 480 / Math.max(1, s.prevZ);
          const prevPx = Math.floor(vanishX + s.x * prevK);
          const prevPy = Math.floor(vanishY + s.y * prevK);

          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.z < 400 ? 2 : 1;
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      // 4. DRAW HYPERSPACE PIXEL-ART WARP TUNNEL (Phase 4)
      if (currentPhase === "hyperspace") {
        tunnelRingsRef.current = (tunnelRingsRef.current + dt * 280) % 80;
        const offset = tunnelRingsRef.current;

        // Concentric expanding pixel rings
        ctx.lineWidth = 2;
        for (let r = offset; r < Math.max(w, h); r += 60) {
          const ringAlpha = Math.min(0.85, (r / (w * 0.6)) * 0.85);
          ctx.strokeStyle =
            Math.floor(r / 60) % 2 === 0
              ? `rgba(56, 189, 248, ${ringAlpha})`
              : `rgba(255, 255, 255, ${ringAlpha * 0.9})`;

          // Draw stepped pixelated circular / octagonal ring
          ctx.beginPath();
          const segments = 16;
          for (let seg = 0; seg <= segments; seg++) {
            const angle = (seg / segments) * Math.PI * 2;
            const rx = Math.floor(vanishX + Math.cos(angle) * r);
            const ry = Math.floor(vanishY + Math.sin(angle) * r);
            if (seg === 0) ctx.moveTo(rx, ry);
            else ctx.lineTo(rx, ry);
          }
          ctx.stroke();
        }

        // Intense radial hyperspace tunnel rays
        const rayCount = 48;
        for (let j = 0; j < rayCount; j++) {
          const angle = (j / rayCount) * Math.PI * 2 + (elapsed * 0.5);
          const rayLen = Math.max(w, h);
          const startDist = 30 + (Math.sin(j + elapsed * 8) * 15);
          const x1 = Math.floor(vanishX + Math.cos(angle) * startDist);
          const y1 = Math.floor(vanishY + Math.sin(angle) * startDist);
          const x2 = Math.floor(vanishX + Math.cos(angle) * rayLen);
          const y2 = Math.floor(vanishY + Math.sin(angle) * rayLen);

          ctx.strokeStyle = j % 3 === 0 ? "rgba(255, 255, 255, 0.95)" : "rgba(34, 211, 238, 0.75)";
          ctx.lineWidth = j % 4 === 0 ? 3 : 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        // Central blinding core at vanishing point
        const coreGrad = ctx.createRadialGradient(vanishX, vanishY, 4, vanishX, vanishY, 140);
        coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        coreGrad.addColorStop(0.4, "rgba(56, 189, 248, 0.65)");
        coreGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(vanishX, vanishY, 140, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. ENGINE IGNITION GLOW ON EDGES (Phase 2 & 3)
      if (currentPhase === "igniting" || currentPhase === "accelerating") {
        const glowStrength =
          currentPhase === "igniting"
            ? ((elapsed - 1.5) / 1.5) * 0.25
            : 0.25 + ((elapsed - 3.0) / 2.0) * 0.45;

        const engineGrad = ctx.createLinearGradient(0, h, 0, h * 0.6);
        engineGrad.addColorStop(0, `rgba(56, 189, 248, ${glowStrength})`);
        engineGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = engineGrad;
        ctx.fillRect(0, h * 0.5, w, h * 0.5);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [onLaunchComplete]);

  // Compute shake CSS transform based on state
  const shakeClass =
    shakeIntensity === "intense"
      ? "cockpit-shake-intense"
      : shakeIntensity === "gentle"
      ? "cockpit-shake-gentle"
      : "";

  return (
    <div className="cockpit-root-container" ref={containerRef}>
      {/* 1. Canvas Layer: Starfield, Acceleration Streaks & Hyperspace Tunnel */}
      <canvas ref={canvasRef} className="cockpit-starfield-canvas" />

      {/* 2. 3D Earth Model Layer (Visible outside windshield) */}
      {phase !== "hyperspace" && phase !== "arriving" && phase !== "arrived" && (
        <div
          className="cockpit-earth-layer"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            opacity: phase === "accelerating" ? 0 : 1,
            transition: "opacity 0.7s ease-out",
          }}
        >
          <EarthCanvas
            hideStars={true}
            customX={12}
            customY={0.55}
            customScale={0.33}
            isTransitioning={false}
          />
        </div>
      )}

      {/* 3. Cockpit Foreground Overlay Frame */}
      <div
        className={`cockpit-frame-wrapper ${shakeClass}`}
        style={{
          opacity: cockpitOpacity,
          transition: "opacity 0.25s linear",
          visibility: cockpitOpacity <= 0 ? "hidden" : "visible",
        }}
      >
        <div className="cockpit-aspect-box">
          {/* Main Cockpit Image (Transparent Windshield, GOUTHAM nameplate preserved) */}
          <img
            ref={imgRef}
            src="/assets/cockpit/cockpit.png"
            alt="Spaceship Cockpit"
            className="cockpit-image-overlay"
            draggable={false}
          />

          {/* Physical Red Switch Launch Control (Right Console Joystick at X: 67.83%, Y: 73.93%) */}
          <div className="cockpit-right-switch-zone">
            <button
              type="button"
              className={`cockpit-physical-switch ${hasLaunched ? "is-engaged" : "is-ready"}`}
              onClick={handleLaunch}
              disabled={hasLaunched}
              aria-label="Engage Spaceship Launch Switch"
              title="Engage Spaceship Launch Switch"
            >
              {/* Subtle beacon halo around the physical red joystick switch */}
              <span className="switch-beacon-halo" />
            </button>

            {/* Retro Pixel Floating Prompt directly above the physical red switch when idle */}
            {!hasLaunched && (
              <div className="switch-prompt-tag" onClick={handleLaunch}>
                <span className="switch-prompt-arrow">▼</span>
                <span className="switch-prompt-text">ENGAGE LAUNCH</span>
              </div>
            )}
          </div>

          {/* Central CRT Monitor (Scaled precisely to the artwork cutout: X: 50.06%, Y: 71.48%) */}
          <div className={`cockpit-central-monitor ${phase !== "idle" ? "is-active" : ""}`}>
            <div className="monitor-crt-scanlines" />
            <div className="monitor-glow-overlay" />
            <div className="monitor-content-box">
              <div className="monitor-header-row">
                <span className="monitor-status-pill">{phase === "idle" ? "STANDBY" : "ACTIVE"}</span>
                <span className="monitor-blink-dot" />
              </div>
              <div className="monitor-main-text">{monitorText}</div>
              <div className="monitor-sub-text">{monitorSub}</div>

              {/* Pixel progress bar during activation/acceleration */}
              {phase === "activating" && (
                <div className="monitor-progress-bar">
                  <div
                    className="monitor-progress-fill"
                    style={{ width: `${Math.min(100, Math.floor(ledStage * 25))}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sequenced Dashboard Indicator LEDs */}
          <div className="cockpit-indicators-overlay">
            {/* Left Console LEDs (near launch controls) */}
            <div className={`dash-led led-green ${ledStage >= 1 ? "is-lit" : ""}`} style={{ left: "14.2%", top: "62.4%" }} />
            <div className={`dash-led led-amber ${ledStage >= 2 ? "is-lit" : ""}`} style={{ left: "15.4%", top: "62.4%" }} />
            <div className={`dash-led led-cyan ${ledStage >= 3 ? "is-lit" : ""}`} style={{ left: "16.6%", top: "62.4%" }} />
            <div className={`dash-led led-red ${warningBlink || ledStage >= 4 ? "is-lit is-flashing" : ""}`} style={{ left: "17.8%", top: "62.4%" }} />

            {/* Right Console LEDs */}
            <div className={`dash-led led-cyan ${ledStage >= 1 ? "is-lit" : ""}`} style={{ left: "81.8%", top: "62.4%" }} />
            <div className={`dash-led led-green ${ledStage >= 2 ? "is-lit" : ""}`} style={{ left: "83.0%", top: "62.4%" }} />
            <div className={`dash-led led-amber ${ledStage >= 3 ? "is-lit" : ""}`} style={{ left: "84.2%", top: "62.4%" }} />
            <div className={`dash-led led-red ${warningBlink || ledStage >= 4 ? "is-lit is-flashing" : ""}`} style={{ left: "85.4%", top: "62.4%" }} />

            {/* Overhead Visor Warning Beacons */}
            <div className={`dash-led led-red ${warningBlink ? "is-lit is-flashing" : ""}`} style={{ left: "44.8%", top: "20.5%" }} />
            <div className={`dash-led led-red ${warningBlink ? "is-lit is-flashing" : ""}`} style={{ left: "55.2%", top: "20.5%" }} />
          </div>
        </div>
      </div>

      {/* 3. Blinding Hyperspace Arrival Flash Overlay (Phase 4 into Phase 5) */}
      <div
        className="cockpit-hyperspace-flash"
        style={{
          opacity: flashOpacity,
          pointerEvents: flashOpacity > 0.05 ? "auto" : "none",
        }}
      />
    </div>
  );
}
