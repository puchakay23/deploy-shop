const cloudinary = require("cloudinary").v2
const multer = require("multer")

cloudinary.config({
    cloud_name: "dibvsl8ic",
    api_key: "735194585628926",
    api_secret: "NaGTg7-M0w3YO8vgqPyq42pn5kE"
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
