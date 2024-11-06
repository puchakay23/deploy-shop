const Order = require("../../models/Order")


const getAllOrdersOfAllUsers = async (req, res) => {
    try {

        const orders = await Order.find({})

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No orders found"
            })
        }

        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            sucess: false,
            message: 'Some error occured while fetching'
        })
    }
}

const getOrderDetailsForAdmin = async (req, res) => {
    try {
        const { id } = req.params

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "order not found"
            })
        }

        res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            sucess: false,
            message: 'Some error occured while fetching details'
        })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { orderStatus } = req.body

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "order not found"
            })
        }

        await Order.findByIdAndUpdate(id, { orderStatus })

        res.status(200).json({
            success: true,
            message: "Order status is updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            sucess: false,
            message: 'Some error occured while updating order status'
        })

    }
}

module.exports = { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus }