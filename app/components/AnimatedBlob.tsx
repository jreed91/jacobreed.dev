"use client"
import { useEffect, useRef, useState } from 'react';

export default function AnimatedBlob() {
  const blobRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;

      const blob = blobRef.current;
      const rect = blob.getBoundingClientRect();
      const containerRect = blob.parentElement?.getBoundingClientRect();

      if (containerRect) {
        // Calculate mouse position relative to container
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        // Only update if mouse is within the container
        if (
          x >= 0 &&
          x <= containerRect.width &&
          y >= 0 &&
          y <= containerRect.height
        ) {
          setMousePosition({ x, y });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary animated blob */}
      <div
        ref={blobRef}
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 dark:opacity-20 animate-blob"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          left: `${mousePosition.x ? mousePosition.x - 192 : 'calc(50% - 12rem)'}px`,
          top: `${mousePosition.y ? mousePosition.y - 192 : 'calc(50% - 12rem)'}px`,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      {/* Secondary blob for depth */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 dark:opacity-15 animate-blob animation-delay-2000"
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #feca57 100%)',
          right: '10%',
          top: '20%',
        }}
      />

      {/* Tertiary blob for more depth */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-20 dark:opacity-15 animate-blob animation-delay-4000"
        style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          left: '15%',
          bottom: '10%',
        }}
      />
    </div>
  );
}
