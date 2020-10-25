const router = require('express').Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',async(req,res)=>{
    // res.send("User Registered");
const emailExit = await User.findOne({
    email: req.body.email
});
if(emailExit){
    return res.status(400).send("Email already exists");
}
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email:req.body.email,
        phone:req.body.phone,
        password:hashedPassword 
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(error){
        res.status(400).send(error);
    }
});
//iogin user
router.post('/login',async(req,res)=>{
    //res.send("login Success");
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email is Wrong");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid Password");
    //res.send("User Logged In");

    const token = jwt.sign({_id: user._id },process.env.TOKEN_VALUE);
    res.header("auth-token",token).send({token: token});
});

module.exports = router;