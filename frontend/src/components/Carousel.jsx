import { useRef } from "react";
import Offer from "./Offer";

function Carousel({heading, offersArr}) {
  const scrollContainerRef = useRef(null);
  function goLeft() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 450;
    }
  }

  function goRight() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 450;
    }
  }
  return (
    <div>
      <div className="w-[850px] mx-auto flex justify-between text-center">
        <h1 className="text-2xl font-black my-10">{heading}</h1>
        <div className=" my-10">
          <button
            className="mx-2 bg-slate-200 rounded-3xl p-3"
            onClick={goLeft}
          >
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button
            className="mx-2 bg-slate-200 rounded-3xl p-3"
            onClick={goRight}
          >
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex w-[900px] overflow-x-auto space-x-4 mx-auto h-40 rounded-md max-w-full px-4"
      >
        {offersArr?.length > 0 ? offersArr?.map((offer, index) => (
          <div key={index} className="flex-none">
            {
                <Offer singleOfferInfo={offer?.info} />
            }
          </div>
        )) : <p>No items to display</p>}
      </div>
    </div>
  );
}

export default Carousel;
