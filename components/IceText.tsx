'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text3D, Center, Environment, useMatcapTexture } from '@react-three/drei'
import * as THREE from 'three'

/* ── 얼음 굴절 머티리얼 ────────────────────────────────────────────────── */
const iceVertexShader = `
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 mvPosition = viewMatrix * worldPos;
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const iceFragmentShader = `
  uniform float uTime;
  uniform vec3 uCameraPosition;

  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vViewPosition;

  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    vec3 normal = normalize(vWorldNormal);

    // 프레넬 효과 (가장자리가 더 반사)
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

    // 노이즈 기반 내부 구조 (얼음 결정/기포)
    float noise1 = snoise(vWorldPosition * 2.0 + uTime * 0.05) * 0.5 + 0.5;
    float noise2 = snoise(vWorldPosition * 4.0 - uTime * 0.03) * 0.5 + 0.5;
    float innerStructure = mix(noise1, noise2, 0.5);

    // 굴절 시뮬레이션
    vec3 refracted = refract(-viewDir, normal, 1.0 / 1.31);
    float refractNoise = snoise(vWorldPosition + refracted * 0.5 + uTime * 0.02);

    // 기본 얼음 색상 (차가운 블루)
    vec3 iceColor = vec3(0.85, 0.92, 0.97);
    vec3 deepIce = vec3(0.7, 0.82, 0.92);
    vec3 highlight = vec3(1.0, 1.0, 1.0);

    // 내부 깊이에 따른 색상 변화
    vec3 color = mix(iceColor, deepIce, innerStructure * 0.4);

    // 굴절에 의한 빛 패턴
    color += refractNoise * 0.06;

    // 프레넬 반사 (가장자리 하이라이트)
    color = mix(color, highlight, fresnel * 0.5);

    // 스페큘러 하이라이트
    vec3 lightDir = normalize(vec3(1.0, 1.0, 0.5));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 64.0);
    color += spec * 0.4;

    // 투명도 (얼음 느낌)
    float alpha = 0.75 + fresnel * 0.2 + innerStructure * 0.05;

    gl_FragColor = vec4(color, alpha);
  }
`

/* ── 3D 얼음 텍스트 메시 ────────────────────────────────────────────────── */
function IceTextMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCameraPosition: { value: new THREE.Vector3() },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uCameraPosition.value.copy(state.camera.position)
    }
  })

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font="/fonts/helvetiker_bold.typeface.json"
        size={1.2}
        height={0.6}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.02}
        bevelSegments={5}
        curveSegments={32}
      >
        JINSOO KIM
        <shaderMaterial
          ref={materialRef}
          vertexShader={iceVertexShader}
          fragmentShader={iceFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </Text3D>
    </Center>
  )
}

/* ── 캔버스 래퍼 ────────────────────────────────────────────────────────── */
export default function IceText() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ alpha: true, antialias: true }}
    >
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} />
      <IceTextMesh />
    </Canvas>
  )
}
