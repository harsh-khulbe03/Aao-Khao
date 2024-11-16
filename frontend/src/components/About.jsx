import poster from "../assets/images/poster.jpg";

const About = () => {
  return (
    <div className="flex">
      <div className="w-1/2 bg-orange-300">
        <h1 className="font-extrabold text-orange-600 text-6xl p-5 m-5 mt-16">
          Welcome to AaoKhao
        </h1>
        <p className="text-black text-xl p-5 m-5">
          AaoKhao is a food delivery web application which delivers you fresh food and provides
          fastest food delivery.
        </p>
      </div>

      <img src={poster} alt="Poster" className="w-[800px] h-[600px]" />
    </div>
  );
};

export default About;
