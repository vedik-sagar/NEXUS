import React, { useRef } from "react";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const page1Ref = useRef(null);

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: page1Ref.current,
        start: "top top",
        end: "100%",
        scrub: 1,
        pin: true,
      },
    });
  
    // Animations for .d-r and .d-l
    tl.to(".d-r", { x: "100vw", duration: 3, ease: "power3.inOut" })
      .to(".d-l", { x: "-100vw", duration: 3, ease: "power3.inOut" }, "<")
      .addLabel("outOfScreen");
  
    // Flash effect while background is changing
    tl.to(".flash", { opacity: 1, duration: 0.3, ease: "power3.inOut" }) // Flash in
      .to(page1Ref.current, {
        backgroundImage: 'url("images/new_background.png")',
        duration: 3,  
        ease: "power3.inOut",
      })
      .to(".flash", { opacity: 0, duration: 0.2, ease: "power3.inOut" }, ">"); // Flash out
  
    tl.fromTo(
      ".logo",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, duration: 2, ease: "power3.inOut", scale: 1.4 },
      "<"
    ).fromTo(
      ".nexus_text",  
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1.1, duration: 3, ease: "power3.inOut" },
      "<"
    );
  });
  

  return (
    <div className="main">  
      <div ref={page1Ref} className="page1">
      <div className="flash"></div> 
        <div className="d-r"></div>
        <div className="d-l"></div>
        <div className="logo"></div>
        <div className="nexus_text"></div>
        <div className="scroll_gif"></div>
        <div className="tag_line"></div>
      </div>
    </div>
  );
};

export default App;
