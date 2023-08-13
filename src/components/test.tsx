import React from 'react';

const ParentDiv: React.FC = () => {
  return (
    <div
      className="flex h-96 w-96 border-2 border-black p-4 justify-between"
    >
      <div
        className="border-1 border-black p-2"
      >
        Child 1
      </div>
      <div
        className="border-1 border-black p-2"
      >
        Child 2
      </div>
    </div>
  );
};

export default ParentDiv;
