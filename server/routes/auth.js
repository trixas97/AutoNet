const router = require('express').Router();
const User = require('../database/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./auth/validateData');
const verify = require('./auth/verifyToken');
const { query } = require('express');

router.post('/register', async (req,res) => {
    let data = {};
    Object.keys(req.query).length === 0 ? data = req.body : data = req.query;

    // Validate Request Data
    const dataToValidate = {
        username: data.username,
        password: data.password,
        email: data.email
    }
    const { error } = registerValidation(dataToValidate);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if request Username exists
    const userExists = await User.findOne({ username: data.username });
    if(userExists) return res.status(400).send("Username already exists");

    // Create user Mongo Model
    const hashedPassword = await getHashPassword(data.password)
    const user = new User({
        username: data.username,
        password: hashedPassword,
        email: data.email,
        name: data.name,
        surname: data.surname
    });

    // Create user on Database
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch (err){
        res.json({ message: err});
    }
});

router.post('/login', async (req,res) => {
    let data = {};
    Object.keys(req.query).length === 0 ? data = req.body : data = req.query;
    
    // Validate Request Data
    const { error } = loginValidation(data);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if request Username exists
    const user = await User.findOne({ username: data.username });
    if(!user) return res.status(400).send("Username or Password is wrong");

    // Check if request Password is correct
    const validPass = await bcrypt.compare(data.password, user.password);
    if(!validPass) return res.status(400).send("Username or Password is wrong");

    // Create user Token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    res.header('auth-token', token).send(token);

});

router.get('/', verify, (req,res) => {
    res.json({state: 'Loged in'});
})

const getHashPassword = async (plainText) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainText, salt);
    return hashedPassword
}

module.exports = router;
module.exports.getHashPassword = getHashPassword