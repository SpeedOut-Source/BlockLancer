/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

const images = ['/images/product1.jpg', '/images/product2.jpg'];
const leftArrowImg = '/images/leftarr.png';
const rightArrowImg = '/images/rightarr.png';
const userImage = '/images/user.png';
const gigTitle = 'I can edit your photos and videos';

const productTitle = 'Product Title';
const sellerName = 'Seller Name';
const productDetails = 'Product Details';
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
    <div className="flex flex-col">
  <div className="flex m-5 flex-col lg:flex-row xl:mx-20">
    <div className="flex flex-col">
      <p className="rounded-xl ml-5 w-fit font-bold text-black bg-violet-400 p-2 px-10">
        Sell Post
      </p>
      <p className="font-medium text-2xl text-white ml-5 mt-5">{gigTitle}</p>
      <div className="flex items-center ml-5">
        <img
          src={userImage}
          alt="user"
          className="rounded-full h-10 mt-2.5 w-10 mr-2"
        />
        <p className="text-gray-400 mt-2.5">{sellerName}</p>
      </div>

      <div className="flex items-center mt-5">
        <img
          src={leftArrowImg}
          alt="left"
          onClick={prevImage}
          className="max-h-10 w-auto z-50 -mr-5 rounded-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer"
        />
        {currentImage && (
          <img
            src={currentImage}
            alt="Product"
            className="z-0 max-h-36 md:max-h-48 lg:max-h-56 xl:max-h-80 w-auto rounded-xl"
          />
        )}
        <img
          src={rightArrowImg}
          alt="right"
          onClick={nextImage}
          className="max-h-10 -ml-5 lg:mr-5 w-auto z-50 rounded-xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer"
        />
      </div>
    </div>

    <div className="hidden lg:flex w-1/2 items-center h-auto">
      <div className="overflow-x-auto mt-24 border-2 rounded-md lg:max-w-lg xl:max-w-xl">
        <table className="table">
          <thead>
            <tr className="bg-zinc-500 font-extrabold text-black">
              <th></th>
              <th colSpan={2}>Features</th>
              <th>Basic</th>
              <th>Premium</th>
              <th>Deluxe</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, label: 'Description', basic: 'I will do this but only this', premium: 'I will do this but also do this', deluxe: 'I will do everything' },
              { id: 2, label: 'Duration', basic: '5 days', premium: '3 days', deluxe: '2 days' },
              { id: 3, label: 'Revisions', basic: 'None', premium: '2', deluxe: '4' },
              { id: 4, label: 'Feature 1', basic: '❌', premium: '✔️', deluxe: '✔️' },
              { id: 5, label: 'Feature 2', basic: '❌', premium: '❌', deluxe: '✔️' },
              { id: 6, label: 'Feature 3', basic: '❌', premium: '❌', deluxe: '✔️' },
              { id: 7, label: 'Price', basic: '500 XLM', premium: '1000 XLM', deluxe: '1200 XLM' },
            ].map((item) => (
              <tr key={item.id} className="hover">
                <th>{item.id}</th>
                <td colSpan={2}>{item.label}</td>
                <td>{item.basic}</td>
                <td>{item.premium}</td>
                <td>{item.deluxe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="flex lg:hidden w-auto items-center justify-center h-auto">
      <div className="overflow-x-auto mt-20 border-2 rounded-md">
        <table className="table">
          <thead>
            <tr className="bg-zinc-500 font-extrabold text-black">
              <th></th>
              <th colSpan={2}>Features</th>
              <th>Basic</th>
              <th>Premium</th>
              <th>Deluxe</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, label: 'Description', basic: 'I will do this but only this', premium: 'I will do this but also do this', deluxe: 'I will do everything' },
              { id: 2, label: 'Duration', basic: '5 days', premium: '3 days', deluxe: '2 days' },
              { id: 3, label: 'Revisions', basic: 'None', premium: '2', deluxe: '4' },
              { id: 4, label: 'Feature 1', basic: '❌', premium: '✔️', deluxe: '✔️' },
              { id: 5, label: 'Feature 2', basic: '❌', premium: '❌', deluxe: '✔️' },
              { id: 6, label: 'Feature 3', basic: '❌', premium: '❌', deluxe: '✔️' },
              { id: 7, label: 'Price', basic: '500 XLM', premium: '1000 XLM', deluxe: '1200 XLM' },
            ].map((item) => (
              <tr key={item.id} className="hover">
                <th>{item.id}</th>
                <td colSpan={2}>{item.label}</td>
                <td>{item.basic}</td>
                <td>{item.premium}</td>
                <td>{item.deluxe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div className="flex flex-col justify-center items-center">
    <div className="mb-2 font-extrabold">Choose your order</div>
    <div className="flex gap-x-5">
      <button className="btn btn-outline btn-primary">Basic</button>
      <button className="btn btn-outline btn-secondary">Premium</button>
      <button className="btn btn-outline btn-accent">Deluxe</button>
    </div>
  </div>
</div>

  );
};

export default SellGig;
