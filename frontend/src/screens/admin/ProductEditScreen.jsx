import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";

import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);
    if (result.error) {
        console.log(result.error)
    } else {
      navigate("/admin/productlist");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();

      // Construct the full URL for the image
      // const fullImagePath = `http://localhost:8000${res.image}`;

      // Set the full image URL in the state
      setImage(res.image);
    } catch (err) {
        console.log(err)
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold font-lora sm:text-3xl">
            Edit your Product
          </h1>

          <p className="mt-4 text-gray-500 font-poppins">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
            nulla eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <div className="relative mb-2">
              <input
                type="text"
                className="w-full rounded-lg border-2 border-gray-200 p-4 pe-12 text-sm font-poppins "
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter email"
              />
            </div>
          
            <div className="relative mb-2">
              <input
                type="text"
                className="w-full rounded-lg border-2 border-gray-200 p-4 pe-12 text-sm font-poppins "
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
              />
            </div>
            <div className="relative mb-2">
              <input
                type="text"
                className="w-full rounded-lg border-2 border-gray-200 p-4 pe-12 text-sm font-poppins "
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter Brand"
              />
            </div>
            <div className="relative mb-2">
              <input
                type="text"
                className="w-full rounded-lg border-2 border-gray-200 p-4 pe-12 text-sm font-poppins "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter Category"
              />
            </div>
            <div className="relative mb-2">
              <input
                type="number"
                className="w-full rounded-lg border-2 border-gray-200 p-4 pe-12 text-sm font-poppins "
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                placeholder="How many stocks?"
              />
            </div>
            <div className="relative mb-2">
              <textarea
                className="w-full rounded-lg border-2 h-24 border-gray-200 p-4 pe-12 text-sm font-poppins "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
              ></textarea>
            </div>
            <div className="relative mb-2">
              <label
                for="uploadFile1"
                class="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-11 mb-2 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Upload file
                <input
                  type="file"
                  id="uploadFile1"
                  class="hidden"
                  onChange={uploadFileHandler}
                />
                <p class="text-xs font-medium text-gray-400 mt-2">
                  PNG, JPG SVG, and WEBP, are Allowed.
                </p>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Hit Edit to continue</p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Edit Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductEditScreen;
