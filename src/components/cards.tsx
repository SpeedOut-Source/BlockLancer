import React from 'react';

const Card: React.FC = () => {
  return (
      <div className="relative h-96 m-2 border border-teal-100 w-2/6 bg-cover" style={{ backgroundImage: `url('images/home.jpg')` }}>
        <div className="flex items-start h-1/4"  style={{ backgroundColor: 'rgba(54, 64, 74, 0.7)' }}>
          <div className='flex flex-col z-1 px-4 w-full'>
            <span className='text-sm text-slate-300 py-2 pt-6'>Item name</span>
            <span className='text-xl'>Product</span>
          </div>
          <div className="z-2 relative w-1/5 pt-2 pr-3 tooltip tooltip-left" data-tip="Arnob">
            <a href="#">
                <img src='https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png' alt='avatar' className='rounded-full md:w-24 xl:w-24' />
                <img src="images/verified.png" alt="verified" className='absolute bottom-1/4 ml-4 mb-3 ' />
            </a>
          </div>
        </div>
      </div>

  );
};

export default Card;
