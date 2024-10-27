import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc Fetch all product
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    res.json(products)
});

//@desc Fetch all product
//@route GET /api/products/:id
//@access Public
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc Create a product
//@route POST /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      rating: 0,
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
  })

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc Update a product
//@route GET /api/products/:id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock} = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
  } else {
      res.status(404)
      throw new Error('Resource not found!');
  }


});

//@desc Delete a product
//@route DELETE /api/products/:id
//@access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
      await Product.deleteOne({_id: product._id});
      res.status(200).json({message: "Product deleted successfully!"})
  } else {
      res.status(404);
      throw new Error('Resource not found!');
  }
});

//@desc Create new product
//@route POST /api/products/:id/reviews
//@access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
      const alreadyReviewed = product.reviews.find(
          (review) => review.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
          res.status(400);
          throw new Error('Product already reviewed');
      }

      const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
      product.rating = totalRating / product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added!' });
  } else {
      res.status(404);
      throw new Error('Product not found!');
  }
});

//@desc GET to rated products
//@route GET /api/products/top
//@access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating: -1}).limit(3);
 res.status(200).json(products);
})

export {
  getProducts, 
  getProductsById, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  createProductReview, 
  getTopProducts
}