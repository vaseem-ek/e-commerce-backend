const users = require('../models/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existing = await users.findOne({ email })
        if (existing) {
            return res.status(401).json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.status(402).json({ success: false, message: "Please enter valid email" })
        }
        if (password.length < 5) {
            return res.status(403).json({ success: false, message: "Please enter strong password" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new users({
            name, email, password: hashedPassword
        })
        await newUser.save()
        return res.status(201).json({ success: true, newUser })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const existing =await users.findOne({ email })
        if (!existing) {
            return res.status(401).json({ success: false, message: "Invalid email" })
        }
        const isMatch = await bcrypt.compare(password, existing.password)
        if (isMatch || password == existing.password) {
            const token = jwt.sign({ userId: existing._id }, process.env.SECRET_KEY)
            return res.status(200).json({ user: existing, token })
        } else {
            return res.status(402).json({ success: false, message: "Invalid password" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}