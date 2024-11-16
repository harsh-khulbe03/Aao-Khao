import { IMG_CDN_URL } from "../constant";

function Offer({ singleOfferInfo }) {
  const date = new Date(singleOfferInfo?.expiryTime);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  return (
    <>
      <div className="flex border border-1 border-solid border-slate-500 px-3 py-2 m-1 rounded-xl">
        <img
          src={IMG_CDN_URL + singleOfferInfo?.offerLogo}
          alt=""
          className="h-16 w-16 mr-3"
        />
        <div className="mr-28"> 
          <div className="font-black text-xl">{singleOfferInfo?.header}</div>
          {singleOfferInfo?.couponCode === undefined ? (
            <span className="text-slate-500 font-black text-lg">
              Ends in {hours}:{minutes}:{seconds}
            </span>
          ) : (
            <span className="text-slate-500 font-black text-lg">{singleOfferInfo?.couponCode}</span>
          )}
        </div>
      </div>
    </>
  );
}

export default Offer;
