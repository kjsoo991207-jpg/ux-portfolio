'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Shaders ─────────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  // Gradient noise
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i),              f),
          dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
      mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
          dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v   = 0.0;
    float amp = 0.5;
    mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v  += amp * noise(p);
      p   = rot * p * 2.1 + vec2(100.0);
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    float t  = uTime * 0.06;
    vec2  uv = vUv;

    // Domain warping — liquid, organic flow
    vec2 q = vec2(
      fbm(uv * 1.2 + t),
      fbm(uv * 1.2 + vec2(5.2, 1.3) + t * 0.85)
    );
    vec2 r = vec2(
      fbm(uv + 4.0 * q + vec2(1.7, 9.2) + t * 0.6),
      fbm(uv + 4.0 * q + vec2(8.3, 2.8) + t * 0.55)
    );

    float f = fbm(uv + 4.0 * r);
    f = 0.5 + 0.5 * f;

    // Deep dark warm base
    vec3 base = vec3(0.039, 0.031, 0.027); // #0A0807

    // Warm glowing orb colors
    vec3 amber  = vec3(0.780, 0.498, 0.220); // warm amber  #C77F38
    vec3 gold   = vec3(0.859, 0.659, 0.369); // warm gold   #DBA85E
    vec3 cream  = vec3(0.910, 0.812, 0.659); // warm cream  #E8CFA8

    // Build the glow color
    vec3 glow = mix(amber, gold,  smoothstep(0.3, 0.6, f));
    glow      = mix(glow,  cream, smoothstep(0.6, 0.9, f));

    // Glow intensity — high contrast on dark bg
    float intensity = smoothstep(0.3, 1.0, f);
    intensity = pow(intensity, 1.6) * 0.72;

    vec3 col = mix(base, glow, intensity);

    // Second subtler orb — top-left drift
    float t2   = uTime * 0.04 + 3.14;
    vec2  uv2  = vUv + vec2(sin(t2) * 0.08, cos(t2 * 0.7) * 0.06);
    vec2  q2   = vec2(fbm(uv2 * 0.9 + t2 * 0.5), fbm(uv2 * 0.9 + vec2(3.1, 7.4) + t2 * 0.45));
    float f2   = fbm(uv2 + 3.0 * q2 + t2 * 0.3);
    f2 = pow(smoothstep(0.4, 0.9, 0.5 + 0.5 * f2), 2.2) * 0.38;
    col += glow * f2 * vec3(0.6, 0.4, 0.25);

    // Subtle vignette — focus centre
    vec2  st  = vUv - 0.5;
    float vig = smoothstep(0.9, 0.25, length(st) * 1.8);
    col *= mix(0.55, 1.0, vig);

    // Animated film grain
    float seed  = dot(vUv, vec2(12.9898, 78.233));
    float grain = fract(sin(seed * 43758.5453 + uTime * 220.0)) - 0.5;
    col += grain * 0.018;

    gl_FragColor = vec4(col, 1.0);
  }
`

// ─── Scene mesh ───────────────────────────────────────────────────────────────

function WarpedGlow() {
  const { viewport } = useThree()
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function HeroScene() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
    >
      <WarpedGlow />
    </Canvas>
  )
}
