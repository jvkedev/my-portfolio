import { useState, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Refs for animaiton DOM elements
  const logoRef = useRef<HTMLHeadingElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);  // mobile menu icon
  const crossRef = useRef<HTMLDivElement | null>(null); // mobile close icon
  const menuItemsRef = useRef<HTMLUListElement | null>(null);

  // Timeline to control GSAP animation
  const mobileTl = useRef<gsap.core.Timeline | null>(null); // mobile Timeline
  const desktopTl = useRef<gsap.core.Timeline | null>(null); // desktop TImeline

  // Setup GSAP animations based on viewport size
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Mobile menu animation
    mm.add("(max-width: 767px)", () => {
      mobileTl.current = gsap
        .timeline({ paused: true })
        // hide menu icon
        .to(menuRef.current, {
          y: -20,
          autoAlpha: 0,
          duration: 0.25,
        })
        // show menu panel
        .to(
          menuItemsRef.current,
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.35,
          },
          "<"
        )
        // stagger menu items
        .from(menuItemsRef.current!.children, {
          x: 100,
          opacity: 0,
          stagger: 0.1,
        })
        // show close icon
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
      // logo slide in
        .from(logoRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.7,
          delay: 0.6,
          ease: "power2.out",
        })
        // menu items slide in
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

    return () => mm.revert(); // cleanup on unmount
  });

  // Play or reverse mobile menu timeline when isOpen changes
  useGSAP(
    () => {
      if (!mobileTl.current) return;

      if (isOpen) {
        mobileTl.current.play();
      } else {
        mobileTl.current.reverse();
      }
    },
    { dependencies: [isOpen] }
  );

  return (
    <nav className="flex justify-between items-center p-6 h-[10vh] bg-black /50 fixed top-0 w-screen z-1">
      {/* Logo */}
      <h1 ref={logoRef} className="text-3xl font-bold">
        JvkeDev
      </h1>
    {/* Mobile menu icon */}
      <div
        ref={menuRef} // Animate this div
        className="absolute right-6 md:hidden w-10 h-10 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="/menu.svg"
          alt="menu"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

    {/* Mobile close icon */}
      <div
        ref={crossRef}
        className="absolute right-6 md:hidden w-10 h-10 cursor-pointer opacity-0"
        onClick={() => setIsOpen(false)}
      >
        <Image
          src="/close.svg"
          alt="close"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

    {/* Mobile items (mobile % desktop) */}
      <ul
        ref={menuItemsRef}
        className="
          fixed top-[10vh] right-0
          w-2/3 h-[90vh]
          bg-black/50 backdrop-blur-xs 
          text-2xl font-semibold p-7
          flex flex-col space-y-5
          opacity-0 translate-x-full

          md:static md:h-[10vh] md:w-auto
          md:flex-row md:items-center
          md:space-y-0 md:space-x-10
          md:opacity-100 md:translate-x-0
          md:bg-transparent
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
