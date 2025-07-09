"use client";
import React, { useLayoutEffect, useRef, useEffect, useCallback } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HoverLetterStagger from "./hover/page";
import { Tween } from "gsap/gsap-core";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const main = useRef();
  const smoother = useRef();
  const textRef = useRef();

  useEffect(() => {
    const el = textRef.current;
    const text = el.innerText;
    el.innerHTML = text
      .split("")
      .map((char) => {
        const space = char === " " ? "&nbsp;" : char;
        return `<span class="char">${space}</span>`;
      })
      .join("");

    gsap.fromTo(
      el.querySelectorAll(".char"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
          scroller: "#smooth-wrapper", // Enable support for ScrollSmoother
          snap: {
            snapTo: 1 / 10, // progress increment
            // or "labels" or function or Array
            duration: 0.5,
            directional: true,
            ease: "power3",
            onComplete: useCallback,
            // other callbacks: onStart, onInterrupt
          },
        },
      }
    );
  }, []);

  const scrollTo = () => {
    smoother.current.scrollTo(".box-c", true, "center center");
  };

  useGSAP(
    () => {
      smoother.current = ScrollSmoother.create({
        smooth: 2,
        effects: true,
      });
      ScrollTrigger.create({
        trigger: ".box-c",
        pin: true,
        start: "center center",
        end: "+=300",
        markers: true,
      });
    },
    {
      scope: main,
    }
  );

  return (
    <>
      <div id="smooth-wrapper" ref={main}>
        <div id="smooth-content">
          <header className="header">
            <HoverLetterStagger />
            <h1 className="title">GreenSock ScrollSmoother on a NextJS App</h1>

            <h1
              ref={textRef}
              className="text-4xl font-bold text-center px-6 leading-snug text-white"
              style={{ display: "inline-block" }}
            >
              Welcome to DreamTourism
            </h1>

            <button className="button" onClick={scrollTo}>
              Jump to C
            </button>
          </header>
          <div className="box box-a" data-speed="0.5">
            a
          </div>
          <div className="box box-b" data-speed="0.8">
            b
          </div>
          <div className="box box-c" data-speed="1.5">
            c
          </div>
          <div className="line"></div>
        </div>
      </div>

      <footer>
        <a href="https://greensock.com/scrollsmoother">
          <img
            className="greensock-icon"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/scroll-smoother-logo-light.svg"
            width="220"
            height="70"
          />
        </a>
      </footer>
    </>
  );
}
