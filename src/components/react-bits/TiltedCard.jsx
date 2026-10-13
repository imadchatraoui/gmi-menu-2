/*
 * React Bits — Copyright (c) 2026 David Haz. MIT + Commons Clause.
 * Source: https://github.com/DavidHDev/react-bits/blob/496968c4117e21278f13917201b7d615bc5e7450/src/content/Components/TiltedCard/TiltedCard.jsx
 * Adapted for GMI: reduced motion, touch devices, accessibility and responsive surfaces.
 * License: REACT_BITS_LICENSE.md and ../../../THIRD_PARTY_NOTICES.md.
 */
'use client';

import { useEffect, useRef } from 'react';
import useFinePointer from './useFinePointer';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import './TiltedCard.css';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = false,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className = '',
  style,
  imageClassName = '',
  imageStyle,
  loading = 'eager',
  fetchPriority
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const canTilt = finePointer && !shouldReduceMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const lastY = useRef(0);

  useEffect(() => {
    if (canTilt) return;
    rotateX.jump(0);
    rotateY.jump(0);
    scale.jump(1);
    opacity.jump(0);
    rotateFigcaption.jump(0);
  }, [canTilt, rotateX, rotateY, scale, opacity, rotateFigcaption]);

  function handleMouse(e) {
    if (!ref.current || !canTilt || e.pointerType === 'touch') return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY.current;
    rotateFigcaption.set(-velocityY * 0.6);
    lastY.current = offsetY;
  }

  function handleMouseEnter(e) {
    if (!canTilt || e.pointerType === 'touch') return;
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        ...style
      }}
      onPointerMove={canTilt ? handleMouse : undefined}
      onPointerEnter={canTilt ? handleMouseEnter : undefined}
      onPointerLeave={canTilt ? handleMouseLeave : undefined}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX: canTilt ? rotateX : 0,
          rotateY: canTilt ? rotateY : 0,
          scale: canTilt ? scale : 1
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className={`tilted-card-img ${imageClassName}`}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          style={{
            width: imageWidth,
            height: imageHeight,
            ...imageStyle
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        )}
      </motion.div>

      {showTooltip && canTilt && captionText && (
        <motion.figcaption
          className="tilted-card-caption"
          aria-hidden="true"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
