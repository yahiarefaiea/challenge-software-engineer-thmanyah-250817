'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useSearchStore } from '@/context/SearchContext';
import './Noise.scss';

export const Noise = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const noiseDataRef = useRef<ImageData[]>([]);
  const frameRef = useRef(0);
  const lastSizeRef = useRef({ width: 0, height: 0 });
  const { results } = useSearchStore();

  const createNoise = useCallback((width: number, height: number) => {
    if (!ctxRef.current) return;

    // Hex color #353238 equals to $color-black
    const colors = [0x14353238, 0x21353238, 0x28353238, 0x42353238];
    const idata = ctxRef.current.createImageData(width, height);
    const buffer32 = new Uint32Array(idata.data.buffer);

    for (let i = 0; i < buffer32.length; i++) {
      if (Math.random() < 0.14) {
        buffer32[i] = colors[Math.floor(Math.random() * 4)];
      }
    }

    noiseDataRef.current[0] = idata;
  }, []);

  const paintNoise = useCallback(() => {
    if (!ctxRef.current || !noiseDataRef.current[frameRef.current]) return;
    ctxRef.current.putImageData(noiseDataRef.current[frameRef.current], 0, 0);
  }, []);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;

    const wWidth = window.innerWidth;
    const wHeight = document.body.scrollHeight;

    // Only update if size actually changed
    if (lastSizeRef.current.width !== wWidth || lastSizeRef.current.height !== wHeight) {
      canvas.width = wWidth;
      canvas.height = wHeight;

      lastSizeRef.current = { width: wWidth, height: wHeight };

      createNoise(wWidth, wHeight);
      paintNoise();
    }
  }, [createNoise, paintNoise]);

  useEffect(() => {
    // Initial setup
    setup();

    // Setup ResizeObserver
    const resizeObserver = new ResizeObserver(setup);
    const bodyElement = document.querySelector('body');

    if (bodyElement) {
      resizeObserver.observe(bodyElement);
    }

    // Cleanup
    return () => {
      if (bodyElement) {
        resizeObserver.unobserve(bodyElement);
      }
      resizeObserver.disconnect();
    };
  }, [setup]);

  // Recalculate when search results change
  useEffect(() => {
    const timer = setTimeout(() => {
      setup();
    }, 100);

    return () => clearTimeout(timer);
  }, [results, setup]);

  return <canvas ref={canvasRef} id="noise" />;
};
