import React from 'react';

interface CardProps {
  itemName: string;
  product: string;
  avatarImageUrl: string;
  backgroundImageUrl: string;
  artistName: string;
  startingPrice: string;
  duration: string;
}

const Card: React.FC<CardProps> = ({ itemName, product, artistName, avatarImageUrl, backgroundImageUrl, startingPrice, duration }) => {
  const cardStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  return (
      <div className="relative w-2/6 m-2 bg-cover border border-teal-100 rounded-lg h-96" style={cardStyle}>
      <div className="flex items-start bg-gray-400 rounded-lg bg-opacity-60 hover:bg-opacity-40 h-1/4" >
        <div className="flex flex-col w-full px-4 z-1">
          <span className="py-2 pt-6 text-sm text-slate-100">{itemName}</span>
          <span className="text-xl text-gray-50">{product}</span>
        </div>
        <div className="relative w-1/5 pt-2 pr-3 z-2 tooltip tooltip-left" data-tip={artistName}>
          <a href="#">
            <img src={avatarImageUrl} alt="avatar" className="rounded-full md:w-24 xl:w-24" />
            <img src="images/verified.png" alt="verified" className="absolute p-2 mb-3 ml-4 -bottom-1/3" />
          </a>
        </div>
      </div>
      <div className='absolute flex flex-row rounded-md h-1/6 border-1 bg-slate-100'></div>
      <div className="absolute left-0 right-0 flex flex-row justify-between px-4 py-3 text-sm text-center text-white bg-opacity-25 bottom-10 bg-slate-300 hover:bg-opacity-10 rounded-t-xl">
        <div className="p-1 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-green-400 hover:to-blue-500">Starting from {startingPrice}</div>
        <div className="p-1 rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 hover:to-green-400 hover:from-blue-500">{duration}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 text-center text-white bg-opacity-25 bg-slate-300 rounded-b-md hover:bg-opacity-100 hover:text-slate-900 hover:cursor-pointer">
        <a href="#">
          <span className="cursor-pointer">View product</span>
        </a>
      </div>
    </div>
  );
};

export default Card;
