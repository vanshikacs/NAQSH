'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VS = `
uniform float uT;
uniform vec2 uM;
varying vec2 vUv;
varying vec3 vN;

float f(vec2 p) {
  float h = sin(p.x * 1.1 + uT * 0.8 + p.y * 0.6) * 0.35 +
            sin(p.x * 2.3 - uT * 1.1 + p.y * 1.7) * 0.12 +
            sin(p.y * 1.4 + uT * 0.6) * 0.18;
  float d = distance(p, uM);
  h += exp(-d * d * 0.35) * sin(d * 4.0 - uT * 3.0) * 0.28;
  return h;
}

void main() {
  vUv = uv;
  vec2 p = position.xy;
  float e = 0.05;
  float h = f(p);
  vec3 n = normalize(vec3(
    -(f(p + vec2(e, 0.0)) - h) / e,
    -(f(p + vec2(0.0, e)) - h) / e,
    1.0
  ));
  vN = normalMatrix * n;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, h, 1.0);
}
`;

const FS = `
varying vec2 vUv;
varying vec3 vN;

void main() {
  vec3 L = normalize(vec3(-0.4, 0.6, 0.8));
  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
  float d = dot(N, L) * 0.5 + 0.5;
  
  // Fabric base tone (ivory to soft blush)
  vec3 base = mix(vec3(0.86, 0.91, 0.82), vec3(0.95, 0.85, 0.82), smoothstep(0.1, 0.9, vUv.x * 0.7 + vUv.y * 0.5));
  
  // Micro-weave grain
  vec2 g = vUv * vec2(220.0, 150.0);
  base *= 0.96 + 0.04 * sin(g.x * 6.283) * sin(g.y * 6.283);
  
  // Hand-embroidered floral motif grid
  vec2 c = fract(vUv * vec2(9.0, 6.0)) - 0.5;
  float r = length(c);
  float a = atan(c.y, c.x);
  float pet = 0.26 + 0.08 * cos(a * 6.0);
  float m = smoothstep(pet, pet - 0.02, r) * smoothstep(0.06, 0.08, r);
  
  // Rose & Gold embroidery thread accents
  base = mix(base, vec3(0.85, 0.55, 0.60), m * 0.8);
  base = mix(base, vec3(0.72, 0.60, 0.37), smoothstep(0.05, 0.04, r) * 0.9);
  
  // Lighting & Specular luster
  vec3 col = base * (0.68 + 0.5 * d);
  col += pow(max(dot(reflect(-L, N), vec3(0.0, 0.0, 1.0)), 0.0), 12.0) * 0.12;
  
  // Soft outer drape feathering
  float al = smoothstep(0.0, 0.14, min(vUv.x, 1.0 - vUv.x)) * smoothstep(0.0, 0.14, min(vUv.y, 1.0 - vUv.y));
  gl_FragColor = vec4(col, 0.92 * al);
}
`;

export default function InteractiveCloth3D({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.z = 9;

    const uniforms = {
      uT: { value: 2 },
      uM: { value: new THREE.Vector2(99, 99) },
    };

    const geometry = new THREE.PlaneGeometry(11, 7, 96, 64);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VS,
      fragmentShader: FS,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let width = 1;
    let height = 1;
    let normX = 0;
    let normY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let isVisible = true;
    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const isWide = width > 860;
      mesh.position.x = isWide ? 1.6 : 0;
      mesh.scale.setScalar(isWide ? 1.15 : 0.95);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const handlePointerMove = (e: PointerEvent) => {
      normX = (e.clientX / window.innerWidth) * 2 - 1;
      normY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) {
          startLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderFrame = () => {
      smoothX += (normX - smoothX) * 0.05;
      smoothY += (normY - smoothY) * 0.05;
      const scrollRatio = Math.min((window.scrollY || 0) / window.innerHeight, 1);
      const halfHeight = 3.27;

      uniforms.uM.value.set(
        smoothX * halfHeight * camera.aspect - mesh.position.x,
        smoothY * halfHeight
      );

      mesh.rotation.set(
        0.15 + smoothY * 0.1 + scrollRatio * 0.4,
        -0.45 + smoothX * 0.18,
        scrollRatio * 0.3
      );
      mesh.position.y = scrollRatio * 2.0;

      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (!isVisible || reducedMotion) return;
      uniforms.uT.value = clock.getElapsedTime();
      renderFrame();
      animationFrameId = requestAnimationFrame(startLoop);
    };

    if (reducedMotion) {
      renderFrame();
    } else {
      startLoop();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
