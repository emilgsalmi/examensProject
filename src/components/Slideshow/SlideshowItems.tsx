// SlideshowItem.tsx
import React from 'react';
import { SingleProduct, SingleProductProps } from '../singleProduct';

interface SlideshowItemProps {
  product: SingleProductProps;
}

const SlideshowItem: React.FC<SlideshowItemProps> = ({ product }) => {
  return (
    <div>
      <SingleProduct {...product} />
    </div>
  );
}

export default SlideshowItem;

