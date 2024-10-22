const { ImageUpload } = require("../../helpers/cloudinary");

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
        return res.json({
            success: false,
            message: "error occured"
        })
    }
}

module.exports = { handleImageUpload }