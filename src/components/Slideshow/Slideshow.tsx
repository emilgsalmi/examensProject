// Importing React components and styles
import React, { useState } from 'react'
import SlideshowItem from './SlideshowItems'
import { SingleProductProps } from '../singleProduct'
import "../../styles/components/slideshow/slideshow.style.scss"

// Interface defining the props for the Slideshow component
interface SlideshowProps {
  products:SingleProductProps[]
}

// Slideshow component
const Slideshow: React.FC<SlideshowProps> = ({ products }) => {

  // State to keep track of the current index in the slideshow
  const [currentIndex, setCurrentIndex] = useState(0)

  // Function to navigate to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  // Function to navigate to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  // Render the Slideshow component
  return (
    <div className="slideshow">
      {/* Button to navigate to the previous slide */}
      <button id='prevSlide' onClick={prevSlide}>&lt;</button>
      {/* Rendering the current slide using SlideshowItem component */}
      <SlideshowItem product={products[currentIndex]} />
      {/* Button to navigate to the next slide */}
      <button id='nextSlide' onClick={nextSlide}>&gt;</button>
    </div>
  )
}

export default Slideshow


