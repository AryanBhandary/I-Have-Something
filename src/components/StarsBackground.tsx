import React, { useEffect, useState } from "react";
import flower1 from "../assets/flower1.png";
import flower2 from "../assets/flower2.png";
import flower3 from "../assets/flower3.png";
import flower4 from "../assets/flower4.png";
import image from "../assets/image.png"; // your image

const StarsBackground: React.FC = () => {
  const numStars = 100;
  const [stars, setStars] = useState(
    Array.from({ length: numStars }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1.5,
      speed: Math.random() * 0.05 + 0.006,
      opacity: Math.random() * 0.5 + 0.3,
    }))
  );

  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; angle: number; distance: number; active: boolean; opacity: number }[]
  >([]);
  const [animateFlowers, setAnimateFlowers] = useState(false);
  const [showBouquetText, setShowBouquetText] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const message = "Haina Hola";
  const flowers = [flower1, flower2, flower3, flower4, flower1, flower2, flower3, flower4];

  const bouquetOffsets = [
    { x: -120, y: -40, rotate: "-35deg" },
    { x: -80, y: -30, rotate: "-25deg" },
    { x: -50, y: -20, rotate: "-15deg" },
    { x: -20, y: -10, rotate: "-5deg" },
    { x: 20, y: -10, rotate: "5deg" },
    { x: 50, y: -20, rotate: "15deg" },
    { x: 80, y: -30, rotate: "25deg" },
    { x: 120, y: -40, rotate: "35deg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star) => {
          let newLeft = star.left + star.speed;
          if (newLeft > 100) newLeft = 0;
          return { ...star, left: newLeft };
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setClicked(true);

    // Particle explosion
    const numParticles = 100;
    const newParticles = Array.from({ length: numParticles }).map(() => ({
      x: 50,
      y: 55,
      size: Math.random() * 2 + 1.5,
      angle: Math.random() * 2 * Math.PI,
      distance: Math.random() * 300 + 100,
      active: false,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setParticles(newParticles);

    setTimeout(() => {
      setParticles((prev) => prev.map((p) => ({ ...p, active: true })));
    }, 50);

    // Animate flowers and text together
    setTimeout(() => {
      setAnimateFlowers(true);
      setShowBouquetText(true);

      // Fade in image after flowers/text animation
      setTimeout(() => {
        setShowImage(true);
      }, 500); // adjust timing if needed
    }, 1500);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">

      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
            background: "radial-gradient(circle, #fff, rgba(255,255,255,0))",
          }}
        />
      ))}

      {/* Glowing initial text */}
      <h1
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-12
                   text-white text-4xl md:text-5xl font-sans font-semibold tracking-wide text-center
                   whitespace-nowrap"
        style={{
          textShadow: `
            0 0 5px #fff,
            0 0 15px #fff,
            0 0 30px #fff,
            0 0 60px #fff
          `,
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
               hover:shadow-[0_0_40px_rgba(255,255,255,0.6),0_0_80px_rgba(255,255,255,0.3)]
               hover:scale-105
               z-50" // <-- add this
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
            background: "radial-gradient(circle, #fff, rgba(255,255,255,0))",
            opacity: p.active ? 0 : p.opacity,
            transform: p.active
              ? `translate(${p.distance * Math.cos(p.angle)}px, ${p.distance * Math.sin(p.angle)}px)`
              : "translate(0, 0)",
            transition: "transform 3s ease-out, opacity 3s ease-out",
          }}
        />
      ))}

      {/* Bouquet text */}
      <div
        className="absolute w-full text-center text-3xl md:text-4xl font-sans font-semibold whitespace-nowrap"
        style={{
          top: showBouquetText ? "10%" : "-10%",
          opacity: showBouquetText ? 1 : 0,
          transition: "top 2s ease-out, opacity 2s ease-out",
          textShadow: `
            0 0 5px #fff,
            0 0 15px #fff,
            0 0 30px #fff,
            0 0 60px #fff
          `,
          color: "#fff",
        }}
      >
        {message.split(" ").map((word, i) => (
          <span
            key={i}
            className="inline-block mx-1"
            style={{
              transition: "all 0.8s ease-out",
              transitionDelay: `${i * 0.2}s`,
              transform: showBouquetText ? "translateY(0)" : "translateY(-50px)",
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
          className="absolute w-32 sm:w-36 md:w-40 transform transition-all duration-[1200ms] ease-out"
          style={{
            left: "50%",
            bottom: animateFlowers ? "0%" : "-45%",
            transform: animateFlowers
              ? `translateX(calc(-50% + ${bouquetOffsets[i].x}px)) translateY(${bouquetOffsets[i].y}px) rotate(${bouquetOffsets[i].rotate}) scale(1)`
              : `translateX(-50%) translateY(0) rotate(0deg) scale(0.6)`,
            transitionDelay: `${i * 250}ms`,
            filter: `
              grayscale(100%) 
              brightness(1.2) 
              contrast(1.2) 
              drop-shadow(0 0 10px rgba(255,255,255,0.4))
            `,
          }}
        />
      ))}

      {/* Fade-in image with blend mode */}
      <img
        src={image}
        alt="special"
        className="absolute left-1/2 top-[35%] w-54 md:w-70 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[4000ms]"
        style={{
          opacity: showImage ? 1 : 0,
          mixBlendMode: "screen", // blends nicely with dark background and stars
        }}
      />

    </div>
  );
};

export default StarsBackground;
