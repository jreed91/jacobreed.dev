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
      {/* Primary animated blob - Sage Green to Muted Gold */}
      <div
        ref={blobRef}
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 dark:opacity-20 animate-blob"
        style={{
          background: 'linear-gradient(135deg, #7a9e7e 0%, #c9a961 50%, #f5f1e8 100%)',
          left: mousePosition.x ? `${mousePosition.x - 192}px` : 'calc(50% - 12rem)',
          top: mousePosition.y ? `${mousePosition.y - 192}px` : 'calc(50% - 12rem)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      {/* Secondary blob for depth - Deep Navy to Sage Green */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 dark:opacity-15 animate-blob animation-delay-2000"
        style={{
          background: 'linear-gradient(135deg, #1a2332 0%, #3d3d3d 50%, #7a9e7e 100%)',
          right: '10%',
          top: '20%',
        }}
      />

      {/* Tertiary blob for more depth - Muted Gold to Soft Cream */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-20 dark:opacity-15 animate-blob animation-delay-4000"
        style={{
          background: 'linear-gradient(135deg, #c9a961 0%, #f5f1e8 100%)',
          left: '15%',
          bottom: '10%',
        }}
      />
    </div>
  );
}
