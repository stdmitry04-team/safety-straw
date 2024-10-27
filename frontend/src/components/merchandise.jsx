import { useState } from 'react';
import "../styles/merchandise.css";
import MerchandiseTitle from '../assets/merchandise-title.svg';
import Hat from '../assets/blue-hat.svg';
import Car from '../assets/car.svg';
import Visor from '../assets/mini-hat.svg';
import ComingSoon from '../assets/coming-out.svg';
import Shirt from '../assets/shirt.svg';
import Hoodie from '../assets/hoodie.svg';

import LeftArrow from '../assets/left-slider-arrow.svg';
import RightArrow from '../assets/right-slider-arrow.svg';


const products = [
    { id: 1, name: 'SAFETY STRAW HAT MESH BACK', image: Hat },
    { id: 2, name: 'SAFETY STRAW CAR STICKER', image: Car },
    { id: 3, name: 'SAFETY STRAW VISOR (BLACK)', image: Visor },
    { id: 4, name: 'NEW ITEM COMING OUT SOON!!', image: ComingSoon },
    { id: 5, name: 'SAFETY STRAW SHIRT (BLUE)', image: Shirt },
    { id: 6, name: 'SAFETY STRAW SWEATSHIRT (BLACK)', image: Hoodie },
    //Same products for the second page with different IDs
    { id: 1, name: 'SAFETY STRAW HAT MESH BACK', image: Hat },
    { id: 2, name: 'SAFETY STRAW CAR STICKER', image: Car },
    { id: 3, name: 'SAFETY STRAW VISOR (BLACK)', image: Visor },
    { id: 4, name: 'NEW ITEM COMING OUT SOON!!', image: ComingSoon },
    { id: 5, name: 'SAFETY STRAW SHIRT (BLUE)', image: Shirt },
    { id: 6, name: 'SAFETY STRAW SWEATSHIRT (BLACK)', image: Hoodie }
  ];

const allProducts = [...products, ...products];

  function Merchandise() {
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 6;  // Number of products per page
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getVisibleProducts = () => {
        const start = currentPage * productsPerPage;
        const end = start + productsPerPage;
        return products.slice(start, end);  // Show 6 products per page
    };

    return (
        <div className="merchandise-section">
            <img src={MerchandiseTitle} alt="TitleLogo" className="merchandise-title" />
        
            <div className="merchandise-container">
                {currentPage > 0 && (
                    <button className="arrow left-arrow" onClick={handlePrevPage}>
                       <img src={LeftArrow} alt="Previous" className="arrow-icon" />
                    </button>
                )}

                <div className="merchandise-items-wrapper">
                    <div
                        className="merchandise-items"
                        style={{ transform: `translateX(-${currentPage * 100}%)`, transition: 'transform 0.7s ease-in-out' }}
                    >
                        <div className="page">
                            {getVisibleProducts().map((product) => (
                                <div key={product.id} className={`product-box product-box-${product.id}`}>
                                    <img src={product.image} alt={product.name} className={`product-image product-image-${product.id}`} />
                                    
                                    {product.id === 4 && (
                                        <div className="coming-soon-overlay">
                                            <p className="coming-soon-text">COMING OUT SOON</p>
                                        </div>
                                    )}

                                    <button className={`add-to-cart add-to-cart-${product.id}`}>ADD TO CART</button>
                                    
                                    <div className={`product-description product-description-${product.id}`}>
                                        <p className={`product-name product-name-${product.id}`}>{product.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {currentPage < totalPages - 1 && (
                    <button className="arrow right-arrow" onClick={handleNextPage}>
                        <img src={RightArrow} alt="Next" className="arrow-icon" />
                    </button>
                )}
            </div>
            <div className="view-more-container">
                <button className="view-more-button">View More</button>
            </div>
        </div>
    );
}

export default Merchandise;

