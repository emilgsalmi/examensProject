// Slideshow.tsx
import React, { useState } from 'react';
import SlideshowItem from './SlideshowItems';
import { SingleProductProps } from '../singleProduct';
import "../../styles/components/slideshow/slideshow.style.scss"

interface SlideshowProps {
  products:SingleProductProps[];
}

const Slideshow: React.FC<SlideshowProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div className="slideshow">
      <button id='prevSlide' onClick={prevSlide}>&lt;</button>
      <SlideshowItem product={products[currentIndex]} />
      <button id='nextSlide' onClick={nextSlide}>&gt;</button>
    </div>
  );
}

export default Slideshow;


