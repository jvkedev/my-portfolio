import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const logoRef = useRef<HTMLHeadingElement | null>(null);
  const menuRef = useRef<HTMLImageElement | null>(null);
  const crossRef = useRef<HTMLImageElement | null>(null);
  const menuItemsRef = useRef<HTMLUListElement | null>(null);

  // Timeline Ref
  const mobileTl = useRef<gsap.core.Timeline | null>(null); // Mobile Timeline
  const desktopTl = useRef<gsap.core.Timeline | null>(null); // Desktop TImeline

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Mobile menu animation
    mm.add("(max-width: 767px)", () => {
      mobileTl.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, {
          y: -20,
          autoAlpha: 0,
          duration: 0.25,
        })
        .to(
          menuItemsRef.current,
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.35,
          },
          "<"
        )
        .from(menuItemsRef.current!.children, {
          x: 100,
          opacity: 0,
          stagger: 0.1,
        })
        .fromTo(
          crossRef.current,
          { autoAlpha: 0, rotate: -90 },
          { autoAlpha: 1, rotate: 0 },
          "<"
        );
    });

    // Desktop animation
    mm.add("(min-width: 768px)", () => {
      desktopTl.current = gsap.timeline();
      desktopTl.current
        .from(logoRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.7,
          delay: 0.6,
          ease: "power2.out",
        })
        .from(
          menuItemsRef.current!.children,
          {
            y: -50,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
          },
          "<+=0.4"
        );
    });

    return () => mm.revert();
  });

  useGSAP(
    () => {
      if (!mobileTl.current) return;
      isOpen ? mobileTl.current.play() : mobileTl.current.reverse();
    },
    { dependencies: [isOpen] }
  );

  return (
    <nav className="flex justify-between items-center p-6 h-[10vh] bg-black/80 fixed top-0 w-screen z-1">
      <h1 ref={logoRef} className="text-3xl font-bold">
        JvkeDev
      </h1>

      <img
        ref={menuRef}
        src="menu.svg"
        alt="menu"
        className="w-10 cursor-pointer md:hidden absolute right-6"
        onClick={() => setIsOpen(true)}
      />

      <img
        ref={crossRef}
        src="cross.svg"
        alt="close"
        className="w-10 cursor-pointer md:hidden opacity-0"
        onClick={() => setIsOpen(false)}
      />

      <ul
        ref={menuItemsRef}
        className="
          fixed top-[10vh] right-0
          w-2/3 h-[90vh]
          bg-black/30 backdrop-blur-xs
          text-2xl font-semibold p-7
          flex flex-col space-y-5
          opacity-0 translate-x-full

          md:static md:h-auto md:w-auto
          md:flex-row md:items-center
          md:space-y-0 md:space-x-10
          md:opacity-100 md:translate-x-0
        "
      >
        <li>Hero</li>
        <li>About</li>
        <li>Projects</li>
        <li>Skills</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default Header;
