"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    let mouseX = 0;
    let mouseY = 0;
    let isVisible = false;

    // ultra-fast setters (no new tweens per frame)
    const moveDotX = gsap.quickTo(dot, "x", {
      duration: 0.1,
      ease: "power3.out",
    });
    const moveDotY = gsap.quickTo(dot, "y", {
      duration: 0.1,
      ease: "power3.out",
    });

    const moveRingX = gsap.quickTo(ring, "x", {
      duration: 0.4,
      ease: "power3.out",
    });
    const moveRingY = gsap.quickTo(ring, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], {
          opacity: 1,
          duration: 0.2,
        });
      }

      moveDotX(mouseX);
      moveDotY(mouseY);
    };

    window.addEventListener("mousemove", onMouseMove);

    const tick = () => {
      moveRingX(mouseX);
      moveRingY(mouseY);
    };

    gsap.ticker.add(tick);

    // hover effects
    const hoverTargets = Array.from(
      document.querySelectorAll("a, button, [data-cursor]")
    );

    const hoverHandlers = hoverTargets.map((el) => {
      const onEnter = () => {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "#a855f7",
          duration: 0.25,
        });
        gsap.to(dot, {
          scale: 0.4,
          duration: 0.25,
        });
      };

      const onLeave = () => {
        gsap.to(ring, {
          scale: 1,
          borderColor: "#ffffff",
          duration: 0.25,
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.25,
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return { el, onEnter, onLeave };
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(tick);
      hoverHandlers.forEach(({ el, onEnter, onLeave }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* outer ring */}
      <div
        ref={ringRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-9998
             h-10 w-10 rounded-full border border-white/80"
      />

      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-9999
             h-2 w-2 rounded-full bg-purple-400"
      />
    </>
  );
};

export default CustomCursor;
