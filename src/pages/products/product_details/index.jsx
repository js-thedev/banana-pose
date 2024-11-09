import { useRef } from 'react';
import Flickity from 'flickity';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import SizeChartDrawer from '@/pages/products/product_details/size_chart_drawer/index.jsx';

import '@/pages/products/product_details/index.scss';

import products from '@/data/products.json';

function ProductDetails() {
  // Navigation
  // const { productId } = useParams();
  const productId = 't-shirt-01';
  const product = products.find((prod) => prod.id === productId);

  // Size Guide
  const sizeChartRef = useRef();
  const handleSizeGuideClick = () => {
    if (sizeChartRef.current) {
      sizeChartRef.current.open();
    }
  };

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-details page">
      <div className="product-gallery">product-gallery</div>
      <div className="product-info-wrapper">
        <div className="product-info">
          <div className="product-metadata">
            <div className="product-name">{product.name}</div>
            <div className="product-price">${product.price}</div>
          </div>
          <div className="product-order-form">
            <div className="product-color">Color: {product.color}</div>
            <div className="size-guide-wrapper  text-right">
              <div
                className="size-guide normal-link"
                onClick={handleSizeGuideClick}
              >
                Size Guide
              </div>
            </div>
            {/* TODO: Implement Select Size function */}
            <button className="size-select-button">
              <div className="size-select-button-text">Select Size</div>
              <FontAwesomeIcon className="down-shape" icon={faChevronDown} />
            </button>
          </div>
          {/* TODO: Implement Buy Button function */}
          <button className="buy-button">Add to Shopping Bag</button>
          <div className="product-description-wrapper">
            <div className="product-description">{product.description}</div>
          </div>
          {/* TODO: Implement product details enlarging list */}
          <div className="product-details-list-wrapper">
            <div className="product-details-list">Product details</div>
          </div>
          {/* TODO: Implement care instruction enlarging list */}
          <div className="product-care-wrapper">
            <div className="product-care">Care instructions</div>
          </div>
        </div>
      </div>
      <SizeChartDrawer ref={sizeChartRef} />
    </div>
  );
}

export default ProductDetails;
