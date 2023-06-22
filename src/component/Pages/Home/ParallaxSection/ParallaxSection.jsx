import React from 'react';
import { Parallax } from 'react-parallax';

const ParallaxSection = ({ imagePath, title, subTitle }) => {
  return (
    <Parallax bgImage={imagePath} strength={400}>
      <div style={{ height: '400px' }}>
        <div className="flex items-center justify-center h-full text-black text-center">
          <div>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="mt-4 text-xl">{subTitle}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default ParallaxSection;
