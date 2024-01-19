// SlideshowItem.tsx
import React from 'react';
import { SingleProduct, ProductProps } from '../singleProduct';

interface SlideshowItemProps {
  product: ProductProps;
}

const SlideshowItem: React.FC<SlideshowItemProps> = ({ product }) => {
  return (
    <div>
      <SingleProduct {...product} />
    </div>
  );
}

export default SlideshowItem;

