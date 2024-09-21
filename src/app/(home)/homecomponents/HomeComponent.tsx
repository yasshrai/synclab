"use client";

import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Features from "./Features";

const HomeComponent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-200 dark:bg-zinc-950">
      <NavigationBar></NavigationBar>
      <main className="flex-1">
        <section
          id="home"
          className="py-20 md:py-32 bg-slate-200 dark:bg-zinc-950"
        >
          <HeroSection></HeroSection>
        </section>

        <section id="features" className="py-20 bg-slate-200 dark:bg-zinc-950">
          <Features></Features>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default HomeComponent;
