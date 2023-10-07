import React, { useState } from 'react';
import Image from 'next/image';

const images = [
    '/images/product1.jpg',
    '/images/product2.jpg'
];
const leftarr = '/images/leftarr.png';
const rightarr = '/images/rightarr.png';
const userimg = '/images/user.png';


const productTitle = 'Product Title';
const sellerName = 'Seller Name';
const productDetails = 'Product Details';
const deliveryTime = '2-3 days';

const SellGig: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const currentImage = images[currentImageIndex];

  return (
    <>
    <div className="flex justify-center items-center space-x-4">
        <div className='flex flex-row items-center'>
            <Image
                src={leftarr} height={20} width={20} alt="left" onClick={prevImage}
                className="max-h-96 w-auto mb-4 rounded-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer"/>
            <Image
              src={currentImage} height={250} width={200} alt="Product"
              className="max-h-96 w-auto mb-4 rounded-xl"/>
            <Image
                src={rightarr} height={20} width={20} alt="right" onClick={nextImage}
                className="max-h-96 w-auto mb-4 rounded-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer"/>
        </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-extraboldnpm mb-2">{productTitle}</h2>
        <div className='flex items-center'>
          <Image src={userimg} height={40} width={40} alt="user" className="rounded-full mr-2"/>
        <p className="text-gray-600 mb-2">{sellerName}</p>
        </div>
        <p className="text-gray-600 mb-2">{productDetails}</p>
        <p className="text-gray-600">{deliveryTime}</p>
        </div>
    </div>

    </>
  );
};

export default SellGig;
