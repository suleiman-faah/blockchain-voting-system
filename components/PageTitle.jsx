import React from 'react';

const PageTitle = ({ title }) => {
  return (
    <div className="bg-primary py-3 pl-14 pr-4 text-white lg:pl-4">
      <span className="font-bold">{title}</span>
    </div>
  );
};

export default PageTitle;
