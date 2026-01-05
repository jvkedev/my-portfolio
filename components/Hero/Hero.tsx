import { useRef } from "react";
import Typewriter from "@/Typewriter/Typewriter";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLButtonElement>(null);
  const githubRef = useRef<HTMLButtonElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    tl.current = gsap
      .timeline()
      .from(headingRef.current, {
        x: 500,
        opacity: 0,
        duration: 0.7,
        delay: 1.3,
      })
      .from(typewriterRef.current, {
        opacity: 0,
        duration: 0.5,
      })
      .from(
        resumeRef.current,
        {
          x: -500,
          opacity: 0,
        },
        "btn"
      )
      .from(
        githubRef.current,
        {
          x: 500,
          opacity: 0,
        },
        "btn"
      );
  });

  return (
    <section className="flex flex-col items-center justify-center space-y-5 h-screen p-5 text-center overflow-x-hidden ">
      <h1
        ref={headingRef}
        className="text-4xl font-bold leading-snug md:text-6xl"
      >
        Hi, I’m Shubham JVKE
      </h1>

      {/* reserved space */}
      <div
        ref={typewriterRef}
        className="mt-4 h-[1.6em] text-primary text-2xl md:text-3xl font-mono leading-snug"
      >
        <Typewriter
          words={[
            "Full Stack Developer",
            "Transforming Ideas into Full Stack Solutions",
            "Passionate about Code, Design & Innovation",
          ]}
        />
      </div>
      <div className="flex flex-col space-y-5 mt-10 md:flex-row md:space-y-0 md:space-x-10">
        <button
          ref={resumeRef}
          className="border-2 px-7 py-5 text-xl cursor-pointer flex justify-center items-center md:w-75.5"
        >
          <img src="file.svg" alt="file_icon" className="w-7.5 mr-2.5" />
          Download My Resume
        </button>
        <button
          ref={githubRef}
          className="border-2 px-7 py-5 text-xl cursor-pointer flex justify-center items-center md:w-75.5"
        >
          <img src="github.svg" alt="github_icon" className="w-7.5 mr-2.5" />
          Github
        </button>
      </div>
    </section>
  );
};

export default Hero;
