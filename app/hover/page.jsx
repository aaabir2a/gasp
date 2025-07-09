"use client";
import React, { useEffect } from "react";
import gsap from "gsap";

export default function HoverLetterStagger() {
  useEffect(() => {
    const elements = document.querySelectorAll(".animated-text");

    elements.forEach((el) => {
      const text = el.innerText;
      el.innerHTML = text
        .split("")
        .map((char) => {
          const space = char === " " ? "&nbsp;" : char;
          return `<span class="char">${space}</span>`;
        })
        .join("");

      const chars = el.querySelectorAll(".char");

      chars.forEach((char) => {
        char.addEventListener("mouseenter", () => {
          gsap.fromTo(
            char,
            { y: 0, color: "#ffffff" },
            {
              y: -20,
              color: "#FFD700",
              duration: 0.3,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            }
          );
        });
      });
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white space-y-10">
      <h1 className="animated-text text-4xl font-bold text-center cursor-pointer">
        Hover Over DreamTourism
      </h1>
      <h1 className="animated-text text-4xl font-bold text-center cursor-pointer">
        Explore Beautiful Places
      </h1>
    </section>
  );
}
