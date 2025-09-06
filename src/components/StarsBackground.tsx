import React, { useState, useEffect } from "react";
import flower1 from "../assets/flower1.png";
import flower2 from "../assets/flower2.png";
import flower3 from "../assets/flower3.png";
import flower4 from "../assets/flower4.png";
import flower5 from "../assets/flower5.png";
import flower6 from "../assets/flower6.png";
import flower7 from "../assets/flower7.png";
import flower8 from "../assets/flower8.png";
import flower9 from "../assets/flower9.png";
import image from "../assets/image.png";
import bgMusic from "../assets/audio.mp3"; // 🎵 your audio file

const StarsBackground: React.FC = () => {
  const isMobile = window.innerWidth < 768;
  const numStars = isMobile ? 40 : 100;

  const stars = Array.from({ length: numStars }).map(() => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1.5,
    duration: Math.random() * 20 + 20,
    opacity: Math.random() * 0.5 + 0.3,
  }));

  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; angle: number; distance: number; opacity: number; active: boolean }[]
  >([]);
  const [animateFlowers, setAnimateFlowers] = useState(false);
  const [showBouquetText, setShowBouquetText] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const message = "Cheese";
  const flowers = [flower1, flower6, flower3, flower8, flower9, flower2, flower7, flower3, flower4, flower5];

  const bouquetOffsets = [
    { x: -140, y: -50, rotate: "-40deg" },
    { x: -100, y: -40, rotate: "-30deg" },
    { x: -65, y: -30, rotate: "-20deg" },
    { x: -30, y: -50, rotate: "-10deg" },
    { x: 10, y: -90, rotate: "0deg" },
    { x: 30, y: -15, rotate: "10deg" },
    { x: 65, y: -30, rotate: "20deg" },
    { x: 70, y: -50, rotate: "20deg" },
    { x: 100, y: -40, rotate: "25deg" },
    { x: 140, y: -50, rotate: "40deg" },
  ];

  const handleClick = () => {
    setClicked(true);

    const numParticles = isMobile ? 40 : 80;
    const newParticles = Array.from({ length: numParticles }).map(() => ({
      x: 50,
      y: 55,
      size: Math.random() * 2 + 1.5,
      angle: Math.random() * 2 * Math.PI,
      distance: Math.random() * 200 + 80,
      opacity: Math.random() * 0.6 + 0.4,
      active: false,
    }));
    setParticles(newParticles);

    setTimeout(() => {
      setParticles((prev) => prev.map((p) => ({ ...p, active: true })));
    }, 50);

    setTimeout(() => {
      setAnimateFlowers(true);
      setShowBouquetText(true);

      setTimeout(() => {
        setShowImage(true);
      }, 500);
    }, 1500);
  };

  // 🎵 Play music when flowers animate
  useEffect(() => {
    if (animateFlowers) {
      const audio = new Audio(bgMusic);
      audio.loop = true;
      audio.play().catch((err) => console.log("Autoplay blocked:", err));
    }
  }, [animateFlowers]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Stars */}
      <style>
        {`
          @keyframes star-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(100vw); }
          }
        `}
      </style>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
            background: "white",
            animation: `star-move ${star.duration}s linear infinite`,
          }}
        />
      ))}

      {/* Glowing initial text */}
      <h1
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-12
                   text-white text-4xl md:text-5xl font-sans font-semibold tracking-wide text-center
                   whitespace-nowrap"
        style={{
          textShadow: "0 0 8px #fff, 0 0 25px #fff",
          opacity: clicked ? 0 : 1,
          transition: "opacity 2s ease-out",
        }}
      >
        I Have Something
      </h1>

      {/* Click Button */}
      {!clicked && (
        <button
          onClick={handleClick}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12
               px-8 py-3 rounded-xl
               bg-white/10 backdrop-blur-sm
               text-white font-semibold
               transition-all duration-500
               hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]
               hover:scale-105
               z-50"
        >
          Click Me
        </button>
      )}

      {/* Particle explosion */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: "white",
            opacity: p.active ? 0 : p.opacity,
            transform: p.active
              ? `translate(${p.distance * Math.cos(p.angle)}px, ${p.distance * Math.sin(p.angle)}px)`
              : "translate(0, 0)",
            transition: "transform 2s ease-out, opacity 2s ease-out",
          }}
        />
      ))}

      {/* Bouquet text */}
      <div
        className="absolute w-full text-center text-3xl md:text-4xl font-sans font-semibold whitespace-nowrap"
        style={{
          top: showBouquetText ? "10%" : "-10%",
          opacity: showBouquetText ? 1 : 0,
          transition: "top 1.5s ease-out, opacity 1.5s ease-out",
          textShadow: "0 0 8px #fff, 0 0 25px #fff",
          color: "#fff",
        }}
      >
        {message.split(" ").map((word, i) => (
          <span
            key={i}
            className="inline-block mx-1"
            style={{
              transition: "all 0.6s ease-out",
              transitionDelay: `${i * 0.15}s`,
              transform: showBouquetText ? "translateY(0)" : "translateY(-40px)",
              opacity: showBouquetText ? 1 : 0,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Flowers forming bouquet */}
      {flowers.map((flower, i) => (
        <img
          key={i}
          src={flower}
          alt={`flower${i + 1}`}
          className="absolute w-28 sm:w-32 md:w-36 transform transition-all duration-[1000ms] ease-out"
          style={{
            left: "50%",
            bottom: animateFlowers ? "0%" : "-45%",
            transform: animateFlowers
              ? `translateX(calc(-50% + ${bouquetOffsets[i].x}px)) translateY(${bouquetOffsets[i].y}px) rotate(${bouquetOffsets[i].rotate}) scale(1)`
              : `translateX(-50%) translateY(0) rotate(0deg) scale(0.6)`,
            transitionDelay: `${i * 200}ms`,
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
          }}
        />
      ))}

      {/* Fade-in image */}
      <img
        src={image}
        alt="special"
        className="absolute left-1/2 top-[35%] w-56 md:w-96 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[3000ms]"
        style={{
          opacity: showImage ? 1 : 0,
          mixBlendMode: "screen",
        }}
      />

      {/* preload hidden audio */}
      <audio src={bgMusic} loop className="hidden" />
    </div>
  );
};

export default StarsBackground;
