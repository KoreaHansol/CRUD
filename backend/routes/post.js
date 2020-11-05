const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')
const { User, Post } = require('../models');

const router = express.Router();

router.get('/:postId', async (req, res) => {
    console.log("idididid")
    try {
        const post = await Post.findOne({
            where: {id: req.params.postId}
        })
        res.status(200).json(post)
    } catch(err) {
        console.error(err);
        next(err);
    }
})

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
        console.log(req.body)
        const user = await User.findOne({
            where : { userid: req.body.userid }
        })
        const post = await Post.create({
            title: req.body.content.title,
            content: req.body.content.text,
            category: req.body.content.category,
            UserId: user.id,
            nickname: req.body.nickname
        })
       
    } catch (err) {
        console.error(err);
        next(err);
    }
    
})

module.exports = router; 