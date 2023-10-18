/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState, useRef } from 'react';

const images = ['/images/product1.jpg', '/images/product2.jpg'];
const arrows = { left: '/images/leftarr.png', right: '/images/rightarr.png' };
const userImage = '/images/user.png';
const gigTitle = 'I can edit your photos and videos';

const productAbout = [
  'A catchy intro',
  'A brief overview',
  'A call to action',
];

const featureData = [
  { id: 1, label: 'Description', basic: 'I will do this but only this', premium: 'I will do this but also do this', deluxe: 'I will do everything', edit: 'edit' },
  { id: 2, label: 'Duration', basic: '5 days', premium: '3 days', deluxe: '2 days', edit: 'edit' },
  { id: 3, label: 'Revisions', basic: 'None', premium: '2', deluxe: '4', edit: 'edit' },
  { id: 4, label: 'Feature 1', basic: '❌', premium: '✔️', deluxe: '✔️', edit: 'edit' },
  { id: 5, label: 'Feature 2', basic: '❌', premium: '✔️', deluxe: '✔️', edit: 'edit' },
  { id: 6, label: 'Feature 3', basic: '❌', premium: '❌', deluxe: '✔️', edit: 'edit' },
  { id: 7, label: 'Price', basic: '500 XLM', premium: '1000 XLM', deluxe: '1200 XLM', edit: 'edit' },
];

const SellGig: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImage(file);
  };

  const openFileInput = () => {
    fileInputRef.current?.click();
  };

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
          <div className="flex items-center justify-between ml-5 mr-10">
            <div className="flex flex-row items-center">
              <img
                src={userImage}
                alt="user"
                className="rounded-full h-10 mt-2.5 w-10 mr-2"
              />
              <p className="text-gray-400 mt-2.5">Seller Name</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 m-2 mx-28">
            {images.map((image, index) => (
              <div key={index} className="flex justify-center gap-x-5 hover:bg-slate-500 hover:bg-opacity-30">
                <p>{`Choose photo ${index + 1}`}</p>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <button
                  onClick={openFileInput}
                  className="border-2 px-2 bg-slate-700 rounded-xl border-transparent text-blue-400 underline"
                >
                  Upload Image
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center mt-5">
            <img
              src={arrows.left}
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
              src={arrows.right}
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
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {featureData.map((item) => (
                  <tr key={item.id} className="hover">
                    <th>{item.id}</th>
                    <td colSpan={2}>{item.label}</td>
                    <td>{item.basic}</td>
                    <td>{item.premium}</td>
                    <td>{item.deluxe}</td>
                    <td>
                      <Link href="#" className="underline text-blue-600 hover:text-white hover:scale-105 bg-violet-900 p-1 rounded-xl">
                        {item.edit}
                      </Link>
                    </td>
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
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {featureData.map((item) => (
                  <tr key={item.id} className="hover">
                    <th>{item.id}</th>
                    <td colSpan={2}>{item.label}</td>
                    <td>{item.basic}</td>
                    <td>{item.premium}</td>
                    <td>{item.deluxe}</td>
                    <td>
                      <Link href="#" className="underline text-blue-600 hover:text-white hover:scale-105 bg-violet-900 p-1 rounded-xl">
                        {item.edit}
                      </Link>
                    </td>
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
        <p>This is a preview of what buyers will see.</p>
      </div>
    </div>
  );
};

export default SellGig;
