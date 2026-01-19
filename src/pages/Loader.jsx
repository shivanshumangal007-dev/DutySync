import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const Loader = () => {
  const introRef = useRef();
  const nameRef = useRef([]);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(introRef.current, {
        duration: 0.5,
        x:100,
        opacity: 0,
        ease: "power2.out",
    })
    .to(nameRef.current, {
        duration: 0.7,
        y: "0",
        stagger: 0.1,
        ease: "power2.out",
    }, "-=0.2")
    .to(".loaderMainDiv", {
        opacity: 0,
        height: 0,
        top: "50%",
        duration: 1,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="loaderMainDiv">
      <h1>
        <span ref={introRef}>INTRODUCING</span>{" "}
        {"DutySync".split("").map((char, idx) => {
          return (
            <span
              className="spanName"
              ref={(el) => (nameRef.current[idx] = el)}
              key={idx}
            >
              {char}
            </span>
          );
        })}
      </h1>
    </div>
  );
};

export default Loader;
