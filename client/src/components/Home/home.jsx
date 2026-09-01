import React from "react";
import Hero from "./Hero";
import Team from "./Team";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";

export default function Home({ revealed }) {
  return (
    <div className="home-page">
      <Hero revealed={revealed} />
      <Team />
      <Gallery />
      <Testimonials />
    </div>
  );
}
