import React from 'react';

const Card: React.FC = () => {
  return (
    <div className="flex h-56 border border-teal-100">
        <div className="m-2 border border-teal-100 w-48 bg-cover"  style={{ backgroundImage: `url('images/home.jpg')` }}>
            <div className="flex flex-col h-10">
                <div className="z-2 relative left-36 h-10 w-10 top-2 tooltip tooltip-left" data-tip="Arnob">
                    <a href="#">
                        <div className='relative'>
                            <img src='https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png' alt='avatar' className='rounded-full' />
                            <img src="images\verified.png" alt="verified" className='absolute bottom-5 left-3' />
                        </div>
                    </a>
                </div>

                <div className='z-1 flex flex-col justify-between px-4' style={{ backgroundColor: 'rgba(54, 64, 74, 0.7)'}}>
                    <span className='text-sm text-slate-300'>Item name</span>
                    <span className='text-xl'>Product</span>
                </div>   
            </div>
        </div>

    
    <div className="flex items-center justify-center m-2 border border-teal-100 w-40">
        <p>Item 2</p>
    </div>

    <div className="flex items-center justify-center m-2 border border-teal-100 w-40">
        <p>Item 3</p>
    </div>

    </div>
    );
};

export default Card;1