"use client"
import { useEffect, useRef, useState } from 'react';

/* Code & Craft Animated Blob - Subtle, professional colors from palette */
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
      {/* Primary animated blob - Sage Blue */}
      <div
        ref={blobRef}
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 dark:opacity-15 animate-blob"
        style={{
          background: '#5fa8be',
          left: mousePosition.x ? `${mousePosition.x - 192}px` : 'calc(50% - 12rem)',
          top: mousePosition.y ? `${mousePosition.y - 192}px` : 'calc(50% - 12rem)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      {/* Secondary blob for depth - Light Blue */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-15 dark:opacity-10 animate-blob animation-delay-2000"
        style={{
          background: '#7dd3fc',
          right: '10%',
          top: '20%',
        }}
      />

      {/* Tertiary blob for more depth - Warm Gray */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-10 dark:opacity-8 animate-blob animation-delay-4000"
        style={{
          background: '#64748b',
          left: '15%',
          bottom: '10%',
        }}
      />
    </div>
  );
}
