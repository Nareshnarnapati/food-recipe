import React from 'react';
import "./index.css";

const ProductCard = ({ productData, onClick }) => {
  const { label, image, cuisineType, dishType } = productData;

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <img src={image} alt={label} className='poster-design'/>
      </div>
      <div className="product-details">
        <h2 className="span-line">{label}</h2>
        <p className="over-view">
          CuisineType: <span className='span-line2'>{cuisineType}</span>
        </p>
        <p className="over-view">
          dishType: <span className='span-line2'>{dishType}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
