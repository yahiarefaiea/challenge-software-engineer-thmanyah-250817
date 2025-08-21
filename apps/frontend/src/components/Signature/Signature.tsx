'use client';

import React, {
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import rawSignature from './svg/yahia-refaiea-signature.svg?raw';
import './Signature.scss';

gsap.registerPlugin(DrawSVGPlugin);

export const Signature = () => {
  const signatureRef = useRef<HTMLAnchorElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const selectorRef = useRef<NodeListOf<Element> | null>(null);

  const FULL_PATH = 2460;
  const Y_PATH = 1985;

  const initializeSignature = useCallback(() => {
    if (!signatureRef.current) return;

    timelineRef.current = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    selectorRef.current = signatureRef.current.querySelectorAll('.cls-1');

    if (selectorRef.current.length > 0) {
      timelineRef.current.set(selectorRef.current, {
        drawSVG: '0%',
        visibility: 'visible'
      });
    }
  }, []);

  const drawSignature = useCallback(() => {
    if (!timelineRef.current || !selectorRef.current) return;

    const tl = timelineRef.current;
    const selector = selectorRef.current;

    tl.to(selector[0], { drawSVG: Y_PATH, duration: 1.7 })
      .to(selector[1], { drawSVG: '100%', duration: 1.4, delay: -0.8 })
      .to(selector[2], { drawSVG: '100%', duration: 0.3, delay: -0.7 })
      .to(selector[3], { drawSVG: '100%', duration: 0.6, delay: -0.4 })
      .to(selector[4], { drawSVG: '100%', duration: 1, delay: -0.2 })
      .to(selector[5], { drawSVG: '100%', duration: 1.2, delay: -0.3 })
      .to(selector[6], { drawSVG: '100%', duration: 0.7, delay: -0.5 })
      .to(selector[7], { drawSVG: '100%', duration: 0.3, delay: -0.2 })
      .to(selector[8], { drawSVG: '100%', duration: 0.4, delay: -0.1 })
      .to(selector[9], { drawSVG: '100%', duration: 1.3, delay: -0.1 });
  }, [Y_PATH]);

  const replay = useCallback(() => {
    if (!timelineRef.current || !selectorRef.current) return;
    if (timelineRef.current.isActive()) return;

    const tl = timelineRef.current;
    const selector = selectorRef.current;
    const duration = 1.4;

    tl.clear()
      .fromTo(
        selector[0],
        { drawSVG: Y_PATH },
        { drawSVG: `${Y_PATH - 200} ${Y_PATH}`, duration, ease: 'power3.in' }
      )
      .fromTo(
        selector[0],
        { drawSVG: `${Y_PATH - 200} ${Y_PATH}` },
        { drawSVG: '96% 104%', duration: duration * 0.1875, ease: 'none' }
      )
      .fromTo(
        selector[1],
        { drawSVG: '100%' },
        { drawSVG: '100% 100%', duration, ease: 'power3.in', delay: -(duration + 0.25) }
      )
      .fromTo(
        selector[2],
        { drawSVG: '100%' },
        { drawSVG: '100% 100%', duration: duration * 0.25, ease: 'power3.in', delay: -(duration * 0.25 + 0.275) }
      )
      .fromTo(
        selector[0],
        { drawSVG: '96% 104%' },
        { drawSVG: `100% ${FULL_PATH + Y_PATH}`, duration: 1.7, ease: 'power3.out' }
      )
      .fromTo(
        selector[1],
        { drawSVG: '0%' },
        { drawSVG: '100%', duration, ease: 'power3.out', delay: -(duration + 0.25) }
      )
      .fromTo(
        selector[2],
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: duration * 0.25, ease: 'power3.out', delay: -(duration * 0.25 + 0.275) }
      );
  }, [FULL_PATH, Y_PATH]);

  useEffect(() => {
    initializeSignature();

    const timer = setTimeout(() => {
      drawSignature();
    }, 700);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [initializeSignature, drawSignature]);

  return (
    <a
      ref={signatureRef}
      id="signature"
      target="_blank"
      href="https://yahiarefaiea.com/about/"
      onMouseEnter={replay}
      dangerouslySetInnerHTML={{ __html: rawSignature }}
    />
  );
};
