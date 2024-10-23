import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanInfo } from "framer-motion";

const images: string[] = [
  "https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563306778968-5aab577a7365?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563396778968-5aab577a7365?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const AnimatedSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -100) {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (info.offset.x > 100) {
      setDirection(-1);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length,
      );
    }
  };

  return (
    <div
      style={{
        width: "300px",
        overflow: "hidden",
        position: "relative",
        borderRadius: "8px",
      }}
    >
      <AnimatePresence custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Sliding Image"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          drag="x"
          // dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{
            width: "100%",
            height: "auto",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSlider;
