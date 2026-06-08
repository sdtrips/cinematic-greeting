'use client';

import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface Props {
  colorScheme: { primary: string; secondary: string; accent: string; background: string; text: string };
  particleCount?: number;
  speed?: number;
}

export function ParticleBackground({ colorScheme, particleCount = 600, speed = 0.3 }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorAccent: { value: new THREE.Color(colorScheme.accent) },
    uColorSecondary: { value: new THREE.Color(colorScheme.secondary) },
  }), [colorScheme]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = 0.5 + Math.random() * 2;
      phases[i] = Math.random() * Math.PI * 2;
      const c = new THREE.Color(Math.random() < 0.5 ? colorScheme.accent : colorScheme.secondary);
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        attribute float phase;
        varying vec3 vColor;
        varying float vPhase;
        uniform float uTime;
        void main() {
          vColor = color; vPhase = phase;
          vec3 pos = position;
          pos.x += sin(uTime * 0.5 + phase) * 0.5;
          pos.y += cos(uTime * 0.3 + phase) * 0.5;
          pos.z += sin(uTime * 0.4 + phase) * 0.3;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vPhase;
        uniform float uTime;
        uniform vec3 uColorAccent;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float a = 1.0 - smoothstep(0.0, 0.5, d);
          a *= 0.6 + 0.4 * sin(uTime * 2.0 + vPhase);
          vec3 fc = mix(vColor, uColorAccent, sin(uTime + vPhase) * 0.5 + 0.5);
          gl_FragColor = vec4(fc, a);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      uniforms.uTime.value = performance.now() * 0.001 * speed;
      particles.rotation.y += 0.0001 * speed;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      geometry.dispose(); material.dispose(); renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [colorScheme, particleCount, speed, uniforms]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
}