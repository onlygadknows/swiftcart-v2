import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
        }
      }),
      keepUnusedDataFor: 5,
    }),
    getfavoriteProducts: builder.query({
        query: () => ({
          url: `${PRODUCTS_URL}/favProducts`,
      
        }),
        keepUnusedDataFor: 5,
      }),
    getProductDetails: builder.query({
        query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`,
        }),
        keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
        credentials: 'include'
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      })
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
        credentials: 'include'
      })
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
        credentials: 'include'
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetfavoriteProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
 }
  = productsApiSlice;
