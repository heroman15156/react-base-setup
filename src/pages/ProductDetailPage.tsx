import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanInfo } from "framer-motion";

const ProductDetailPage: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsb3RoaW5nfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNsb3RoaW5nfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGNsb3RoaW5nfGVufDB8fDB8fHww",
  ];

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
      <ImageSlider images={images} />
      <ProductInfo />
    </div>
  );
};

// ImageSlider Component
interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

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

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
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
    <div className="w-full md:w-1/2 h-80 overflow-hidden relative border rounded-lg">
      <AnimatePresence custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Product Image"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

// ProductInfo Component
const ProductInfo: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Stylish Jacket</h2>
      <p className="text-gray-700">
        A trendy jacket made of high-quality materials. Perfect for any season.
      </p>
      <span className="text-xl font-bold text-blue-500">$99.99</span>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
