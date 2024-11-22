import Logo from "../assets/images/AaoKhao_logo.png";
const Footer = () => {
  return (
    <div className="flex bg-gray-800 px-32">
      <div className="flex flex-col m-12 text-gray-300">
        <div className="flex items-center text-2xl font-black text-orange-400">
          <img
            src={Logo}
            alt="Aaokhao image"
            className="h-20 w-20 rounded-xl mr-1"
          />
          <h1>AaoKhao</h1>
        </div>
        <div className="flex items-center px-1">
          <i class="fa-regular fa-copyright"></i>
          <p className="ml-1">2024 AaoKhao Limited</p>
        </div>
      </div>

      <div className="m-12 flex flex-col gap-1 text-gray-300">
        <h1 className="font-bold text-lg text-white">Company</h1>
        <p>About Us</p>
        <p>AaoKhao Corporate</p>
        <p>Carrers</p>
        <p>Team</p>
      </div>

      <div className="m-12 flex flex-col gap-1 text-gray-300">
        <h1 className="font-bold text-lg text-white">Contact Us</h1>
        <p>Help & Support</p>
        <p>Partner with us</p>
        <p>Carrers</p>
      </div>

      <div className="m-12 flex flex-col gap-1 text-gray-300">
        <h1 className="font-bold text-lg text-white">Available in</h1>
        <p>Bangalore</p>
        <p>Gurgaon</p>
        <p>Hyderabad</p>
        <p>Delhi</p>
      </div>

      <div className="m-12 flex flex-col gap-1 text-gray-300">
        <h1 className="font-bold text-lg text-white">Life at AaoKhao</h1>
        <p>Explore with AaoKhao</p>
        <p>AaoKhao News</p>
        <p>Snackables</p>
      </div>
    </div>
  );
};

export default Footer;
