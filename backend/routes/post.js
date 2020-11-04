const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')
const { User, Post } = require('../models');

const router = express.Router();

router.post('/', async(req, res, next) => {
    console.log("index",req.body)
    try {
        const post = await Post.findAll({
            where : { category: req.body.category },
            order: [['createdAt', 'DESC']],
        })
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
    
})

router.post('/add', async(req, res, next) => {
    try {
        const user = await User.findOne({
            where : { userid: req.body.userid }
        })
        const post = await Post.create({
            title: req.body.content.title,
            content: req.body.content.text,
            category: req.body.content.category,
            UserId: user.id,
        })
       
    } catch (err) {
        console.error(err);
        next(err);
    }
    
})


module.exports = router; 