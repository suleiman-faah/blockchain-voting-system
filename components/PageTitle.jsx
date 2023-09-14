import React from 'react';

const PageTitle = ({ title }) => {
  return (
    <div className="pl-14 lg:pl-4 pr-4 py-3 bg-purple-950 text-white">
      <span className="font-bold">{title}</span>
    </div>
  );
};

export default PageTitle;
