import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* ── Generate points on a sphere (Fibonacci) ── */
function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return points;
}

/* ── Nodes (instanced spheres) ── */
function Nodes({ points }: { points: THREE.Vector3[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(() => points.map(() => Math.random() * Math.PI * 2), [points]);

  const colorIndigo = useMemo(() => new THREE.Color('hsl(239, 84%, 67%)'), []);
  const colorCyan = useMemo(() => new THREE.Color('hsl(187, 94%, 43%)'), []);
  const colorGreen = useMemo(() => new THREE.Color('hsl(120, 100%, 50%)'), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < points.length; i++) {
      dummy.position.copy(points[i]);
      const pulse = Math.sin(t * 1.5 + phases[i]) * 0.5 + 0.5;
      const s = 0.03 + pulse * 0.02;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color cycling
      const c = new THREE.Color();
      if (pulse > 0.85) {
        c.copy(colorGreen);
      } else if (pulse > 0.5) {
        c.lerpColors(colorIndigo, colorCyan, (pulse - 0.5) / 0.35);
      } else {
        c.copy(colorIndigo);
      }
      meshRef.current.setColorAt(i, c);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, points.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial transparent opacity={0.9} toneMapped={false} />
    </instancedMesh>
  );
}

/* ── Connections between nearby nodes ── */
function Connections({ points }: { points: THREE.Vector3[] }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const { positions, count } = useMemo(() => {
    const maxDist = 1.1;
    const segs: number[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < maxDist) {
          segs.push(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z);
        }
      }
    }
    return { positions: new Float32Array(segs), count: segs.length / 3 };
  }, [points]);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const mat = lineRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.12 + Math.sin(clock.getElapsedTime() * 0.5) * 0.04;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <lineBasicMaterial color="hsl(187, 94%, 43%)" transparent opacity={0.15} />
    </lineSegments>
  );
}

/* ── Rotating group ── */
function GlobeGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const points = useMemo(() => fibonacciSphere(80, 2), []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06; // ~0.1rpm
    }
  });

  return (
    <group ref={groupRef}>
      <Nodes points={points} />
      <Connections points={points} />
    </group>
  );
}

/* ── Floating data packets ── */
function DataPackets() {
  const count = 12;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        angle: Math.random() * Math.PI * 2,
        inclination: (Math.random() - 0.5) * Math.PI,
        speed: 0.2 + Math.random() * 0.3,
        radius: 2.2 + Math.random() * 0.4,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const d = data[i];
      const a = d.angle + t * d.speed;
      const r = d.radius;
      dummy.position.set(
        Math.cos(a) * Math.cos(d.inclination) * r,
        Math.sin(d.inclination) * r,
        Math.sin(a) * Math.cos(d.inclination) * r
      );
      dummy.scale.setScalar(0.02);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="hsl(120, 100%, 50%)" transparent opacity={0.7} toneMapped={false} />
    </instancedMesh>
  );
}

/* ── Canvas wrapper ── */
export default function NeuralGlobe() {
  return (
    <div className="w-full h-full min-h-[350px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <GlobeGroup />
        <DataPackets />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
        />
      </Canvas>
    </div>
  );
}
