import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ImageWithTooltip = ({ src, name }) => {
    return (
        
        <div>
        <img className="rounded-full w-12 h-12" src={src} alt="User profile" title={name} />
        <ReactTooltip />
      </div>
      
    );
};

export default ImageWithTooltip;