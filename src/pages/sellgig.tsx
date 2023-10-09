import React, { useState } from 'react';
import Image from 'next/image';

const images = ['/images/product1.jpg', '/images/product2.jpg'];
const leftArrowImg = '/images/leftarr.png'; // Renamed variable
const rightArrowImg = '/images/rightarr.png'; // Renamed variable
const userImage = '/images/user.png'; // Renamed variable
const gigTitle = 'I can edit your photos and videos';

const productTitle = 'Product Title';
const sellerName = 'Seller Name';
const productDetails = 'Product Details'; // Removed unnecessary "getdesc()" function
const deliveryTime = '2-3 days';
const productAbout = [
  'A catchy intro',
  'A brief overview',
  'A call to action',
];

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
      <div className="flex flex-col">
        <div className="flex flex-col justify-start ml-10 mt-4 gap-y-4">
          <p className="rounded-xl w-fit font-bold text-black bg-violet-400 p-2 px-10">
            Sell Post
          </p>
          <p className="font-medium text-2xl text-white">{gigTitle}</p> {/* Increased text size */}
          <div>
            <div className="flex items-center">
              <Image
                src={userImage}
                height={40}
                width={40}
                alt="user"
                className="rounded-full mr-2"
              />
              <p className="text-gray-400 mb-2">{sellerName}</p>
            </div>
          </div>

          <div className="flex flex-row mt-5 items-center">
            <div className="flex flex-row items-center -space-x-4">
              <Image
                src={leftArrowImg}
                height={20}
                width={20}
                alt="left"
                onClick={prevImage}
                className="max-h-96 w-auto z-50 rounded-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer"
              />
              <Image
                src={currentImage}
                height={350}
                width={300}
                alt="Product"
                className="z-0 max-h-96 w-auto rounded-xl"
              />
              <Image
                src={rightArrowImg}
                height={20}
                width={20}
                alt="right"
                onClick={nextImage}
                className="max-h-96 w-auto z-50 rounded-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer"
              />
            </div>

            <div className="flex flex-col w-full ml-10">
              <h2 className="text-2xl font-bold text-white mb-2">{productTitle}</h2>
              <h2 className="text-2xl font-light text-white mb-2">Details:</h2>
              <p className="text-2xl font-bold text-white mb-2">{productDetails}</p> {/* Increased text size */}
              <p className="text-gray-400">Delivery time: {deliveryTime}</p>
              <button className="btn btn-outline w-fit px-7 my-2 hover:scale-105 transition duration-300 ease-in-out hover:px-10 btn-warning">
                Confirm
              </button>
            </div>
          </div>

          <div className='flex flex-col ml-4'>
            <h2 className="text-2xl font-bold text-white mb-2">About work:</h2>
            <ul className="list-disc text-gray-400 pl-5">
              {productAbout.map((item, index) => (
                <li key={index} className="text-gray-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellGig;
