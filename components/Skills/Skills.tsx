import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const frontendHeadingRef = useRef<HTMLHeadingElement>(null);
  const frontendSkillsRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    if (
      !headingRef.current ||
      !frontendHeadingRef.current ||
      !frontendSkillsRef.current
    )
      return;

    const mm = gsap.matchMedia();

    // Mobile Animation
    mm.add("(max-width: 768px)", () => {
      if (
        !headingRef.current ||
        !frontendHeadingRef.current ||
        !frontendSkillsRef.current
      )
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
          end: "top 0%",
          scrub: 5,
          // markers: true,
        },
      });

      tl.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      })
        .from(
          frontendHeadingRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .from(
          frontendSkillsRef.current.children,
          {
            y: 40,
            rotateX: 180,
            opacity: 0,
            duration: 0.4,
            stagger: 0.12,
            ease: "back.out(1.4)",
            transformOrigin: "center top",
          },
          "-=0.2"
        );
    });

    //   const timeline = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: sectionRef.current,
    //       start: "top 60%",
    //       end: "bottom 90%",
    //       scrub: 3,
    //       // markers: true,
    //     },
    //   });

    //   timeline
    //     .from(headingRef.current, {
    //       y: 100,
    //       opacity: 0,
    //       duration: 0.6,
    //       ease: "back.out(1.7)",
    //     })
    //     .from(
    //       frontendHeadingRef.current,
    //       {
    //         x: 100,
    //         opacity: 0,
    //         duration: 0.6,
    //         ease: "back.out(1.7)",
    //       },
    //       "-=0.3"
    //     )
    //     .from(
    //       frontendSkillsRef.current.children,
    //       {
    //         x: 100,
    //         opacity: 0,
    //         duration: 0.6,
    //         ease: "power2.out",
    //       },
    //       "-=0.3"
    //     );
    // },
    // { scope: sectionRef }
  });

  const frontendSkills = [
    { name: "HTML", src: "html.svg" },
    { name: "CSS", src: "css.svg" },
    { name: "JavaScript", src: "javascript.svg" },
    { name: "TypeScript", src: "typescript.svg" },
    { name: "Bootstrap", src: "bootstrap.svg" },
    { name: "Tailwind CSS", src: "tailwind.svg" },
    { name: "Motion", src: "motion.svg" },
    { name: "GSAP", src: "gsap.svg" },
    { name: "React", src: "react.svg" },
    { name: "Next.js", src: "next.png" },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen px-6 py-12 flex flex-col items-center"
    >
      <h2
        ref={headingRef}
        className="text-4xl font-bold mb-10 text-center md:text-6xl md:mb-15"
      >
        My Skills
      </h2>

      <div className="w-full max-w-4xl">
        <h4
          ref={frontendHeadingRef}
          className="text-2xl font-semibold mb-8 text-center md:text-3xl md:mb-12"
        >
          Frontend
        </h4>
        <ul
          ref={frontendSkillsRef}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
        >
          {frontendSkills.map((skill, idx) => (
            <li
              key={idx}
              className="backdrop-blur-sm bg-black/50 p-6 rounded-lg border border-white/10 flex flex-col items-center justify-center hover:bg-black/70 hover:border-white/20"
            >
              <img
                src={skill.src}
                alt={skill.name}
                className="w-16 h-16 object-contain mb-3 md:w-20 md:h-20"
              />
              <span className="text-sm font-medium text-gray-300 md:text-base">
                {skill.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
