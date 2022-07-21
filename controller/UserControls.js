const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/update",async(req,res)=>{
    //if(req.body.userID == req.params.id || req.user.isAdmin){
        if(req.body.password){
            try {
                const salt =await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            } catch (err) {
                return res.status(400).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.body.userId, {$set:req.body});
            res.status(200).json("Account Updated");
        } catch (error) {
            return res.status(400).json(error);
        }
    // }
    // else
    //     return res.status(400).send({message: "You can't edit others account"});
});
//delete user
//get a user
//follow user
//unfollow user


module.exports = router;