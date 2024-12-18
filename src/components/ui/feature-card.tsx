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
      className={`bg-white p-6 relative rounded-lg shadow-md flex flex-col justify-between hover:scale-[1.02] transition-all ease-in-out duration-300 group cursor-pointer ${className} overflow-clip`}
    >
      <div className="">
        <span className="absolute bg-gradient-to-tl from-blue-600 from-40% via-blue-400 to-blue-300 w-36 h-16 bottom-0 right-0 rounded-full blur-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all  duration-150 ease-in-out"></span>
        <div className="flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 group-hover:underline group-hover:decoration-wavy decoration-blue-600 underline-offset-4  ">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
