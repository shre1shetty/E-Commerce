import React from "react";

const MainSkeleton = () => {
  return (
    <div className="animate-pulse p-3 w-screen">
      <div className="flex justify-between ">
        <div className="skeleton-icon"></div>
        <div className="skeleton-searchbar"></div>
        <div className="flex gap-4">
          <div className="skeleton-navbuttons"></div>
          <div className="skeleton-navbuttons"></div>
          <div className="skeleton-navbuttons"></div>
        </div>
      </div>
      <div className="mt-6">
        <div className="skeleton-header">
          This might take a while as server may have went to sleep...
        </div>
      </div>
      <div className="px-72 mt-6">
        <div className="skeleton-divider"></div>
      </div>
      <div className="mt-6 skeleton-category-header"></div>
      <div className="flex gap-4 mt-6">
        <div className="skeleton-category"></div>
        <div className="skeleton-category"></div>
        <div className="skeleton-category"></div>
      </div>
    </div>
  );
};

export default MainSkeleton;
