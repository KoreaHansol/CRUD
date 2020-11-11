const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')
const Sequelize = require('sequelize');
const { User, Post, Comment } = require('../models');
const date = require('date-utils')

const router = express.Router();

router.get('/:category/:postId', async (req, res) => {
    // console.log("asdasd",req.params)
    try {
        const views = await Post.findOne({
            where: { 
                id: req.params.postId,
                category: req.params.category
            },
            attributes: ['view']
        })
        await Post.update(
            { 
                view: views.dataValues.view + 1
            },
            { 
                where: { 
                    id: req.params.postId,
                    category: req.params.category
                },
            }
        );
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

router.post('/:postId/update', async (req, res) => {
    const time = new Date().toFormat('YYYY-MM-DD HH24:MI')
    try {
        const post = await Post.update(
            { 
                title: req.body.title,
                content:  req.body.content,
                createdAt: time,
                updatedAt: time,
            },
            { 
                where: { 
                    id: req.params.postId
                } 
            }
        );
        const returnpost = await Post.findOne({
            where: {
                id: req.params.postId,
            }
        })
        res.status(200).send(returnpost);
    } catch(err) {
        console.error(err);
        next(err);
    }
})

router.delete('/:postId/delete', async (req, res) => {
    try {
        await Post.destroy(
            {
                where: { id: req.params.postId }
            }
        );
        res.status(200).send("삭제완료");
    } catch(err) {
        console.error(err);
        next(err);
    }
})

router.post('/', async(req, res, next) => {
    var query = "SELECT @ROWNUM := @ROWNUM + 1 AS ROWNUM, 'id', Post.* FROM `Posts` AS `Post` ,(SELECT @ROWNUM := 0) R WHERE `Post`.`category` = :name ORDER BY `Post`.`createdAt` DESC"
    var values = {
        name: req.body.category
    }
    try {
        const post = Post.sequelize.query(query, {replacements: values }).then(
            function (results, metadata) {
                var normalResults = results.map((mysqlObj, index) => {
                    return Object.assign([], mysqlObj);
                });
                res.status(200).send(normalResults[0]);
            },
            function (err) {
              // 쿼리 실행 에러
            }
        )
    } catch (err) {
        console.error(err);
        next(err);
    }
    
})

router.post('/add', async(req, res, next) => {
    try {
        const time = new Date().toFormat('YYYY-MM-DD HH24:MI')
        const user = await User.findOne({
            where : { userid: req.body.userid }
        })
        const post = await Post.create({
            title: req.body.content.title,
            content: req.body.content.text,
            category: req.body.content.category,
            UserId: user.id,
            nickname: req.body.nickname,
            createdAt: time,
            updatedAt: time,
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