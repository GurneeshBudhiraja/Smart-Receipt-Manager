import React, { JSX } from "react";

function FeatureCard({
  icon,
  title,
  description,
  className,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  className: string;
}) {
  return (
    <div
      className={`bg-white p-6 relative rounded-lg shadow-md flex flex-col justify-center  md:justify-between transition-all ease-in-out duration-300 group overflow-clip ${className} `}
    >
      <div>
        <span className="absolute bg-gradient-to-tl from-blue-500 from-40% via-blue-400 to-blue-300 w-36 h-16 bottom-0 right-0 rounded-full blur-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all  duration-150 ease-in-out"></span>
        <div className="flex items-center justify-center mb-2 md:mb-4">
          {icon}
        </div>
        <h3 className="text-sm md:text-xl font-medium md:font-semibold mb-2 md:group-hover:underline group-hover:decoration-wavy decoration-blue-600 underline-offset-4 overflow-x-scroll  md:overflow-x-visible overflow-y-visible  ">
          {title}
        </h3>
        <p className="text-gray-600 hidden md:inline-block">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
