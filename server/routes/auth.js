const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res) => {
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

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch (err){
        res.json({ message: err});
    }
});

router.post('/login', async (req,res) => {
    const user = await User.findOne({ username: req.query.username });
    if(!user) return res.status(400).send("Username or Password is wrong");

    const validPass = await bcrypt.compare(req.query.password, user.password);
    if(!validPass) return res.status(400).send("Username or Password is wrong");

    res. send("Login Successful");
});

module.exports = router;