import SlashImg from "../assets/images/slash.png";

function Breadcrumb({restaurant}) {
  return (
    <div className="">
      <ul className=" flex p-2 text-xs text-[#2E4053] items-center ml-80">
        <li className=" cursor-pointer m-2">
          Home
        </li>
        <img src={SlashImg} className="w-3 h-2 " alt="" />
        <li className=" cursor-pointer m-2">
          {restaurant.city}
        </li>
        <img src={SlashImg} className="w-3 h-2 " alt="" />
        <li className="cursor-pointer m-2">
          {restaurant.name}
        </li>
      </ul>
    </div>
  );
}

export default Breadcrumb;