import React from 'react';

interface CardProps {
  itemName: string;
  product: string;
  avatarImageUrl: string;
  backgroundImageUrl: string;
}

const Card: React.FC<CardProps> = ({ itemName, product, avatarImageUrl, backgroundImageUrl }) => {
  const cardStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  return (
    <div className="relative h-96 m-2 border border-teal-100 w-2/6 bg-cover rounded-lg" style={cardStyle}>
      <div className="flex items-start h-1/4 rounded-lg" style={{ backgroundColor: 'rgba(54, 64, 74, 0.7)' }}>
        <div className="flex flex-col z-1 px-4 w-full">
          <span className="text-sm text-slate-300 py-2 pt-6">{itemName}</span>
          <span className="text-xl">{product}</span>
        </div>
        <div className="z-2 relative w-1/5 pt-2 pr-3 tooltip tooltip-left" data-tip={itemName}>
          <a href="#">
            <img src={avatarImageUrl} alt="avatar" className="rounded-full md:w-24 xl:w-24" />
            <img src="images/verified.png" alt="verified" className="absolute -bottom-1/3 ml-4 mb-3 p-2" />
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-slate-300 bg-opacity-25 text-white text-center rounded-md hover:bg-opacity-100 hover:text-slate-900">
        <a href="#">
          <span className="cursor-pointer">View product</span>
        </a>
      </div>
    </div>
  );
};

export default Card;
