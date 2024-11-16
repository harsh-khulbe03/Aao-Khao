import React, { useState } from "react";
import MenuCard from "./MenuCard";

function Accordion({ title, items }) {
  const [isActive, setIsActive] = useState(false);
  console.log(items[0]?.card?.info?.ratings?.aggregatedRating?.rating);

  return (
    <div className="border-b border-gray-300">
      {/* Accordion Title */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <h2 className="font-bold text-lg">{title} ({items?.length})</h2>
        <i
          className={`fa-solid ${
            isActive ? "fa-chevron-up" : "fa-chevron-down"
          }`}
        ></i>
      </div>

      {/* Accordion Content */}
      {isActive && (
        <div className="p-4 space-y-4">
          {items?.length > 0 &&
            items?.map((item, index) => <MenuCard key={index} item={item} />)}
        </div>
      )}
    </div>
  );
}

export default Accordion;
