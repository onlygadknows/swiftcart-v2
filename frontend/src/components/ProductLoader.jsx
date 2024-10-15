const ProductLoader = () => {
  return (
    <div className="w-full mb-5 flex items-center justify-between">
      <div className="mt-10 h-auto w-full mx-auto max-w-2xl px-4 sm:px-6 sm:flex sm:justify-between sm:flex-col sm:gap-2 md:gap-1 lg:grid-rows-1 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-5">
        <div className="col-start-1 min-h-[600px] lg:h-[600px]  bg-gray-200 rounded-lg animate-pulse flex items-center justify-center sm:mt-5 lg:mt-0 p-5"></div>
        <div className="col-start-2 rounded-lgdiv flex flex-col justify-center bg-slate-100 rounded-md shadow-inner p-10">
          <div className="bg-gray-300 h-4 w-[75%] rounded-full mt-3 animate-pulse"></div>
          <div className="bg-gray-300 h-4 w-[100%] rounded-full mt-3 animate-pulse"></div>
          <div className="bg-gray-300 h-4 w-[100%] rounded-full mt-3 animate-pulse"></div>
            <div className="h-auto w-full flex flex-col md:flex-row align-center justify-between mt-5 gap-5">
              <div className="bg-gray-300 h-4 w-[35%] rounded-full mt-3 animate-pulse"></div>
              <div className="bg-gray-300 h-4 w-[35%] rounded-full mt-3 animate-pulse"></div>
              <div className="bg-gray-300 h-4 w-[35%] rounded-full mt-3 animate-pulse"></div>
            </div>
            <div className="h-auto w-full flex flex-col md:flex-row align-center justify-between gap-5 md:pb-10">
              <div className="bg-gray-300 h-4 w-[35%] rounded-full mt-3 animate-pulse"></div>
              <div>{" "}</div>
              <div className="bg-gray-300 h-4 w-[35%] rounded-full mt-3 animate-pulse"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoader;
