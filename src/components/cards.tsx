import React from 'react';

const Card: React.FC = () => {
  return (
    <div className="flex h-96 border border-teal-100">
      <div className="relative m-2 border border-teal-100 w-2/6 bg-cover" style={{ backgroundImage: `url('images/home.jpg')` }}>
        <div className="flex items-start border-cyan-200 border">
          <div className="z-2 relative left-3/4 h-1/3 w-1/5 top-2 tooltip tooltip-left" data-tip="Arnob">
            <a href="#">
                <img src='https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png' alt='avatar' className='rounded-full' />
                <img src="images/verified.png" alt="verified" className='absolute bottom-1/2 left-1/3' />
            </a>
          </div>
          <div className='flex flex-col z-1 px-4 w-full' style={{ backgroundColor: 'rgba(54, 64, 74, 0.7)' }}>
            <span className='text-sm text-slate-300'>Item name</span>
            <span className='text-xl'>Product</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center m-2 border border-teal-100 w-2/6">
        <p>Item 2</p>
      </div>

      <div className="flex items-center justify-center m-2 border border-teal-100 w-2/6">
        <p>Item 3</p>
      </div>
    </div>
  );
};

export default Card;
