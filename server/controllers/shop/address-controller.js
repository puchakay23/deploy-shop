const Address = require("../../models/Address")

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: "invalid data provided"
            })
        }

        const newAddress = new Address({
            userId, address, city, pincode, phone, notes
        })

        await newAddress.save()

        res.status(201).json({
            success: true,
            data: newAddress
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error occured"
        })
    }
}
const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userid is required"
            })
        }

        const address = await Address.find({ userId })

        res.status(200).json({
            success: true,
            data: address
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error occured"
        })
    }
}
const editAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params
        const formData = req.body

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "userid and addressid is required"
            })
        }

        const address = await Address.findOneAndUpdate({
            _id: addressId, userId
        }, formData, { new: true })

        if (!address) {
            res.status(404).json({
                success: false,
                message: "address not found"
            })
        }

        res.status(200).json({
            success: true,
            data: address
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error occured"
        })
    }
}
const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "userid and addressid is required"
            })
        }

        const address = await Address.findOneAndDelete({
            _id: addressId, userId
        })

        if (!address) {
            res.status(404).json({
                success: false,
                message: "address not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error occured"
        })
    }
}

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress }