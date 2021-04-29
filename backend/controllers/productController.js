import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//@desc Fetch single product
//@route GET /api/product
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(400)
    throw new Error('Product not found')
  }
})


//@desc  Delete single product
//@route DELETE /api/products/:id
//@access Private/ Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed successfully' })
  } else {
    res.status(400)
    throw new Error('Product not found')
  }
})
export {
  getProductById,
  getProducts,
  deleteProduct
}