import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Carasoule() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel Images and Details
  const carouselItems = [
    {
      image: "/Images/clothes.jpg",
      title: "Summer Fashion Sale",
      description: "Up to 50% off on latest trends",
      buttonText: "Shop Now",
    },
    {
      image: "/Images/laptop1.jpg",
      title: "Electronics Mega Deal",
      description: "Incredible discounts on tech gadgets",
      buttonText: "Explore Deals",
    },
    {
      image: "/Images/home.jpg",
      title: "Home Essentials Collection",
      description: "Upgrade your living space",
      buttonText: "Browse Collection",
    },
    {
      image: "/Images/apparel.jpg",
      title: "Chic & Carry Collection",
      description: "Upgrade your Chic & Carry collection",
      buttonText: "Browse Collection",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };
  return (
    <>
      {/* Carousel Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`
              absolute top-0 left-0 w-full h-full transition-opacity duration-700 
              ${currentSlide === index ? "opacity-100" : "opacity-0"}
            `}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white max-w-xl px-4">
                <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-xl mb-6">{item.description}</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                  {item.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
        >
          <ChevronLeft className="text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
        >
          <ChevronRight className="text-gray-800" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                w-3 h-3 rounded-full transition-all
                ${currentSlide === index ? "bg-white w-6" : "bg-white/50"}
              `}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Carasoule;
