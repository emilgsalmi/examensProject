// Importing React and components
import React from 'react'
import { SingleProduct, SingleProductProps } from '../singleProduct'

// Interface defining the props for the SlideshowItem component
interface SlideshowItemProps {
  product: SingleProductProps;
}

// SlideshowItem component
const SlideshowItem: React.FC<SlideshowItemProps> = ({ product }) => {
  // Render the SlideshowItem, using the SingleProduct component
  return (
    <div>
      {/* Rendering the SingleProduct component with the props from the SlideshowItem */}
      <SingleProduct {...product} />
    </div>
  )
}

export default SlideshowItem
