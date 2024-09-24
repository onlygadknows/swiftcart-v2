import { useParams } from "react-router-dom";
import products from "../products.js";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);
  console.log(product);
  return (
    <div className="min-h-screen h-auto mx-auto max-w-2xl px-4 sm:px-6 sm:py-6 sm:flex sm:justify-between sm:flex-col sm:gap-2 md:gap-1 lg:grid-rows-1 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-5">
      <div className="col-start-1 flex items-center justify-center">
        <img src={product.image} alt={product.name} draggable="false" />
      </div>
      <div className="col-start-2 flex items-center flex-col">
        <h1 className="font-bold uppercase pb-4 text-lg">{product.name}</h1>
        <p className="text-poppins italic">{product.description}</p>
        <div className="flex items-center justify-between gap-5 flex-col mx-auto w-full mt-10">
          <div className="p-10 bg-purple-50">1</div>
          <div className="p-10 bg-slate-300">2</div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
