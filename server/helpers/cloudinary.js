const cloudinary = require("cloudinary").v2
const multer = require("multer")

cloudinary.config({
    cloud_name: "dibvsl8ic",
    api_key: "854432664774232",
    api_secret: "eYi2z0PH_rjaUZjkwNq693Kgg78"
})

const storage = new multer.memoryStorage()

async function ImageUpload(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    })
    return result;
}

const upload = multer({ storage })

module.exports = { upload, ImageUpload }
