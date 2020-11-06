const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')
const Sequelize = require('sequelize');
const { User, Post, Comment } = require('../models');

const router = express.Router();

router.get('/:category/:postId', async (req, res) => {
    // console.log("asdasd",req.params)
    try {
        const post = await Post.findOne({
            where: { 
                id: req.params.postId,
                category: req.params.category
            },
            include: [
                {
                    model:Comment , 
                    wehre: {
                        // id: req.params.postId,
                        category: req.body.category,
                    },
                    attributes: ['id', 'content', 'nickname', 'createdAt'],
                },
            ],
            order: [[Comment, 'createdAt', 'desc']]
        })
        // console.log(post)
        res.status(200).json(post)
    } catch(err) {
        console.error(err);
        next(err);
    }
})

router.post('/', async(req, res, next) => {
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
            nickname: req.body.nickname
        })
       return res.status(200).json(post)
    } catch (err) {
        console.error(err);
        next(err);
    }
    
})

router.post('/:postId/comment', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {id: req.params.postId}
        })
        const user = await User.findOne({
            where: {id: req.body.userid}
        })
        if(!post) {
            return res.status(403).send('존재하지 않는 게시글');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: req.body.id,
            UserId: req.body.userid,
            nickname: user.nickname,
            category: req.body.category
        })
        return res.status(200).json(comment)
    } catch(err) {
        console.error(err);
        next(err);
    }
})


module.exports = router; 