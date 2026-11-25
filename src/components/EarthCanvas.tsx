import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

interface EarthCanvasProps {
  isZoomed?: boolean;
  onEarthClick?: () => void;
  isTransitioning?: boolean;
  hideStars?: boolean;
  customX?: number;
  customY?: number;
  customScale?: number;
}

/**
 * Custom Shaders for Immersive 3D Depth Blinking Stars
 */
const starVertexShader = `
  uniform float uTime;
  attribute float aSize;
  attribute float aPhase;
  attribute float aFreq;
  attribute vec3 aColor;
  attribute float aIsSparkle;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vIsSparkle;

  void main() {
    vColor = aColor;
    vIsSparkle = aIsSparkle;
    
    // Multi-frequency organic twinkling
    float t1 = sin(uTime * aFreq + aPhase);
    float t2 = cos(uTime * (aFreq * 0.73) + aPhase * 1.41);
    float twinkle = (t1 * 0.6 + t2 * 0.4) * 0.5 + 0.5;
    twinkle = pow(twinkle, 1.6);
    
    // Minimum starlight floor (never totally dark) up to peak brilliance
    vAlpha = mix(0.18, 1.0, twinkle);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Attenuation based on 3D depth from camera
    float pSize = aSize * (0.8 + 0.45 * twinkle);
    gl_PointSize = clamp(pSize * (320.0 / -mvPosition.z), 1.2, 55.0);
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vIsSparkle;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float dist = length(c);
    if (dist > 0.5) discard;

    // Soft celestial radial glow
    float glow = exp(-dist * 5.2);
    // Brilliant white hot stellar core
    float core = smoothstep(0.14, 0.0, dist) * 0.95;
    
    // Optical 4-point cross diffraction spikes for alpha stars
    float spike = 0.0;
    if (vIsSparkle > 0.5) {
      float dX = abs(c.x);
      float dY = abs(c.y);
      float sH = max(0.0, 1.0 - dX * 2.4) * exp(-dY * 26.0);
      float sV = max(0.0, 1.0 - dY * 2.4) * exp(-dX * 26.0);
      spike = (sH + sV) * 0.8;
    }

    vec3 col = vColor + vec3(core * 0.9 + spike * 0.5);
    float alpha = clamp((glow + core + spike) * vAlpha, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

/**
 * 3D Immersive Depth Blinking Starfield:
 * - 2,600 stars distributed across a deep 3D spatial field (r: 9 to 75 units).
 * - True 3D perspective parallax as the camera navigates or zooms into Earth.
 * - Organic twinkling and pulsing with varying frequencies, sizes, and spectrum colors.
 * - Prominent alpha stars with 4-point diffraction sparkle flares.
 * - Slow cosmic drift rotation.
 */
function DeepBlinkingStars() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [geometry, material] = useMemo(() => {
    const count = 2600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const freqs = new Float32Array(count);
    const sparkles = new Float32Array(count);

    const palette = [
      new THREE.Color(0xffffff), // Pure brilliant white (60%)
      new THREE.Color(0xf0f7ff), // Soft cool white
      new THREE.Color(0xa8e4ff), // Cyan / Blue giant (15%)
      new THREE.Color(0xffe6b0), // Warm golden / Solar (15%)
      new THREE.Color(0x6ee7b7), // Emerald auroral spark (10%)
    ];

    for (let i = 0; i < count; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      
      // Radius distribution: 12 units to 175 units spanning deep cosmic distance
      const r = 12 + Math.pow(Math.random(), 1.4) * 160;
      
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const randColor = Math.random();
      let col = palette[0];
      if (randColor > 0.85) col = palette[2];
      else if (randColor > 0.70) col = palette[3];
      else if (randColor > 0.60) col = palette[4];
      else if (randColor > 0.40) col = palette[1];

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      const randSize = Math.random();
      if (randSize > 0.95) {
        // Alpha bright star with cross sparkle
        sizes[i] = 4.0 + Math.random() * 2.8;
        sparkles[i] = 1.0;
        freqs[i] = 1.2 + Math.random() * 2.4;
      } else if (randSize > 0.75) {
        // Medium bright blinking star
        sizes[i] = 2.4 + Math.random() * 1.5;
        sparkles[i] = 0.0;
        freqs[i] = 0.8 + Math.random() * 3.2;
      } else {
        // Deep micro background stars
        sizes[i] = 1.2 + Math.random() * 1.0;
        sparkles[i] = 0.0;
        freqs[i] = 0.5 + Math.random() * 2.0;
      }

      phases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geo.setAttribute("aFreq", new THREE.BufferAttribute(freqs, 1));
    geo.setAttribute("aIsSparkle", new THREE.BufferAttribute(sparkles, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return [geo, mat];
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012;
      pointsRef.current.rotation.x += delta * 0.004;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material}>
      <primitive object={material} ref={materialRef} attach="material" />
    </points>
  );
}

/**
 * Subtle Shooting Star / Cosmic Meteor Streaks
 */
function ShootingStars() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const stateRef = useRef({
    active: false,
    progress: 0,
    duration: 0.85,
    timer: 2.5,
    start: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    length: 5.5,
  });

  const [geometry, material] = useMemo(() => {
    const positions = new Float32Array([0, 0, 0, 0, 0, 0]);
    const colors = new Float32Array([1, 1, 1, 0.4, 0.6, 1]);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return [geo, mat];
  }, []);

  useFrame((_state, delta) => {
    const s = stateRef.current;
    if (!lineRef.current) return;

    if (!s.active) {
      s.timer -= delta;
      if (s.timer <= 0) {
        s.active = true;
        s.progress = 0;
        s.duration = 0.65 + Math.random() * 0.5;
        s.length = 4.0 + Math.random() * 3.5;
        s.timer = 4.5 + Math.random() * 5.0;

        const angle = -Math.PI * 0.25 + (Math.random() - 0.5) * 0.4;
        const startX = (Math.random() - 0.5) * 35;
        const startY = 10 + Math.random() * 15;
        const startZ = -15 - Math.random() * 20;

        s.start.set(startX, startY, startZ);
        s.dir.set(Math.cos(angle) * 32, -Math.sin(angle) * 32, 0);
      }
    } else {
      s.progress += delta / s.duration;
      if (s.progress >= 1) {
        s.active = false;
        (lineRef.current.material as THREE.LineBasicMaterial).opacity = 0;
      } else {
        const headProgress = s.progress;
        const tailProgress = Math.max(0, s.progress - s.length / 32);

        const headX = s.start.x + s.dir.x * headProgress;
        const headY = s.start.y + s.dir.y * headProgress;
        const headZ = s.start.z + s.dir.z * headProgress;

        const tailX = s.start.x + s.dir.x * tailProgress;
        const tailY = s.start.y + s.dir.y * tailProgress;
        const tailZ = s.start.z + s.dir.z * tailProgress;

        const posAttr = lineRef.current.geometry.attributes.position;
        posAttr.setXYZ(0, headX, headY, headZ);
        posAttr.setXYZ(1, tailX, tailY, tailZ);
        posAttr.needsUpdate = true;

        const opacity = Math.sin(s.progress * Math.PI) * 0.85;
        (lineRef.current.material as THREE.LineBasicMaterial).opacity = opacity;
      }
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry} material={material} />
  );
}

/**
 * Camera Controller:
 * Smoothly glides between orbit (z = 4.6, y = 0.28) and central zoom (z = 1.18, y = 0.0).
 * In transition, the Earth zooms dead-center and expands until its surface fills the entire screen.
 */
function CameraController({
  isZoomed = false,
  isTransitioning = false,
  customX,
  customY,
}: {
  isZoomed?: boolean;
  isTransitioning?: boolean;
  customX?: number;
  customY?: number;
}) {
  const { camera, size } = useThree();
  const isMobile = size.width < 600;
  const earthX = customX !== undefined ? (isMobile ? customX * 0.45 : customX) : (isMobile ? 5.5 : 12.0);
  const earthY = customY !== undefined ? customY : (isMobile ? 1.0 : 0.6);

  useFrame((_state, delta) => {
    const orbitZ = isMobile ? 32.0 : 28.0;
    const orbitY = 0;
    const orbitX = 0;

    const targetZ = isTransitioning ? (isMobile ? 1.25 : 1.15) : isZoomed ? 2.1 : orbitZ;
    const targetY = isTransitioning ? earthY : orbitY;
    const targetX = isTransitioning ? earthX : orbitX;
    const damping = isTransitioning ? 4.2 : 3.8;

    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, damping, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, damping, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, damping, delta);

    if (isTransitioning) {
      camera.lookAt(earthX, earthY, 0);
    } else {
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

/**
 * Atmospheric Glow:
 * Subtle, delicate cyan-blue rim hugging the Earth's silhouette like the real atmosphere.
 */
function EarthAtmosphere() {
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          vec3 atmosphereColor = vec3(0.28, 0.68, 1.0);
          gl_FragColor = vec4(atmosphereColor, 1.0) * intensity * 0.85;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh material={atmosphereMaterial}>
      <sphereGeometry args={[1.18, 48, 48]} />
    </mesh>
  );
}

/**
 * Clean 3D Earth Model:
 * - Placed off-center to the side as a subtle background element.
 * - Scaled down to be small and non-intrusive.
 * - Smoothly scales up and centers during launch transition.
 */
function EarthModel({
  isZoomed = false,
  onEarthClick,
  isTransitioning = false,
  customX,
  customY,
  customScale,
}: {
  isZoomed?: boolean;
  onEarthClick: () => void;
  isTransitioning?: boolean;
  customX?: number;
  customY?: number;
  customScale?: number;
}) {
  const { size } = useThree();
  const isMobile = size.width < 600;
  const earthX = customX !== undefined ? (isMobile ? customX * 0.45 : customX) : (isMobile ? 5.5 : 12.0);
  const earthY = customY !== undefined ? customY : (isMobile ? 1.0 : 0.6);
  const baseScale = customScale !== undefined ? customScale : 0.38;

  const { scene } = useGLTF("/assets/earth/earth.glb");
  const earthRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(baseScale);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    // When transitioning, completely STOP rotation as requested
    if (!isTransitioning && earthRef.current) {
      earthRef.current.rotation.y += delta * 0.16;
    }

    // Floating animation: subtle vertical bobbing around earthY
    if (floatRef.current) {
      if (isTransitioning) {
        floatRef.current.position.y = THREE.MathUtils.damp(floatRef.current.position.y, earthY, 5.0, delta);
      } else {
        floatRef.current.position.y = earthY + Math.sin(state.clock.elapsedTime * 0.75) * 0.04;
      }

      // Smoothly expand scale during transition so entering the world fills the screen
      const targetScale = isTransitioning ? 1.0 : baseScale;
      scaleRef.current = THREE.MathUtils.damp(scaleRef.current, targetScale, 3.8, delta);
      floatRef.current.scale.setScalar(scaleRef.current);
    }
  });

  return (
    <group ref={floatRef} position={[earthX, earthY, 0]} rotation={[0.15, 0, 0.35]}>
      {/* Radiant Atmospheric Glow Corona */}
      <EarthAtmosphere />

      <group
        ref={earthRef}
        onClick={onEarthClick ? (e) => {
          e.stopPropagation();
          onEarthClick();
        } : undefined}
      >
        <Center>
          <primitive object={clonedScene} />
        </Center>
        {/* Invisible hit sphere for generous, easy clicking on Earth */}
        <mesh visible={false}>
          <sphereGeometry args={[2.5, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/earth/earth.glb");

export default function EarthCanvas({
  isZoomed = false,
  onEarthClick,
  isTransitioning = false,
  hideStars = false,
  customX,
  customY,
  customScale,
}: EarthCanvasProps) {
  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      className="earth-canvas-container"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        pointerEvents: onEarthClick ? "auto" : "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 28.0], fov: 45, near: 0.05, far: 300 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <CameraController
          isZoomed={isZoomed}
          isTransitioning={isTransitioning}
          customX={customX}
          customY={customY}
        />

        {/* 3D Immersive Depth Blinking Starfield & Cosmic Meteors */}
        {!hideStars && (
          <>
            <DeepBlinkingStars />
            <ShootingStars />
          </>
        )}

        {/* Ambient & directional lighting */}
        <ambientLight intensity={0.75} color="#dbe5f0" />
        <directionalLight position={[6, 4, 5]} intensity={1.9} color="#fffcf5" />
        <directionalLight position={[-6, -2, -4]} intensity={0.5} color="#5b7fa8" />
        <directionalLight position={[0, 6, 2]} intensity={0.6} color="#ffffff" />

        <Suspense fallback={null}>
          <EarthModel
            isZoomed={isZoomed}
            onEarthClick={onEarthClick || (() => {})}
            isTransitioning={isTransitioning}
            customX={customX}
            customY={customY}
            customScale={customScale}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
