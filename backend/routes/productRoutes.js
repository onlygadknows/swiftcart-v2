import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  getProducts,
  getFavoriteProducts,
  getProductsById,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview, 
  getTopProducts
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts)

router.route("/favProducts").get(getFavoriteProducts);
router.route("/:id").get(getProductsById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);


export default router;
