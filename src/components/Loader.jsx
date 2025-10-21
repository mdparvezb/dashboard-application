import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full overflow-y-hidden flex justify-center items-center absolute left-0 bg-white z-[100]">
      <div class="flex flex-row gap-2">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
};

export default Loader;