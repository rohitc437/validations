
const express = require('express');
const router = express.Router();
const User = require("../models/user.model")
const { body, validationResult } = require("express-validator")


router.get("/", async ( req, res ) => {
    const users = await User.find().lean().exec();

    res.status(201).json({ data: users })
})

router.post(
    "/",
    body("id").isLength({min:1}).withMessage("id is required"),
    body('first_name').isLength({min:1}).withMessage(" Please enter your First name"),
    body("last_name").isLength({min:1}).withMessage("Enter your last name"),
    body("email").custom((value) => {

        if (!value) {
            throw new Error("EMAIL is required");
        }

        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(value)) {
            throw new Error("Enter correct Email Id");
        }

        return true;
    }),
    body("age").custom((value) => {
        if (!value) {
            throw new Error("invalid  age");
        }

        if (+value < 1 || value > 100) {
            throw new Error('AGE should be between 1 and 100.');
        }
        return true;
    }),
    body("gender").isLength({min:4}).withMessage('Define Gender'),
    body("pincode").isLength({min:6}).withMessage('Incorrect pincode'),
    async ( req, res ) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({data:errors.array()})
        }
        const users = await User.create(req.body);

        return  res.status(201).json({ data: users })
})

module.exports = router


