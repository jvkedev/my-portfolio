"use client";

import Hero from "@/components/Hero/Hero";
import Header from "../components/Header/Header";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";

const page = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
    </>
  );
};

export default page;
