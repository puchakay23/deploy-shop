const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")


//register
const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.json({
                success: false,
                message: "user already exists with this email! Try again"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const userDoc = User.create({
            username,
            email,
            password: hashPassword
        })
        res.status(200).json({
            success: true,
            message: "Registration sucessfull"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error occured"
        })
    }
}


//login
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const checkUser = await User.findOne({ email })
        if (!checkUser) {
            return res.json({
                success: false,
                message: "user dosn't exists! please register first"
            })
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password)
        if (!checkPassword) {
            return res.json({
                success: false,
                message: "Incorrect password! please try again"
            })
        }

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            username: checkUser.username
        }, "CLIENT_SECRET_KEY")

        res.cookie("token", token).json({
            success: true,
            message: "LoggedIn successfully",
            user: {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                username: checkUser.username
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error occured"
        })
    }
}


//logout
const logoutUser = (req, res) => {
    res.cookie('token', null).json({
        success: true,
        message: "Logged out suceesfully"
    })
}

//auth middleware
const authMiddleaware = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) res.status(401).json({
        success: false,
        message: "Unauthorised user!"
    })
    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY")
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!"
        })
    }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleaware }