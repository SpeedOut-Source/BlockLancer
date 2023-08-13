import React, { useState, useEffect } from "react";

const Caro = () => {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const track = document.getElementById("image-track");

    const handleOnDown = (e) => {
      setMouseDownAt(e.clientX);
    };

    const handleOnUp = () => {
      setMouseDownAt(0);
      setPrevPercentage(percentage);
    };

    const handleOnMove = (e) => {
      if (mouseDownAt === 0) return;

      const mouseDelta = parseFloat(mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const nextPercentageUnconstrained =
        parseFloat(prevPercentage) + (mouseDelta / maxDelta) * -100;
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      setPercentage(nextPercentage);

      track.style.transform = `translate(${nextPercentage}%, -50%)`;

      const images = track.getElementsByClassName("image");
      for (const image of images) {
        image.style.objectPosition = `${100 + nextPercentage}% center`;
      }
    };

    window.addEventListener("mousedown", handleOnDown);
    window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
    window.addEventListener("mouseup", handleOnUp);
    window.addEventListener("touchend", (e) => handleOnUp(e.touches[0]));
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));

    return () => {
      window.removeEventListener("mousedown", handleOnDown);
      window.removeEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
      window.removeEventListener("mouseup", handleOnUp);
      window.removeEventListener("touchend", (e) => handleOnUp(e.touches[0]));
      window.removeEventListener("mousemove", handleOnMove);
      window.removeEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
    };
  }, [mouseDownAt, prevPercentage, percentage]);

  return (
    <div>
      <div
        id="image-track"
        data-mouse-down-at={mouseDownAt}
        data-prev-percentage={prevPercentage}
        className="flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {/* Add your image components here */}
<img
  className="image"
  src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  draggable="false"
  alt="Image 1"
/>
<img
  className="image"
  src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
  draggable="false"
  alt="Image 2"
/>
<img
  className="image"
  src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
  draggable="false"
  alt="Image 2"
/>
<img
  className="image"
  src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
  draggable="false"
  alt="Image 2"
/>
{/* Add more image components with different URLs */}

      </div>
      <a
        id="source-link"
        className="meta-link"
        href="https://camillemormal.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-solid fa-link"></i>
        <span>Source</span>
      </a>
      <a
        id="yt-link"
        className="meta-link"
        href="https://youtu.be/PkADl0HubMY"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-youtube"></i>
        <span>7 min tutorial</span>
      </a>
    </div>
  );
};

export default Caro;
