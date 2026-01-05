import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!headingRef.current || !paraRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 50%",
        end: "top 20%",
        scrub: 3,
        // markers: true,
      },
    });

    timeline
      .from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.6,
      })
      .from(
        paraRef.current,
        {
          rotateY: 180,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
  }, []);

  return (
    <section className="h-screen">
      <div className="max-w-3xl md:max-w-5xl px-6">
        <h2
          ref={headingRef}
          className="text-4xl font-bold mb-8 text-center md:text-6xl md:mb-15"
        >
          About Me
        </h2>
        <div ref={paraRef} style={{ perspective: 1000 }}>
          <p className="text-lg md:text-2xl font-medium text-gray-500 mb-6 md:mb-8">
            Hi, I’m <strong>Shubham (JVKE) </strong>, a <strong>fresher</strong>{" "}
            <strong>full-stack developer</strong> focused on building clean,
            reliable, and user-friendly web experiences using the MERN stack.
            I’m currently leveling up with{" "}
            <strong>TypeScript, Next.js and Python.</strong>
          </p>

          <p className="text-lg md:text-2xl font-medium text-gray-500 mb-6 md:mb-8">
            What started as curiosity turned into a strong interest in crafting
            modern UIs and scalable backends. I’ve built full-stack projects
            like
            <strong> e-commerce</strong> features and{" "}
            <strong>feedback systems,</strong> learning from both wins and my
            blunders.
          </p>

          <p className="text-lg md:text-2xl font-medium text-gray-500 mb-6 md:mb-8">
            I’m preparing for my <strong>BCA</strong> at IGNOU and strengthening
            my fundamentals with <strong>Python.</strong> I communicate clearly
            in English with a confident <strong>American accent</strong> and am
            actively seeking an internship or entry-level role to learn,
            contribute, and grow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
