import poster from "../assets/images/poster.jpg";
import { FaBolt, FaLeaf, FaStar, FaUtensils } from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24 mb-20 md:mb-28">
          <div className="lg:w-1/2 space-y-6 md:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-600 leading-tight">
                <span className="block text-orange-500">Welcome to</span>
                <span className="text-orange-600">AaoKhao</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                AaoKhao revolutionizes food delivery with lightning-fast service
                and farm-fresh ingredients straight to your doorstep.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <FaBolt className="text-orange-500 text-2xl" />,
                  text: "Fastest Delivery",
                },
                {
                  icon: <FaLeaf className="text-green-500 text-2xl" />,
                  text: "Fresh Ingredients",
                },
                {
                  icon: <FaStar className="text-yellow-500 text-2xl" />,
                  text: "Top Rated",
                },
                {
                  icon: <FaUtensils className="text-red-500 text-2xl" />,
                  text: "100+ Restaurants",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
                >
                  {item.icon}
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-w-16 aspect-h-9">
              <img
                src={poster}
                alt="Delicious food delivery"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-orange-100/50">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
                Our Culinary Promise
              </h2>
              <div className="h-1.5 w-24 bg-orange-400 mx-auto rounded-full"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  At AaoKhao, we're committed to transforming your dining
                  experience by delivering not just food, but happiness. We
                  carefully select partner restaurants that share our values of
                  quality, hygiene, and exceptional taste.
                </p>
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
                  <h3 className="font-bold text-orange-600 text-xl mb-3">
                    Quality First
                  </h3>
                  <p className="text-gray-700">
                    Every dish undergoes strict quality checks before it leaves
                    the kitchen to ensure you get restaurant-quality meals at
                    home.
                  </p>
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400 h-full">
                  <h3 className="font-bold text-orange-600 text-xl mb-3">
                    Hot & Fresh Guarantee
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our thermal packaging and optimized delivery routes ensure
                    your food arrives exactly as the chef intended - hot, fresh,
                    and delicious.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">✓</span>
                      <span>Temperature-controlled containers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">✓</span>
                      <span>Real-time delivery tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">✓</span>
                      <span>30-minute freshness guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
