const { ImageUpload } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");


const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64
        const result = await ImageUpload(url)

        console.log(result)

        res.json({
            success: true,
            result
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "error occured"
        })
    }
}

//add a new product
const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, salePrice, price, totalStock } = req.body

        const newProduct = new Product({
            image, title, description, category, brand, salePrice, price, totalStock
        })

        await newProduct.save()

        res.status(201).json({
            success: true,
            data: newProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            sccess: false,
            messsage: "error occured"
        })
    }
}

//fetch all products
const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({})
        res.status(200).json({
            success: true,
            data: listOfProducts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            sccess: false,
            messsage: "error occured"
        })
    }
}

//edit a product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { image, title, description, category, brand, salePrice, price, totalStock } = req.body
        const findProduct = await Product.findById(id)
        if (!findProduct) return res.status(404).json({
            success: false,
            message: "Product not found"
        })

        findProduct.title = title || findProduct.title
        findProduct.image = image || findProduct.image
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.salePrice = salePrice || findProduct.salePrice
        findProduct.price = price || findProduct.price
        findProduct.totalStock = totalStock || findProduct.totalStock

        await findProduct.save()

        res.status(200).json({
            success: true,
            data: findProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            sccess: false,
            messsage: "error occured"
        })
    }
}

//delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).josn({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            sccess: false,
            messsage: "error occured"
        })
    }
}

module.exports = { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct }