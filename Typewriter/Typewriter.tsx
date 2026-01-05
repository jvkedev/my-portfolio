"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap/gsap-core";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  pauseAfter?: number;
}

const Typewriter = ({
  words,
  typingSpeed = 0.1,
  pauseAfter = 1.5,
}: TypewriterProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    words.forEach((word) => {
      // typing
      word.split("").forEach((_, i) => {
        const charIndex = i;
        tl.to(
          {},
          {
            duration: typingSpeed,
            onComplete: () => {
              if (textRef.current) {
                textRef.current.textContent = word.slice(0, charIndex + 1);
              }
            },
          }
        );
      });

      // pause after typing
      tl.to({}, { duration: pauseAfter });

      // deleting
      for (let i = word.length; i >= 0; i--) {
        const deleteIndex = i;
        tl.to(
          {},
          {
            duration: typingSpeed / 1.5,
            onComplete: () => {
              if (textRef.current) {
                textRef.current.textContent = word.slice(0, deleteIndex);
              }
            },
          }
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, [words, typingSpeed, pauseAfter]);

  return <span ref={textRef} />;
};

export default Typewriter;
