const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./auth/validateData');
const verify = require('./auth/verifyToken');

router.post('/register', async (req,res) => {
    // Validate Request Data
    const dataToValidate = {
        username: req.query.username,
        password: req.query.password,
        email: req.query.email
    }
    const { error } = registerValidation(dataToValidate);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if request Username exists
    const userExists = await User.findOne({ username: req.query.username });
    if(userExists) return res.status(400).send("Username already exists");

    // Create user Mongo Model
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.query.password, salt);
    const user = new User({
        username: req.query.username,
        password: hashedPassword,
        email: req.query.email,
        name: req.query.name,
        surname: req.query.surname
    });
    console.log(user.username + " " + req.query.username + " ");

    // Create user on Database
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch (err){
        res.json({ message: err});
    }
});

router.post('/login', async (req,res) => {
    // Validate Request Data
    const { error } = loginValidation(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if request Username exists
    const user = await User.findOne({ username: req.query.username });
    if(!user) return res.status(400).send("Username or Password is wrong");

    // Check if request Password is correct
    const validPass = await bcrypt.compare(req.query.password, user.password);
    if(!validPass) return res.status(400).send("Username or Password is wrong");

    // Create user Token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    res.header('auth-token', token).send(token);

});

router.get('/', verify, (req,res) => {
    res.json({state: 'Loged in'});
})

createToken = (user) => {
    
}


module.exports = router;