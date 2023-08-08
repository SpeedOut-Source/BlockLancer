import React from 'react';

const Carousel: React.FC = () => {


  return (
    <>
      <div className="h-96 carousel carousel-vertical rounded-box">
  <div className="carousel-item h-full">
    <img src="https://pbs.twimg.com/media/FMWi7CVacAk5R7s.jpg" />
  </div> 
  <div className="carousel-item h-full">
    <img src="https://www.hash13.com/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-04-at-11.31.19-PM.jpeg"/>
  </div> 
  <div className="carousel-item h-full">
    <img src="/images/stock/photo-1572635148818-ef6fd45eb394.jpg" />
  </div> 
  <div className="carousel-item h-full">
    <img src="/images/stock/photo-1494253109108-2e30c049369b.jpg" />
  </div> 
  <div className="carousel-item h-full">
    <img src="/images/stock/photo-1550258987-190a2d41a8ba.jpg" />
  </div> 
  <div className="carousel-item h-full">
    <img src="/images/stock/photo-1559181567-c3190ca9959b.jpg" />
  </div> 
  <div className="carousel-item h-full">
    <img src="/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" />
  </div>
</div>
      
    </>
  );
};

export default Carousel;
