import Lottie from "react-lottie";
import shoppingAnimation from "../../../../public/Animation - 1741345723353.json";
import { Link } from 'react-router-dom';

export const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: shoppingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  
  return (
    <section className="bg-gray-50 w-screen">
      <div className="grid w-full px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-8 md:mt-0">
            Discover Our Premium Footwear Collection
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Step into style with our curated selection of contemporary shoes
          </p>
          <Link to="/shop1">
          <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700">
            Shop Now
          </button>
        </Link>
        </div>
        <div className="lg:mt-0 lg:col-span-5 lg:flex justify-end">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>
    </section>
  );
};